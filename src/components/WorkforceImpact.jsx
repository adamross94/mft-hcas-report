// src/components/WorkforceImpact.jsx
import React, { useId } from "react";

const Chip = ({ children, tone = "info" }) => {
  const toneClass =
    tone === "risk"
      ? "bg-orange-100 text-orange-900 border-orange-200"
      : tone === "good"
      ? "bg-green-100 text-green-900 border-green-200"
      : "bg-[var(--nhs-blue-50)] text-[var(--nhs-blue)] border-blue-100";

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border ${toneClass}`}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {children}
    </span>
  );
};

const Metric = ({ icon, label, value, sub }) => (
  <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm shadow-slate-200/40">
    <dt className="text-xs uppercase tracking-wide text-slate-500 font-semibold flex items-center gap-1">
      {icon ? <span aria-hidden="true">{icon}</span> : null}
      <span>{label}</span>
    </dt>
    <dd className="mt-1 text-2xl font-bold" style={{ color: "var(--nhs-blue)" }}>
      {value}
    </dd>
    <dd className="mt-0.5 text-sm text-slate-600">{sub}</dd>
  </div>
);

const EvidenceItem = ({ icon, title, children }) => (
  <li className="flex gap-3">
    <span className="mt-0.5" style={{ color: "var(--nhs-blue)" }} aria-hidden="true">
      {icon}
    </span>
    <div className="text-slate-800 leading-relaxed">
      <p className="font-semibold">{title}</p>
      <div className="text-slate-700">{children}</div>
    </div>
  </li>
);

export default function WorkforceImpact({
  id = "workforce-impact-card",
  className = "",
  compact = false,

  // Optional: make it reusable without editing component code
  title = "Workforce impact",
  subtitle = "Pay pressure compared with fringe comparators",
  oneLine =
    "Workforce trends show Medway competing in a London-fringe labour market without the fringe uplift.",
  // Keep acronyms, expand first time in this section:
  hcasExpanded = "High Cost Area Supplement (HCAS)",
}) {
  const uid = useId();
  const headingId = `${id}__title-${uid}`;
  const descId = `${id}__desc-${uid}`;

  const metrics = [
    {
      icon: "🔄",
      label: "Turnover (12 months)",
      value: "~14%",
      sub: "Nearby fringe trusts ~10–12%",
    },
    {
      icon: "📉",
      label: "Vacancy trend",
      value: "34% → 9%",
      sub: "Improved sharply; gains remain fragile",
    },
  ];

  const bullets = [
    {
      icon: "🔄",
      title: "Turnover signal",
      body: (
        <>
          Medway’s annual nurse turnover sits at <Chip>~14%</Chip> versus{" "}
          <Chip>~10–12%</Chip> in nearby fringe trusts. In a shared labour market, staff can
          move to employers paying a <Chip tone="risk">5%</Chip> {hcasExpanded}.
        </>
      ),
    },
    {
      icon: "📉",
      title: "Vacancy gains at risk",
      body: (
        <>
          Vacancies fell from <Chip tone="risk">34%</Chip> to <Chip tone="good">9%</Chip> through
          targeted recruitment and incentives. Without the <Chip tone="risk">5%</Chip> uplift,
          vacancy rates can drift upwards as pay gaps re-emerge.
        </>
      ),
    },
    {
      icon: "🧲",
      title: "Choice set is London-fringe",
      body: (
        <>
          Staff can access employers paying <Chip tone="risk">5%</Chip> (fringe) or{" "}
          <Chip tone="risk">15%</Chip> (outer London), especially in shortage areas such as
          theatres, critical care and emergency care. Medway competes in that market without
          the fringe uplift.
        </>
      ),
    },
    {
      icon: "⚠️",
      title: "Operational risk",
      body: (
        <>
          Continued churn increases agency reliance and rota fragility, particularly on
          London-adjacent pathways where HS1 and road links make outer-London options realistic.
        </>
      ),
    },
  ];

  return (
    <section
      id={id}
      role="region"
      aria-labelledby={headingId}
      aria-describedby={descId}
      className={`nhs-card ${compact ? "p-6" : "p-8"} ${className}`}
    >
      <div className="flex flex-col gap-6">
        <header className="max-w-[85ch]">
          <h2
            id={headingId}
            className="text-2xl md:text-3xl font-extrabold mb-2 flex items-center gap-2"
            style={{ color: "var(--nhs-blue)" }}
          >
            <span aria-hidden="true">👥</span>
            <span>{title}</span>
          </h2>

          <p className="text-sm uppercase tracking-wide font-semibold text-slate-500">
            <span aria-hidden="true" className="mr-1">
              📊
            </span>
            {subtitle}
          </p>

          <p id={descId} className="mt-3 text-sm font-semibold text-slate-700">
            {oneLine}
          </p>
        </header>

        {/* Headline metrics (semantic) */}
        <dl className="grid gap-3 sm:grid-cols-2">
          {metrics.map((m) => (
            <Metric key={m.label} {...m} />
          ))}
        </dl>

        {/* Narrative bullets (scannable + consistent) */}
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <span aria-hidden="true" className="mr-1">
              🧾
            </span>
            What the indicators imply
          </p>
          <ul className="space-y-4">
            {bullets.map((b) => (
              <EvidenceItem key={b.title} icon={b.icon} title={b.title}>
                {b.body}
              </EvidenceItem>
            ))}
          </ul>
        </div>

        {/* Signal callout (cleaner + less repetitive) */}
        <aside className="rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-950">
          <p className="font-semibold flex items-center gap-2">
            <span aria-hidden="true">📌</span>
            Overall signal
          </p>
          <p className="mt-1 text-slate-800">
            Medway is already paying the *practical* cost of fringe retention pressures. A{" "}
            <Chip tone="risk">5%</Chip> {hcasExpanded} helps lock in vacancy improvements, reduce
            churn-driven agency spend, and improve rota stability over the next 12–18 months.
          </p>
        </aside>
      </div>
    </section>
  );
}
