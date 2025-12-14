// src/components/Outcomes.jsx
import React, { useId, useMemo, useState } from "react";

const DEFAULT_OUTCOMES = [
  {
    id: "net-vacancy",
    icon: "📈",
    title: "Net vacancy improvement",
    stat: "+3–4 pts",
    ariaStat: "Net vacancy rate improves by around three to four percentage points.",
    detail:
      "Net vacancy rate improves by around three to four percentage points as take-home pay moves closer to neighbouring fringe comparators.",
    howMeasured: "Monthly: ESR vacancy and funded establishment (net vacancy rate).",
    status: "Primary KPI",
    area: "Workforce",
    tone: "primary",
    primary: true,
  },
  {
    id: "agency",
    icon: "💷",
    title: "Lower agency spend",
    stat: "≈£2m",
    ariaStat: "Approximately two million pounds a year saved.",
    detail:
      "Reduced churn and fewer hard-to-fill gaps cut premium agency use, releasing around £2m a year to reinvest in permanent ward teams.",
    howMeasured: "Monthly: agency spend (run-rate) and premium shifts approved.",
    status: "Budget impact",
    area: "Budget",
    tone: "budget",
    primary: false,
  },
  {
    id: "equity",
    icon: "⚖️",
    title: "Equity and morale",
    stat: "Parity",
    ariaStat: "Pay aligned with nearby fringe comparators.",
    detail:
      "Aligning pay with nearby fringe areas supports perceptions of fairness, feeling valued and likelihood to recommend Medway as a place to work.",
    howMeasured: "Quarterly: staff survey pulse + retention hotspots by service.",
    status: "People metric",
    area: "People",
    tone: "people",
    primary: false,
  },
  {
    id: "stability",
    icon: "🛡️",
    title: "Service stability",
    stat: "4 pathways",
    ariaStat: "Four London-adjacent pathways stabilised.",
    detail:
      "London-adjacent pathways (for example, theatres, UEC, cancer and critical care) maintain rota fill and elective capacity more consistently.",
    howMeasured: "Monthly: fill-rate, escalation shifts, cancellations and DTOC pinch-points.",
    status: "Quality metric",
    area: "Quality",
    tone: "quality",
    primary: false,
  },
];

function TypeChip({ tone, children }) {
  const styles =
    tone === "budget"
      ? "bg-amber-50 text-amber-800 border-amber-100"
      : tone === "people"
      ? "bg-emerald-50 text-emerald-800 border-emerald-100"
      : tone === "quality"
      ? "bg-indigo-50 text-indigo-800 border-indigo-100"
      : "bg-blue-50 text-blue-800 border-blue-100";

  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold",
        "motion-reduce:transition-none",
        styles,
      ].join(" ")}
      title={typeof children === "string" ? children : undefined}
    >
      {children}
    </span>
  );
}

function HorizonChip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800">
      {children}
    </span>
  );
}

function FilterButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "motion-reduce:transition-none",
        active
          ? "bg-[var(--nhs-blue-50)] border-blue-200 text-[var(--nhs-blue)]"
          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50",
      ].join(" ")}
      style={{
        // Keep focus colour anchored to NHS blue regardless of Tailwind theme.
        // (Focus ring uses Tailwind; this ensures text colour stays consistent.)
        color: active ? "var(--nhs-blue)" : undefined,
      }}
    >
      {children}
    </button>
  );
}

