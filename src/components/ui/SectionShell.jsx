// src/components/SectionShell.jsx
export default function SectionShell({ id, title, subtitle, children, className = '' }) {
    return (
      <section id={id} data-aos="fade-up" className={`nhs-section my-10 ${className}`}>
        <div className="nhs-dots" />
        <div className="nhs-section__inner">
          {(title || subtitle) && (
            <header className="mb-6">
              {title && <h2 className="nhs-section__title text-3xl">{title}</h2>}
              {subtitle && <p className="mt-2" style={{ color: 'var(--nhs-ink)' }}>{subtitle}</p>}
            </header>
          )}
          {children}
        </div>
      </section>
    );
  }
  