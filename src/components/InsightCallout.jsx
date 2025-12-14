// src/components/InsightCallout.jsx
/**
 * InsightCallout
 * - Accessible, brand-aligned callout with optional chips, bullets, and CTAs.
 * - Uses NHS CSS variables from App.css; no external deps.
 *
 * Props:
 *  - id?: string
 *  - title?: string                  // default 'Insight'
 *  - tone?: 'default'|'positive'|'caution'
 *  - chips?: string[]                // small fact tags shown above text
 *  - points?: string[]               // bullet points (optional)
 *  - ctas?: { href: string, label: string, variant?: 'solid'|'outline' }[]
 *  - children?: ReactNode            // custom body; else default message used
 *
 * Example:
 *  <InsightCallout
 *    chips={['Rent +13.1%', 'Rail £6,784']}
 *    points={['Costs mirror fringe areas', 'Retention risk without HCAS']}
 *    ctas={[{ href: '#evidence', label: 'See Evidence →', variant: 'solid' }]}
 *  />
 */

export default function InsightCallout({
  id = 'insight',
  title = 'Insight',
  tone = 'default',
  chips = [],
  points = [],
  ctas = [],
  children,
}) {
  const tones = {
    default: {
      border: 'var(--nhs-blue)',
      bg: 'linear-gradient(135deg, #fff, var(--nhs-blue-50))',
      icon: '🔍',
    },
    positive: {
      border: '#28a197', // NHS teal family
      bg: 'linear-gradient(135deg, #fff, rgba(40,161,151,0.08))',
      icon: '✅',
    },
    caution: {
      border: '#ffbf47', // NHS yellow family
      bg: 'linear-gradient(135deg, #fff, rgba(255,191,71,0.18))',
      icon: '⚠️',
    },
  };

  const theme = tones[tone] || tones.default;

  return (
    <aside
      id={id}
      role="note"
      aria-labelledby={`${id}__title`}
      className="nhs-callout"
      data-aos="fade-up"
      style={{
        borderLeftColor: theme.border,
        background: theme.bg,
      }}
    >
      {/* Heading */}
      <div className="flex items-start gap-2 mb-2">
        <span aria-hidden="true" style={{ fontSize: 20, lineHeight: 1 }}>{theme.icon}</span>
        <h4
          id={`${id}__title`}
          className="m-0 text-base font-extrabold"
          style={{ color: 'var(--nhs-ink)' }}
        >
          {title}
        </h4>
      </div>

      {/* Chips (optional) */}
      {chips?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3" aria-label="Key facts">
          {chips.map((chip, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs"
              style={{
                background: 'var(--nhs-blue-50)',
                color: 'var(--nhs-blue)',
                fontWeight: 700,
              }}
            >
              {chip}
            </span>
          ))}
        </div>
      )}

      {/* Body text */}
      <div style={{ color: 'var(--nhs-ink)' }}>
        {children ? (
          children
        ) : (
          <p className="m-0">
            On <strong>housing</strong>, <strong>rent</strong>, <strong>rail fares</strong>, and
            <strong> council tax</strong>, Medway’s pressures match or exceed fringe comparators, while
            workforce risks remain elevated — supporting inclusion in the <strong>5% fringe HCAS</strong>.
          </p>
        )}

        {/* Bulleted points (optional) */}
        {points?.length > 0 && (
          <ul className="list-disc ml-5 mt-2 space-y-1">
            {points.map((pt, i) => (
              <li key={i}>{pt}</li>
            ))}
          </ul>
        )}
      </div>

      {/* CTAs (optional) */}
      {ctas?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {ctas.map(({ href, label, variant = 'outline' }, i) => {
            const common = {
              className: 'inline-flex items-center px-3 py-1.5 rounded text-sm focus:outline-none',
              style: { fontWeight: 700 },
            };
            if (variant === 'solid') {
              return (
                <a
                  key={i}
                  href={href}
                  {...common}
                  style={{
                    ...common.style,
                    background: 'var(--nhs-blue)',
                    color: '#fff',
                  }}
                >
                  {label}
                </a>
              );
            }
            return (
              <a
                key={i}
                href={href}
                {...common}
                style={{
                  ...common.style,
                  border: `2px solid var(--nhs-blue)`,
                  color: 'var(--nhs-blue)',
                }}
              >
                {label}
              </a>
            );
          })}
        </div>
      )}
    </aside>
  );
}
