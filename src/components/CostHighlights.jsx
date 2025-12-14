// src/components/CostHighlights.jsx

const highlights = [
  {
    icon: "🏠",
    label: "Housing YoY growth (to Dec 2024)",
    value: "+2.5%",
    detail: "Medway matches Thurrock (+2.6%) and tracks Dartford/Gravesham trend",
  },
  {
    icon: "📈",
    label: "Median private rent (Jan 2025)",
    value: "£1,165",
    detail: "+13.1% YoY – in fringe-level uplift range",
  },
  {
    icon: "🚆",
    label: "Season ticket (SE→London, 2025)",
    value: "£6,784",
    detail: "Gillingham to London Terminals – above Dartford/Gravesend, c2c",
  },
  {
    icon: "🪙",
    label: "Band D council tax (2023/24)",
    value: "£2,009",
    detail: "In line with fringe comparators (Dartford £2,078; Gravesham £2,104)",
  },
];

export default function CostHighlights() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {highlights.map(({ icon, label, value, detail }) => (
        <article
          key={label}
          className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm backdrop-blur"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {icon && (
              <span aria-hidden="true" className="mr-1">
                {icon}
              </span>
            )}
            {label}
          </p>
          <p className="mt-1 text-2xl font-extrabold text-[#005EB8]">
            {value}
          </p>
          <p className="mt-1 text-sm text-slate-600">{detail}</p>
        </article>
      ))}
    </div>
  );
}
