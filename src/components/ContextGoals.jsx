// src/components/ContextGoals.jsx

/**
 * Context & Goals section for the Medway 5% Fringe HCAS case.
 * Key changes:
 * - Items grouped by `group` instead of slice() ordering
 * - Readable line length (70–80ch guidance) via max-w-[75ch]
 * - Strong keyboard focus styling for the link pills (NHS-like)
 * - Reusable subcomponents to reduce duplication
 * - Visual panel supports optional image with contrast overlay
 */

const LinkPill = ({ href, children }) => (
  <a
    href={href}
    className={[
      "inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold",
      "bg-blue-50 border border-blue-100 text-blue-900",
      // Strong focus (yellow + black) to match NHS focus intent
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black",
      "focus-visible:bg-[#FFDD00] focus-visible:text-black focus-visible:border-black",
      "hover:bg-blue-100/70",
    ].join(" ")}
  >
    {children}
  </a>
);

const DefinitionCard = ({ icon, term, def }) => (
  <div className="rounded-2xl border border-slate-200/80 px-4 py-3 shadow-sm bg-white/70 backdrop-blur">
    <dt className="text-sm font-semibold uppercase tracking-wide text-slate-500">
      {icon ? (
        <span aria-hidden="true" className="mr-1">
          {icon}
        </span>
      ) : null}
      {term}
    </dt>
    <dd className="mt-1 text-base text-slate-800" style={{ fontVariantNumeric: "tabular-nums" }}>
      {def}
    </dd>
  </div>
);

const SectionBlock = ({ label, items }) => (
  <div className="space-y-3">
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
    <dl className="space-y-4">
      {items.map((it, idx) => (
        <DefinitionCard key={`${label}-${idx}`} {...it} />
      ))}
    </dl>
  </div>
);