function OutcomeCard({ outcome }) {
  const cardUid = useId();
  const headingId = `outcome_${outcome.id}_${cardUid}`;
  const statId = `outcome_stat_${outcome.id}_${cardUid}`;

  return (
    <article
      aria-labelledby={headingId}
      aria-describedby={statId}
      className={[
        "flex flex-col rounded-2xl border bg-slate-50/80 p-4 shadow-sm",
        "transition motion-reduce:transition-none",
        outcome.primary
          ? "border-[var(--nhs-blue)] ring-1 ring-[rgba(0,94,184,0.18)]"
          : "border-slate-100",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-2">
        <h3
          id={headingId}
          className="flex items-center gap-2 text-lg font-semibold text-slate-900"
        >
          {outcome.icon && (
            <span aria-hidden="true" className="text-base">
              {outcome.icon}
            </span>
          )}
          <span>{outcome.title}</span>
        </h3>

        <div className="flex flex-col items-end gap-1">
          <TypeChip tone={outcome.tone}>{outcome.status}</TypeChip>
          <span className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
            {outcome.area}
          </span>
        </div>
      </div>

      <p
        id={statId}
        className="mt-2 text-3xl font-extrabold"
        style={{ color: "var(--nhs-blue)", fontVariantNumeric: "tabular-nums" }}
      >
        <span aria-label={outcome.ariaStat}>{outcome.stat}</span>
      </p>

      <p className="mt-1 text-sm text-slate-700">{outcome.detail}</p>

      {outcome.howMeasured ? (
        <p className="mt-3 text-xs font-semibold text-slate-500">
          <span aria-hidden="true" className="mr-1">
            📌
          </span>
          {outcome.howMeasured}
        </p>
      ) : null}
    </article>
  );
}

export default function Outcomes({
  id = "outcomes",
  title = "Expected outcomes",
  strapline = "High Cost Area Supplement (HCAS) impact",
  horizonLabel = "12–18 month horizon",
  scenarioLabel = "Illustrative scenario",
  scenarioNote =
    "Indicative 12–18 month impact if a 5% supplement is implemented and paired with tighter agency controls and active workforce planning.",
  caveat =
    "Figures are indicative, based on recent vacancy and agency trends rather than a formal actuarial forecast.",
  outcomes = DEFAULT_OUTCOMES,
}) {
  const uid = useId();
  const headingId = `${id}__heading_${uid}`;

  // Filter setup
  const areas = useMemo(() => {
    const set = new Set((outcomes ?? []).map((o) => o.area).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [outcomes]);

  const [areaFilter, setAreaFilter] = useState("All");

  const visible = useMemo(() => {
    const list = Array.isArray(outcomes) ? [...outcomes] : [];
    // Keep primary first
    list.sort((a, b) => (b.primary === true) - (a.primary === true));
    if (areaFilter === "All") return list;
    return list.filter((o) => o.area === areaFilter);
  }, [outcomes, areaFilter]);

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="rounded-2xl bg-white p-6 shadow"
    >
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            <span aria-hidden="true" className="mr-1">
              🎯
            </span>
            {strapline}
          </p>

          <h2
            id={headingId}
            className="flex items-center gap-2 text-3xl font-bold"
            style={{ color: "var(--nhs-blue)" }}
          >
            <span aria-hidden="true">📊</span>
            <span>{title}</span>
          </h2>

          <p className="mt-1 max-w-2xl text-sm text-slate-600">{scenarioNote}</p>
          <p className="mt-1 text-xs text-slate-500">{caveat}</p>

          {/* Filters */}
          <div className="mt-3 flex flex-wrap items-center gap-2" role="group" aria-label="Filter outcomes by area">
            <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Filter:
            </span>
            {areas.map((a) => (
              <FilterButton key={a} active={areaFilter === a} onClick={() => setAreaFilter(a)}>
                {a}
              </FilterButton>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <HorizonChip>
            <span aria-hidden="true" className="mr-1">
              ⏱️
            </span>
            {horizonLabel}
          </HorizonChip>
          <HorizonChip>
            <span aria-hidden="true" className="mr-1">
              📐
            </span>
            {scenarioLabel}
          </HorizonChip>
        </div>
      </div>

      {/* Outcome cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {visible.map((o) => (
          <OutcomeCard key={o.id} outcome={o} />
        ))}
      </div>

      {/* Insight / mini playbook */}
      <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-blue-900">
        <p className="text-sm font-semibold uppercase tracking-wide">
          <span aria-hidden="true" className="mr-1">
            💡
          </span>
          Insight
        </p>
        <p className="mt-1 text-sm">
          A 5% High Cost Area Supplement (HCAS) for Medway closes much of the pay gap that drives churn.
          The impact is strongest when the uplift is paired with disciplined delivery:
        </p>
        <ul className="mt-2 space-y-1 text-sm">
          <li>• Tight grip on agency usage and premium shift approvals.</li>
          <li>• Monthly monitoring of vacancy, turnover and net vacancy rate.</li>
          <li>• Visible feedback to staff through survey results and local engagement.</li>
        </ul>
      </div>
    </section>
  );
}
