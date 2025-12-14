// src/components/ServiceCatchment.jsx
const Stat = ({ icon, label, value, sub }) => (
  <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm shadow-slate-200/40">
    <dt className="text-xs uppercase tracking-wide text-slate-500 font-semibold flex items-center gap-1">
      {icon ? <span aria-hidden="true">{icon}</span> : null}
      <span>{label}</span>
    </dt>
    <dd className="mt-1 text-2xl font-bold text-[#005EB8]">{value}</dd>
    <dd className="mt-0.5 text-sm text-slate-600">{sub}</dd>
  </div>
);

const EvidenceItem = ({ icon, title, text }) => (
  <li className="flex gap-3">
    <span className="mt-0.5 text-[#005EB8]" aria-hidden="true">
      {icon}
    </span>
    <p className="text-slate-800">
      <span className="font-semibold">{title}</span>{" "}
      <span className="text-slate-700">{text}</span>
    </p>
  </li>
);

export default function ServiceCatchment({
  id = "service-catchment-card",
  className = "",
  compact = false,

  // Optional: swap the placeholder for a real image/map
  visualUrl,
  visualAlt = "Map-style visual showing Medway, nearby London-facing trusts, and key rail and road links.",

  // Visual panel copy
  visualKicker = "Map / visual",
  visualTitle = "Medway ↔ London flows",
  visualBody = `Use this space for a simple map or landmark photo that shows the North Kent corridor (Rochester–Chatham–Gillingham), nearby London-facing trusts and key rail and road links.`,
  routes = [
    { left: "Gillingham ↔ London (HS1)", right: "~55 mins" },
    { left: "Dartford ↔ Medway (A2/M2)", right: "~25 mins" },
  ],
  visualFooterPill = "Swap in Medway skyline / corridor map",
}) {
  const bullets = [
    {
      icon: "🔁",
      title: "Cross-border flows:",
      text: "Referrals routinely cross the London–Kent border, with London-facing pathways moving both directions via neighbouring trusts.",
    },
    {
      icon: "🏥",
      title: "Regional services:",
      text: "Medway hosts specialist capacity (e.g., West Kent Urology Cancer Centre) and supports mutual-aid theatre lists spanning multiple trusts.",
    },
    {
      icon: "🧭",
      title: "Shared planning footprint:",
      text: "Planned, urgent and emergency flows align with the wider South East/London corridor — not a closed local catchment.",
    },
  ];

  return (
    <section
      id={id}
      role="region"
      aria-labelledby={`${id}__title`}
      className={`nhs-card ${compact ? "p-6" : "p-8"} ${className}`}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-stretch">
        {/* Narrative + stats */}
        <div className="flex flex-col gap-4">
          <header>
            <h2
              id={`${id}__title`}
              className="mb-2 flex items-center gap-2 text-2xl font-extrabold md:text-3xl"
              style={{ color: "var(--nhs-blue)" }}
            >
              <span aria-hidden="true">🗺️</span>
              <span>London adjacency &amp; service catchment</span>
            </h2>

            <p className="text-sm font-semibold text-slate-700 max-w-[75ch]">
              Medway already operates inside a <strong>London-fringe ecosystem</strong>, sharing
              patients, pathways and workforce markets with neighbouring fringe geographies rather
              than serving a closed local catchment.
            </p>
          </header>

          {/* Stats (semantic) */}
          <dl className="mt-2 grid gap-3 sm:grid-cols-2">
            <Stat
              icon="🌍"
              label="London patient flows"
              value="~18%"
              sub="Elective referrals from London boroughs into Medway"
            />
            <Stat
              icon="🎭"
              label="Networked theatres"
              value="6+ trusts"
              sub="Sharing Medway theatre capacity on mutual-aid lists"
            />
          </dl>

          {/* Evidence bullets (scannable) */}
          <div className="mt-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <span aria-hidden="true" className="mr-1">
                🚑
              </span>
              Patient &amp; pathway evidence
            </p>

            <ul className="space-y-3">
              {bullets.map((b, idx) => (
                <EvidenceItem key={idx} {...b} />
              ))}
            </ul>
          </div>

          {/* Implication (tight + punchy) */}
          <div className="mt-4 rounded-xl border border-sky-100 bg-sky-50 px-3 py-2 text-sm text-slate-800">
            <span
              className="mr-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-bold"
              style={{ background: "var(--nhs-blue-50)", color: "var(--nhs-blue)" }}
            >
              <span aria-hidden="true" className="mr-1">
                📌
              </span>
              Implication
            </span>
            These flows and shared services place Medway firmly in the London-fringe corridor — strengthening the case for 5% HCAS alignment.
          </div>
        </div>

        {/* Visual panel (stable “swap-in” area) */}
        <figure className="relative overflow-hidden rounded-2xl border border-blue-100 flex flex-col min-h-[320px]">
          <div className="relative flex-1 min-h-[320px] bg-slate-100">
            {visualUrl ? (
              <img
                src={visualUrl}
                alt={visualAlt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-[#003087] via-[#005EB8] to-[#00a9ce]" />
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.7) 1px, transparent 0)",
                    backgroundSize: "60px 60px",
                  }}
                />
              </>
            )}

            {/* Overlay content (works with either image or placeholder) */}
            <div className="absolute inset-0 flex flex-col gap-3 p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/85">
                {visualKicker}
              </p>
              <h3 className="text-2xl font-bold leading-snug">{visualTitle}</h3>
              <p className="text-sm text-white/90 max-w-[60ch]">{visualBody}</p>

              <div className="mt-4 space-y-2 text-sm">
                {routes.map((r, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-4">
                    <span className="text-white/90">{r.left}</span>
                    <span className="font-semibold">{r.right}</span>
                  </div>
                ))}
              </div>

              <span className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                {visualFooterPill}
              </span>
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}