export default function ContextGoals({
  id = "context-goals",
  title = "Why Medway needs 5% HCAS",
  context = (
    "Medway sits on the London edge. Housing, rent, council tax and rail costs now mirror fringe " +
    "comparators like Dartford, Gravesham and Thurrock, but staff do not receive the 5% High Cost " +
    "Area Supplement. Pay lags take-home levels in neighbouring fringe trusts and risks undoing " +
    "recent vacancy gains."
  ),

  // Make grouping explicit so ordering can change safely
  items = [
    {
      group: "case",
      icon: "📈",
      term: "Pressure – costs now mirror fringe areas",
      def: "Rent +13% YoY; rail £6,784; council tax ~£2k. Pay lags fringe-uplifted trusts (Dartford, Gravesham, Thurrock).",
    },
    {
      group: "case",
      icon: "⚠️",
      term: "Risk – vacancy gains are fragile",
      def: "34% → 9% improvement can unwind if the pay gap persists; HS1/road links make fringe and outer-London moves easy.",
    },
    {
      group: "case",
      icon: "🎯",
      term: "Goal – secure 5% HCAS",
      def: "Align take-home with fringe comparators, hold retention, and keep London-adjacent services stable.",
    },
    {
      group: "delivery",
      icon: "🤝",
      term: "Who needs to support",
      def: "Frontline reps, Trust Board/ICS leadership, NHSPRB decision-makers; align comparators and endorsements.",
    },
    {
      group: "delivery",
      icon: "🛤️",
      term: "How we’ll land it",
      def: "Evidence at-a-glance → comparator alignment → policy route and timeline → local delivery.",
    },
  ],

  // One-line + ask (kept, but visually tidier)
  oneLine = "Case in one line: Fringe-level costs without fringe pay put Medway at retention and vacancy risk.",
  askLine = "Ask: Introduce a 5% High Cost Area Supplement for Medway to align with neighbouring fringe comparators.",

  // Link pills
  links = [
    { href: "#evidence", label: "Evidence" },
    { href: "#policy", label: "Policy route" },
    { href: "#outcomes", label: "Outcomes" },
  ],

  // Visual panel
  visualUrl,
  visualAlt = "Local map or landmark photo showing Medway’s London-edge position and key commuter links.",
  badge = "London edge · ~55 mins HS1 to London",
  visualKicker = "Context visual",
  visualTitle = "Medway waterfront corridor",
  visualSubtitle = "Rochester – Chatham – Gillingham",
  visualDescription = (
    "Swap this placeholder for a local map or landmark photo that shows Medway’s London-edge position " +
    "and the rail and road links that shape workforce movement."
  ),
  visualCtaLabel = "Swap with local landmark shot",
  onVisualCtaClick, // optional: if provided, CTA becomes a button
}) {
  const headingId = `${id}__heading`;

  const caseItems = items.filter((i) => i.group === "case");
  const deliveryItems = items.filter((i) => i.group === "delivery");

  const VisualCta = onVisualCtaClick ? "button" : "span";

  return (
    <section id={id} aria-labelledby={headingId} className="nhs-card overflow-hidden p-0">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        {/* Left column */}
        <div className="p-6 md:p-8">
          <p
            className="text-[11px] uppercase tracking-[0.18em] font-semibold mb-2"
            style={{ color: "var(--nhs-blue)" }}
          >
            <span aria-hidden="true" className="mr-1">
              📋
            </span>
            Briefing
          </p>

          <h2
            id={headingId}
            className="text-3xl font-extrabold mb-2"
            style={{ color: "var(--nhs-blue)" }}
          >
            {title}
          </h2>

          {/* Constrain reading width to ~75ch */}
          <div className="max-w-[75ch] space-y-3">
            <p className="text-sm font-semibold text-slate-700">{oneLine}</p>

            <p className="text-lg leading-relaxed" style={{ color: "var(--nhs-ink)" }}>
              {context}
            </p>

            <p className="text-sm font-semibold text-slate-800">{askLine}</p>
          </div>

          {/* Link pills */}
          <div className="flex flex-wrap gap-2 mt-6 mb-6">
            {links.map((l) => (
              <LinkPill key={l.href} href={l.href}>
                {l.label}
              </LinkPill>
            ))}
          </div>

          {/* Case / Delivery blocks */}
          <div className="space-y-6" style={{ color: "var(--nhs-ink)" }}>
            <SectionBlock label="Case" items={caseItems} />
            <SectionBlock label="Delivery" items={deliveryItems} />
          </div>
        </div>

        {/* Right visual panel */}
        <figure className="relative isolate min-h-[320px] overflow-hidden">
          {/* Background: either image or gradient */}
          {visualUrl ? (
            <>
              <img
                src={visualUrl}
                alt={visualAlt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* Contrast overlay to keep text readable */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
            </>
          ) : (
            <>
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, #003087 0%, #0072ce 50%, #00a9ce 100%)",
                }}
              />
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)",
                  backgroundSize: "60px 60px",
                }}
              />
            </>
          )}

          <figcaption className="relative h-full w-full p-6 flex flex-col justify-end text-white">
            <div className="absolute top-4 left-4 inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold border border-white/20 text-white/90 shadow">
              {badge}
            </div>

            <div
              className="absolute top-14 left-6 right-6 h-px bg-gradient-to-r from-white/0 via-white/40 to-white/0"
              aria-hidden="true"
            />

            <p className="text-sm font-semibold uppercase tracking-wide text-white/80">
              {visualKicker}
            </p>
            <h3 className="text-2xl font-bold">{visualTitle}</h3>
            <p className="text-white/80">{visualSubtitle}</p>

            <p className="mt-4 text-sm text-white/90 max-w-sm leading-relaxed">
              {visualDescription}
            </p>

            <VisualCta
              {...(onVisualCtaClick ? { type: "button", onClick: onVisualCtaClick } : {})}
              className={[
                "mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold border border-white/20",
                onVisualCtaClick ? "hover:bg-white/20" : "",
                // Keyboard focus visibility
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/90",
              ].join(" ")}
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M10 2a.75.75 0 01.674.418l2.197 4.45 4.91.714a.75.75 0 01.416 1.28l-3.55 3.462.838 4.882a.75.75 0 01-1.088.791L10 15.347l-4.397 2.35a.75.75 0 01-1.088-.79l.838-4.883-3.55-3.461a.75.75 0 01.416-1.281l4.91-.714 2.197-4.45A.75.75 0 0110 2z" />
              </svg>
              {visualCtaLabel}
            </VisualCta>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
