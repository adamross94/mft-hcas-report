// src/components/PolicyPathway.jsx
import React, { useId, useMemo } from "react";

const DEFAULT_STEPS = [
  {
    icon: "🧩",
    title: "Frame the case",
    owner: "Medway NHS Foundation Trust",
    detail:
      "Turn the cost-of-living and workforce evidence into a short High Cost Area Supplement (HCAS) case pack, quantifying the pay gap with fringe comparators and setting out clear options.",
    badge: "Week 0–2",
    tier: "local",
    tierLabel: "Local case",
    now: true,
  },
  {
    icon: "🤝",
    title: "Secure ICS & staff-side backing",
    owner: "Kent & Medway ICS, Staff Council and trade unions",
    detail:
      "Take the proposal through ICS People Board and local partnership forums, agree Agenda for Change (AfC) implications, and secure letters of support from staff-side representatives.",
    badge: "Week 3–6",
    tier: "system",
    tierLabel: "System & staff-side",
    now: true,
  },
  {
    icon: "📮",
    title: "Submit to NHSPRB",
    owner: "Medway NHS FT / ICS → NHS Pay Review Body (NHSPRB)",
    detail:
      "Submit the endorsed evidence within the NHSPRB window, explicitly asking for Medway’s fringe status to be reviewed alongside neighbouring comparator trusts.",
    badge: "NHSPRB evidence window",
    tier: "national",
    tierLabel: "National – NHSPRB",
    now: false,
  },
  {
    icon: "🗣️",
    title: "Negotiate via NHS Staff Council",
    owner: "NHS Employers & trade unions (NHS Staff Council)",
    detail:
      "Use NHSPRB recommendations to agree national AfC changes, including the scope and phasing of any fringe extension and safeguards for non-fringe sites.",
    badge: "Post-PRB report",
    tier: "national",
    tierLabel: "National – Staff Council",
    now: false,
  },
  {
    icon: "🏛️",
    title: "Formal sign-off & implementation",
    owner: "DHSC, HM Treasury and NHS England",
    detail:
      "Secure government sign-off and funding flows, then implement HCAS changes locally with clear staff communications, payroll readiness and early monitoring of impact.",
    badge: "Implementation window",
    tier: "national",
    tierLabel: "National – DHSC / HMT",
    now: false,
  },
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function tierClasses(tier) {
  switch (tier) {
    case "local":
      return {
        bg: "bg-emerald-50",
        text: "text-emerald-800",
        border: "border-emerald-100",
      };
    case "system":
      return {
        bg: "bg-sky-50",
        text: "text-sky-800",
        border: "border-sky-100",
      };
    case "national":
    default:
      return {
        bg: "bg-indigo-50",
        text: "text-indigo-800",
        border: "border-indigo-100",
      };
  }
}

function LegendPill({ label, className = "" }) {
  return (
    <span className={cx("inline-flex items-center rounded-full border px-2 py-0.5", className)}>
      {label}
    </span>
  );
}

export default function PolicyPathway({
  id = "policy-pathway",
  className = "",
  compact = false,
  title = "Policy route to 5% fringe HCAS",
  subtitle =
    "Who does what, when – from local case pack through ICS backing to national sign-off and implementation.",
  steps = DEFAULT_STEPS,
  actionFocusTitle = "Action focus – next 6 weeks",
}) {
  const reactId = useId();
  const headingId = `${id}__heading-${reactId}`;
  const descId = `${id}__desc-${reactId}`;

  const total = steps.length;

  const counts = useMemo(() => {
    const byTier = { local: 0, system: 0, national: 0 };
    let nowCount = 0;

    steps.forEach((s) => {
      if (s?.tier && Object.prototype.hasOwnProperty.call(byTier, s.tier)) {
        byTier[s.tier] += 1;
      }
      if (s?.now) nowCount += 1;
    });

    return { byTier, nowCount };
  }, [steps]);

  const nowActions = useMemo(() => {
    // Pull the “now” steps as your immediate checklist, so it stays in sync.
    const items = steps.filter((s) => s?.now).map((s) => s.title);
    // If nothing is marked “now”, fall back to the first two steps.
    return items.length ? items : steps.slice(0, 2).map((s) => s.title);
  }, [steps]);

  const pad = compact ? "p-5" : "p-6";
  const headerTitleSize = compact ? "text-2xl" : "text-3xl";
  const bodyText = compact ? "text-sm" : "text-sm";

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      aria-describedby={descId}
      className={cx("rounded-2xl bg-white shadow", pad, className)}
    >
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            <span aria-hidden="true" className="mr-1">
              🧭
            </span>
            Route map
          </p>

          <h2
            id={headingId}
            className={cx("flex items-center gap-2 font-bold", headerTitleSize)}
            style={{ color: "var(--nhs-blue)" }}
          >
            <span aria-hidden="true">🏛️</span>
            <span>{title}</span>
          </h2>

          <p id={descId} className={cx("max-w-xl text-slate-600", bodyText)}>
            {subtitle}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-800">
            <span aria-hidden="true">🪜</span>
            <span>
              {total} steps · {counts.nowCount} in progress · 3 tiers
            </span>
          </span>

          {/* Tier legend */}
          <div className="flex flex-wrap gap-2 text-xs text-slate-600" aria-label="Tier legend">
            <LegendPill label="Local case" className="bg-emerald-50 text-emerald-800 border-emerald-100" />
            <LegendPill label="System & staff-side" className="bg-sky-50 text-sky-800 border-sky-100" />
            <LegendPill label="National / NHSPRB & DHSC" className="bg-indigo-50 text-indigo-800 border-indigo-100" />
          </div>
        </div>
      </div>

      {/* Jump links (scan-friendly) */}
      <nav aria-label="Jump to a step" className="mb-6">
        <ul className="flex flex-wrap gap-2">
          {steps.map((s, i) => {
            const stepAnchor = `${id}__step-${i + 1}-${reactId}`;
            return (
              <li key={stepAnchor}>
                <a
                  href={`#${stepAnchor}`}
                  className={cx(
                    "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold",
                    "bg-white text-slate-700 border-slate-200 hover:bg-slate-50",
                    "focus:outline-none focus:ring-2 focus:ring-[var(--nhs-blue)] focus:ring-offset-2",
                    "motion-reduce:transition-none"
                  )}
                >
                  <span className="text-slate-500" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="max-w-[22ch] truncate">{s.title}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Timeline of steps */}
      <ol
        className="relative space-y-6 border-l-2 border-blue-100 pl-6"
        aria-label="Steps from local HCAS case pack to national sign-off"
      >
        {steps.map((step, index) => {
          const colours = tierClasses(step.tier);
          const isNow = Boolean(step.now);
          const stepId = `${id}__step-${index + 1}-${reactId}`;
          const stepLabelId = `${stepId}__label`;
          const stepMetaId = `${stepId}__meta`;

          return (
            <li
              key={`${step.title}-${index}`}
              id={stepId}
              className="relative scroll-mt-24"
              aria-current={isNow ? "step" : undefined}
              aria-labelledby={stepLabelId}
              aria-describedby={stepMetaId}
            >
              {/* Step number dot */}
              <span
                className="absolute -left-[13px] top-4 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white"
                aria-hidden="true"
              >
                {index + 1}
              </span>

              {/* Card */}
              <div
                className={cx(
                  "rounded-2xl border bg-gray-50/80 p-4 shadow-sm",
                  "transition hover:shadow-md motion-reduce:transition-none",
                  isNow ? "border-blue-200 ring-1 ring-blue-100" : "border-gray-100"
                )}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {step.icon ? (
                      <span aria-hidden="true" className="text-base">
                        {step.icon}
                      </span>
                    ) : null}

                    <h3 id={stepLabelId} className="text-lg font-semibold text-gray-900">
                      <span className="sr-only">
                        Step {index + 1} of {total}:{" "}
                      </span>
                      {step.title}
                    </h3>

                    {isNow ? (
                      <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-800">
                        Now
                      </span>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Tier pill */}
                    <span
                      className={cx(
                        "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold",
                        colours.bg,
                        colours.text,
                        colours.border
                      )}
                    >
                      {step.tierLabel}
                    </span>

                    {/* Timing pill */}
                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-0.5 text-xs font-semibold text-blue-700">
                      <span aria-hidden="true">⏱️</span>
                      <span>{step.badge}</span>
                    </span>
                  </div>
                </div>

                <div id={stepMetaId} className="mt-1">
                  <p className="text-sm font-semibold text-slate-500">Lead: {step.owner}</p>
                  <p className="mt-2 text-sm text-gray-700">{step.detail}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Action focus (derived from “now” steps) */}
      <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-blue-900">
        <p className="text-sm font-semibold uppercase tracking-wide">
          <span aria-hidden="true" className="mr-1">
            📌
          </span>
          {actionFocusTitle}
        </p>

        <p className="mt-1 text-sm">
          Priority is to complete the local and system steps so the national stages are ready for the next NHSPRB evidence window.
        </p>

        <ul className="mt-2 space-y-1 text-sm">
          {nowActions.map((t) => (
            <li key={t}>• {t}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
