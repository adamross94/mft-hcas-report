// src/components/Recommendations.jsx
import React, { useId, useMemo, useState } from "react";

const DEFAULT_RECOMMENDATIONS = [
  {
    id: "step-1",
    step: 1,
    status: "done",
    icon: "✅",
    title: "Agree 5% fringe HCAS position",
    summary:
      "Confirm Medway and the Kent & Medway Integrated Care System (ICS) will seek inclusion in the 5% High Cost Area Supplement (HCAS) fringe zone, using Dartford, Gravesham and Thurrock as the core comparator set.",
    outputs: ["Board/ICS alignment recorded", "Comparator set agreed in principle"],
    windowVariant: "decision",
    windowLabel: "Decision window: Q1",
    owner: "Medway FT Board & Kent & Medway ICS",
  },
  {
    id: "step-2",
    step: 2,
    status: "in-progress",
    icon: "📊",
    title: "Lock comparator set and data refresh",
    summary:
      "Confirm Dartford/Gravesham/Thurrock as standard comparators and refresh 5-year series for key cost-of-living and workforce KPIs.",
    outputs: ["Refreshed KPI series", "Evidence table updated", "Comparator definitions documented"],
    windowVariant: "analytics",
    windowLabel: "Analytics refresh: 2 weeks",
    owner: "BI, Finance & Workforce leads",
  },
  {
    id: "step-3",
    step: 3,
    status: "next",
    icon: "📦",
    title: "Prepare national case pack",
    summary:
      "Finalise a one-page evidence table, 10-page case PDF and letters of support for submission to the NHS Pay Review Body (NHSPRB).",
    outputs: ["1-page evidence table", "10-page case PDF", "Letters of support", "Covering note"],
    windowVariant: "nhsprb",
    windowLabel: "Before next NHSPRB evidence window",
    owner: "Workforce, Policy & staff-side leads",
  },
];

const DEFAULT_WORKSTREAMS = [
  {
    id: "ws-1",
    icon: "📑",
    name: "Workforce & Finance (MFT)",
    time: "2 weeks",
    output: "10-page business case PDF and updated evidence table.",
    status: "in-progress",
    supports: "Steps 1–3",
  },
  {
    id: "ws-2",
    icon: "📣",
    name: "Comms / Policy (MFT + ICS)",
    time: "1 week",
    output: "Stakeholder brief, ICS update and NHSPRB covering note.",
    status: "next",
    supports: "Steps 2–3",
  },
  {
    id: "ws-3",
    icon: "📝",
    name: "HR / Medical Directors (ICS)",
    time: "Ongoing",
    output: "Letters of support, Board minutes and staff-side endorsements.",
    status: "ongoing",
    supports: "Steps 2–3",
  },
];

const STATUS_META = {
  done: {
    label: "Completed",
    icon: "✔️",
    classes: "bg-emerald-50 text-emerald-800 border-emerald-200",
    order: 0,
  },
  "in-progress": {
    label: "In progress",
    icon: "⏳",
    classes: "bg-blue-50 text-blue-800 border-blue-200",
    order: 1,
  },
  next: {
    label: "Next up",
    icon: "➡️",
    classes: "bg-slate-50 text-slate-700 border-slate-200",
    order: 2,
  },
  ongoing: {
    label: "Ongoing",
    icon: "♻️",
    classes: "bg-green-50 text-green-800 border-green-200",
    order: 3,
  },
};

const WINDOW_META = {
  decision: { classes: "bg-indigo-50 text-indigo-800 border-indigo-100", icon: "🗳️" },
  analytics: { classes: "bg-cyan-50 text-cyan-800 border-cyan-100", icon: "📈" },
  nhsprb: { classes: "bg-purple-50 text-purple-800 border-purple-100", icon: "📬" },
};

function StatusBadge({ status, size = "sm" }) {
  const meta = STATUS_META[status] || STATUS_META.ongoing;
  const padding = size === "lg" ? "px-3 py-1 text-xs" : "px-2 py-0.5 text-[11px]";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border font-semibold ${padding} ${meta.classes}`}
      aria-label={meta.label}
      title={meta.label}
    >
      <span aria-hidden="true">{meta.icon}</span>
      <span>{meta.label}</span>
    </span>
  );
}

function WindowBadge({ variant, label }) {
  const meta = WINDOW_META[variant] || WINDOW_META.decision;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-0.5 text-[11px] font-semibold ${meta.classes}`}
    >
      <span aria-hidden="true">{meta.icon}</span>
      <span>{label}</span>
    </span>
  );
}

function StepPill({ step }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#005EB8] px-2 py-0.5 text-xs font-semibold text-white">
      <span aria-hidden="true">▶️</span>
      <span>{`Step ${step}`}</span>
    </span>
  );
}

function FilterButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full border px-3 py-1 text-xs font-semibold transition",
        active
          ? "bg-[#005EB8] text-white border-[#005EB8]"
          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50",
        "focus:outline-none focus:ring-2 focus:ring-[#005EB8] focus:ring-offset-2",
      ].join(" ")}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}

export default function Recommendations({
  title = "Recommendations & next steps",
  strap = "Near-term actions to move from evidence to a clear ask for 5% fringe HCAS, with defined owners, timelines and outputs.",
  recommendations = DEFAULT_RECOMMENDATIONS,
  workstreams = DEFAULT_WORKSTREAMS,
  defaultFilter = "now", // "now" | "all"
}) {
  const headingId = useId();
  const [filter, setFilter] = useState(defaultFilter);

  const sortedRecs = useMemo(() => {
    const data = Array.isArray(recommendations) ? [...recommendations] : [];
    return data.sort((a, b) => {
      const ao = STATUS_META[a.status]?.order ?? 99;
      const bo = STATUS_META[b.status]?.order ?? 99;
      if (ao !== bo) return ao - bo;
      return (a.step ?? 0) - (b.step ?? 0);
    });
  }, [recommendations]);

  const visibleRecs = useMemo(() => {
    if (filter === "all") return sortedRecs;
    // "now" view: show in-progress + next (plus done if you prefer)
    return sortedRecs.filter((r) => r.status === "in-progress" || r.status === "next");
  }, [filter, sortedRecs]);

  const progress = useMemo(() => {
    const total = recommendations?.length || 0;
    const done = (recommendations || []).filter((r) => r.status === "done").length;
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  }, [recommendations]);

  const overallStatus =
    progress.pct === 100 ? "done" : progress.done > 0 ? "in-progress" : "next";

  return (
    <section
      aria-labelledby={headingId}
      className="rounded-2xl bg-white p-6 shadow"
    >
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            <span aria-hidden="true" className="mr-1">📝</span>
            Action plan
          </p>

          <h2
            id={headingId}
            className="flex items-center gap-2 text-3xl font-bold"
            style={{ color: "var(--nhs-blue)" }}
          >
            <span aria-hidden="true">🚀</span>
            <span>{title}</span>
          </h2>

          <p className="mt-1 max-w-3xl text-sm text-slate-600">{strap}</p>

          {/* Progress */}
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <StatusBadge status={overallStatus} size="lg" />
            <div className="min-w-[220px] flex-1">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                <span>Progress</span>
                <span style={{ fontVariantNumeric: "tabular-nums" }}>
                  {progress.done}/{progress.total} ({progress.pct}%)
                </span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${progress.pct}%`, background: "var(--nhs-blue)" }}
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Filter */}
            <div className="flex flex-wrap gap-2">
              <FilterButton active={filter === "now"} onClick={() => setFilter("now")}>
                Now
              </FilterButton>
              <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
                All
              </FilterButton>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-800">
            <span aria-hidden="true">🧭</span>
            <span>{recommendations.length} steps</span>
          </span>
        </div>
      </div>

      {/* Steps */}
      <ol className="mb-6 space-y-4">
        {visibleRecs.map((rec) => (
          <li
            key={rec.id}
            className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-[240px] flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <StepPill step={rec.step} />
                  <StatusBadge status={rec.status} />
                  <WindowBadge variant={rec.windowVariant} label={rec.windowLabel} />
                </div>

                <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                  {rec.icon ? <span aria-hidden="true">{rec.icon}</span> : null}
                  <span>{rec.title}</span>
                </h3>

                <p className="text-sm text-slate-700">{rec.summary}</p>

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Owner: <span className="normal-case text-slate-600">{rec.owner}</span>
                </p>

                {Array.isArray(rec.outputs) && rec.outputs.length > 0 && (
                  <div className="pt-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Outputs
                    </p>
                    <ul className="mt-1 list-disc pl-5 text-sm text-slate-700 space-y-0.5">
                      {rec.outputs.map((o, i) => (
                        <li key={i}>{o}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>

      {/* Workstreams */}
      <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
        <p className="flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-blue-900">
          <span aria-hidden="true">📋</span>
          <span>Workstreams (owner / when / output)</span>
        </p>

        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {workstreams.map((ws) => (
            <article
              key={ws.id}
              className="flex flex-col rounded-xl border border-white/60 bg-white/90 p-4 shadow-sm"
            >
              <div className="mb-1 flex items-center justify-between gap-2">
                <p className="flex items-center gap-2 font-semibold text-slate-900">
                  {ws.icon ? <span aria-hidden="true">{ws.icon}</span> : null}
                  <span>{ws.name}</span>
                </p>
                <StatusBadge status={ws.status} />
              </div>

              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Timeline: <span className="normal-case text-slate-600">{ws.time}</span>
              </p>
              <p className="mt-1 text-sm text-slate-700">{ws.output}</p>

              <p className="mt-2 text-[11px] font-semibold text-slate-500">
                Supports: <span className="font-normal text-slate-600">{ws.supports}</span>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
