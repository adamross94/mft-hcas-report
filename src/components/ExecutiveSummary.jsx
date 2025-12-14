// src/components/ExecutiveSummary.jsx
import heroImage from "../assets/mft-03.png"; // Hospital entrance
import row2Image from "../assets/mft-02.png"; // Skyline / corridor

const CaptionPill = ({ children }) => (
  <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/90 border border-white/20 shadow-sm shadow-black/20">
    {children}
  </span>
);

export default function ExecutiveSummary({
  heroUrl = heroImage,
  row2Url = row2Image,
  secondaryHeroUrl,
}) {
  const hospitalUrl = heroUrl;
  const skylineUrl = secondaryHeroUrl || row2Url;

  const summaryStats = [
    { icon: "🏠", label: "Rent YoY", value: "+13.1%", note: "↑ vs 10–11% fringe rents" },
    { icon: "🚆", label: "Rail season", value: "£6,784", note: "Gillingham → London (2025 annual)" },
    { icon: "🔄", label: "Turnover", value: "~14%", note: "vs ~10–12% fringe trusts" },
    { icon: "📉", label: "Vacancy", value: "34% → 9%", note: "Targeted nurse recruitment" },
  ];

  const headlineStrip = [
    {
      icon: "⚠️",
      label: "Problem",
      kicker: "Costs at fringe level; no 5% HCAS.",
      text: "Fringe-level living costs without fringe pay squeeze take-home income and push staff to look elsewhere.",
      tone: "problem",
    },
    {
      icon: "📌",
      label: "Ask",
      kicker: "Add Medway to the 5% HCAS fringe zone.",
      text: "Add Medway to the 5% High Cost Area Supplement (HCAS) fringe zone in line with neighbouring comparators.",
      tone: "ask",
    },
    {
      icon: "🎯",
      label: "Impact",
      kicker: "Better retention and stable services.",
      text: "Better retention, lower agency spend and more stable services for patients across Medway and the wider system.",
      tone: "impact",
    },
  ];

  const priorityOutcomes = [
    {
      icon: "⚖️",
      title: "Level the field",
      copy: "Keeps pay within the same band as nearby fringe areas and avoids a pay gap that pulls staff away (see Key indicators).",
    },
    {
      icon: "🧲",
      title: "Retain talent",
      copy: "A 5% uplift counters moves to fringe or outer-London roles made easier by HS1 and road links.",
    },
    {
      icon: "🛡️",
      title: "Protect services",
      copy: "Locks in the drop from 34% to 9% vacancies, reducing fragile rotas and reliance on premium agency cover.",
    },
    {
      icon: "💷",
      title: "Deliver value",
      copy: "Retention over agency saves around £2m a year and keeps pay in permanent ward teams instead of premium cover.",
    },
  ];

  const nextMoves = [
    "Package this evidence into a short HCAS dossier and slide pack for Medway FT Board, ICS and NHS Pay Review Body (NHSPRB).",
    "Agree a standard comparator set (Dartford, Gravesham, Thurrock) and secure staff-side and ICS letters of support.",
    "Submit within the NHSPRB evidence window and use the Staff Council stage to lock in implementation details.",
  ];

  const toneClass = (tone) => {
    if (tone === "problem") return "bg-orange-50 text-orange-800 border-orange-200";
    if (tone === "ask") return "bg-blue-50 text-blue-800 border-blue-200";
    return "bg-green-50 text-green-800 border-green-200";
  };

  return (
    <section id="executive-summary" data-aos="fade-up" className="my-10">
      <div className="mx-auto max-w-screen-xl flex flex-col gap-8">
        {/* ROW 1 — EXEC SUMMARY + HOSPITAL HERO */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
          {/* Exec summary card */}
          <article className="nhs-card flex-1 p-6 md:p-8 flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-2 text-sm mb-1">
              <span
                aria-hidden="true"
                className="w-1.5 h-5 rounded-full"
                style={{ background: "var(--nhs-blue)" }}
              />
              <p className="text-sm" style={{ color: "var(--nhs-ink)", opacity: 0.9 }}>
                Executive summary
              </p>
              <span className="text-xs font-semibold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                Case for Medway&apos;s 5% HCAS
              </span>
            </div>

            <header>
              <h1
                className="text-3xl md:text-4xl leading-tight mb-3"
                style={{ color: "var(--nhs-blue)", fontWeight: 800 }}
              >
                Why Medway merits the 5% fringe HCAS
              </h1>

              <div className="space-y-2 text-lg" style={{ color: "var(--nhs-ink)" }}>
                <p>
                  Medway faces housing, rent, council tax and travel costs similar to fringe trusts, but
                  staff do not receive the 5% High Cost Area Supplement (HCAS).
                </p>
                <p>
                  This reduces take-home pay, makes fringe and outer-London moves more attractive and risks
                  undoing recent vacancy gains.
                </p>
                <p>
                  A 5% HCAS brings Medway in line with comparators, supports retention and protects core services.
                </p>
              </div>
            </header>

            {/* Problem / Ask / Impact strip */}
            <section className="mt-2 rounded-2xl bg-gradient-to-r from-blue-50/80 via-blue-50/50 to-transparent border border-blue-100 p-4">
              <div className="grid gap-3 sm:grid-cols-3">
                {headlineStrip.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-slate-100 bg-white/80 px-4 py-3 flex flex-col shadow-sm shadow-slate-200/60"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-600 flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 border ${toneClass(
                          item.tone
                        )}`}
                      >
                        <span className="text-[11px] font-bold">{item.label}</span>
                        <span aria-hidden="true">{item.icon}</span>
                      </span>
                    </p>
                    <p className="mt-2 text-sm text-slate-800 font-semibold">{item.kicker}</p>
                    <p className="text-sm text-slate-700">{item.text}</p>
                  </div>
                ))}
              </div>
            </section>
          </article>

          {/* Hospital hero image */}
          <figure className="nhs-card flex-1 p-0 overflow-hidden flex flex-col">
            <div className="relative flex-1 min-h-[260px] sm:min-h-[320px] bg-slate-100">
              <img
                src={hospitalUrl}
                alt="Medway Maritime Hospital main entrance, illustrating London-edge workforce pressures."
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover block"
              />
            </div>

            {/* Updated caption: pills above text (no “bookend” effect) */}
            <figcaption className="shrink-0 bg-slate-900 text-white text-xs sm:text-sm px-4 py-3">
              <div className="flex flex-wrap items-center gap-2">
                <CaptionPill>At a glance</CaptionPill>
                <CaptionPill>London-edge labour market</CaptionPill>
                <CaptionPill>No 5% HCAS</CaptionPill>
              </div>

              <p className="mt-2 leading-snug text-white/90">
                Medway operates in a London-edge workforce market with fringe-level living costs, but staff do not
                receive the 5% High Cost Area Supplement (HCAS).
              </p>
            </figcaption>
          </figure>
        </div>

        {/* ROW 2 — KEY INDICATORS + SKYLINE */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
          {/* Key indicators */}
          <section className="nhs-card flex-1 p-4 sm:p-5 flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500 flex items-center gap-1">
                <span aria-hidden="true">📊</span>
                <span>Key indicators</span>
              </p>
              <span className="text-xs font-semibold text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Cost-of-living + workforce
              </span>
            </div>

            <div>
              <h2 className="text-base sm:text-lg font-semibold text-slate-900">
                Signals that put Medway in the 5% fringe zone
              </h2>
              <p className="text-sm text-slate-600">
                Costs and workforce metrics that place Medway alongside fringe comparators.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 mt-1" aria-label="Key facts">
              {summaryStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {stat.icon && (
                      <span aria-hidden="true" className="mr-1">
                        {stat.icon}
                      </span>
                    )}
                    {stat.label}
                  </p>
                  <p className="text-[24px] sm:text-[28px] leading-tight font-bold text-[#005EB8]">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-600">{stat.note}</p>
                </div>
              ))}
            </div>

            <div className="mt-1">
              <a
                href="#evidence"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#005EB8] underline underline-offset-2"
              >
                <span aria-hidden="true">🔍</span>
                <span>View full evidence table</span>
              </a>
            </div>
          </section>

          {/* Skyline image */}
          <figure className="nhs-card flex-1 p-0 overflow-hidden flex flex-col">
            <div className="relative flex-1 min-h-[260px] sm:min-h-[320px] bg-slate-100">
              <img
                src={skylineUrl}
                alt="Illustrative Medway skyline, representing commuter routes and the London-edge corridor."
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover block"
              />
            </div>

            {/* Updated caption: project-specific narrative (not placeholder) */}
            <figcaption className="shrink-0 bg-slate-800 text-white/90 text-xs sm:text-sm px-4 py-3">
              <div className="flex flex-wrap items-center gap-2">
                <CaptionPill>Catchment &amp; commuter corridor</CaptionPill>
                <CaptionPill>HS1 · A2/M2</CaptionPill>
                <CaptionPill>Fringe comparators nearby</CaptionPill>
              </div>

              <p className="mt-2 leading-snug text-white/90">
                Fast links widen staff options across neighbouring fringe and outer-London employers, increasing pay
                competition and strengthening the case for 5% HCAS alignment.
              </p>
            </figcaption>
          </figure>
        </div>

        {/* ROW 3 — WHAT A 5% HCAS UNLOCKS */}
        <section className="nhs-card p-6 md:p-8 flex flex-col gap-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">What a 5% HCAS unlocks</h2>
            <p className="text-sm text-slate-600 mt-1">
              Outcomes that keep pay, talent and services aligned with fringe comparators.
            </p>
          </div>

          <div className="space-y-4" style={{ color: "var(--nhs-ink)" }}>
            {priorityOutcomes.map((item) => (
              <div key={item.title} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-base border border-blue-100"
                >
                  {item.icon}
                </span>
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-slate-700">{item.copy}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-900 flex items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-blue-700 text-xs border border-blue-200"
              >
                ⏭
              </span>
              <span>Immediate next moves</span>
            </p>
            <ol className="mt-2 list-decimal ml-5 text-sm text-blue-900 space-y-1.5">
              {nextMoves.map((move, idx) => (
                <li key={idx}>{move}</li>
              ))}
            </ol>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="#evidence"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded min-w-[170px]"
              style={{
                background: "var(--nhs-blue)",
                color: "#fff",
                fontWeight: 700,
              }}
            >
              <span aria-hidden="true">📊</span>
              <span>See Evidence Table</span>
            </a>
            <a
              href="#policy"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded border min-w-[170px]"
              style={{
                borderColor: "var(--nhs-blue)",
                color: "var(--nhs-blue)",
                fontWeight: 700,
              }}
            >
              <span aria-hidden="true">🧭</span>
              <span>See Policy Route</span>
            </a>
          </div>

          <div className="pt-4 border-t border-slate-200/80">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 flex items-center gap-2">
              <span aria-hidden="true">🔗</span>
              <span>Data sources</span>
            </p>
            <p className="mt-1 text-xs sm:text-sm" style={{ color: "var(--nhs-ink)", opacity: 0.85 }}>
              Data shown here covers: house prices to Dec&nbsp;2024; private rents from Jan&nbsp;2024 to Jan&nbsp;2025; 2025
              standard annual rail seasons; and 2023/24 Band&nbsp;D council tax. See full Sources &amp; Methods for detailed
              definitions and comparators.
            </p>
          </div>
        </section>
      </div>
    </section>
  );
}
