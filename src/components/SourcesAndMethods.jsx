// src/components/SourcesAndMethods.jsx
import React, { useMemo, useState, useId, useEffect } from "react";
import { SOURCES, VERIFY_STEPS } from "../data/evidence";

const cx = (...arr) => arr.filter(Boolean).join(" ");

function safeHost(url) {
  if (!url) return null;
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

function normalise(str) {
  return (str ?? "").toString().trim().toLowerCase();
}

function groupLabel(group) {
  switch (group) {
    case "Cost":
      return "Cost sources (housing, rent, council tax, rail)";
    case "Workforce":
      return "Workforce sources (turnover, vacancy, agency)";
    case "Policy":
      return "Policy sources (AfC, NHSPRB, DHSC statements)";
    default:
      return `${group} sources`;
  }
}

function groupIcon(group) {
  switch (group) {
    case "Cost":
      return "💷";
    case "Workforce":
      return "👥";
    case "Policy":
      return "📘";
    default:
      return "📁";
  }
}

function isCostDomain(domain = "") {
  const d = normalise(domain);
  return /house|rent|rail|council|tax|cost/.test(d);
}

function getChecklistCategory(lowerDomain) {
  if (/house|rent|rail|council|tax|cost/.test(lowerDomain)) return "Cost";
  if (/workforce|vacancy|turnover|staff/.test(lowerDomain)) return "Workforce";
  if (/catchment|flows|patient|referral/.test(lowerDomain)) return "Catchment";
  if (/policy|hcas|afc|prb|nhsprb/.test(lowerDomain)) return "Policy";
  return "General";
}

function buildChecklistText(steps = []) {
  // Friendly for pasting into email/Word/Teams
  return (steps ?? [])
    .map((v) => {
      const header = v.domain || "Domain";
      const items = (v.steps ?? []).map((s) => `- ${s}`).join("\n");
      return `${header}\n${items}`;
    })
    .join("\n\n");
}

function SourceCard({ tag, label, url, icon }) {
  const host = safeHost(url);

  const card = (
    <article className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 shadow-sm flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 flex items-center gap-1">
          {icon && (
            <span aria-hidden="true" className="text-base">
              {icon}
            </span>
          )}
          <span>{tag}</span>
        </p>
        {host && (
          <span className="inline-flex items-center rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-slate-600 border border-slate-200">
            {host}
          </span>
        )}
      </div>

      <p className="text-sm text-gray-900 font-semibold leading-snug">{label}</p>

      <p className="text-[11px] text-slate-500">
        {url ? "External reference" : "Local reference"}
      </p>
    </article>
  );

  if (!url) return card;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      className="block rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#005EB8] focus:ring-offset-2"
      aria-label={`Open source: ${label}`}
      title="Open source in a new tab"
    >
      {card}
    </a>
  );
}

function ChecklistPanel({ domain, steps, defaultOpen = true }) {
  const lower = normalise(domain);
  const category = getChecklistCategory(lower);

  let icon = "✅";
  if (/house|rent|rail|council|tax|cost/.test(lower)) icon = "💷";
  else if (/workforce|vacancy|turnover|staff/.test(lower)) icon = "👥";
  else if (/catchment|flows|patient|referral/.test(lower)) icon = "🗺️";
  else if (/policy|hcas|afc|prb|nhsprb/.test(lower)) icon = "📜";

  return (
    <details
      open={defaultOpen}
      className="rounded-2xl border border-white/50 bg-white/90 p-4 shadow-sm"
    >
      <summary className="cursor-pointer list-none focus:outline-none">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <span aria-hidden="true">{icon}</span>
              <span>{domain}</span>
            </h4>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              {category} checklist
            </p>
          </div>
          <span className="mt-1 inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
            {(steps ?? []).length} step{(steps ?? []).length === 1 ? "" : "s"}
          </span>
        </div>
      </summary>

      <ul className="mt-3 space-y-1 text-sm text-gray-700">
        {(steps ?? []).map((step, idx) => (
          <li key={idx} className="flex gap-2">
            <span aria-hidden="true" className="mt-0.5">
              ✔️
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ul>
    </details>
  );
}

export default function SourcesAndMethods({
  id = "sources",
  evidencePackUrl, // optional: provide a real URL (PDF/zip/Drive link etc.)
  onDownloadEvidence, // optional: if you want to handle this in-app
}) {
  const baseId = useId();
  const sectionId = (suffix) => `${id}-${baseId}-${suffix}`;

  const [query, setQuery] = useState("");
  const [copyState, setCopyState] = useState("idle"); // idle | copied | error
  const [liveMessage, setLiveMessage] = useState("");

  useEffect(() => {
    if (!liveMessage) return;
    const t = setTimeout(() => setLiveMessage(""), 2500);
    return () => clearTimeout(t);
  }, [liveMessage]);

  const grouped = useMemo(() => {
    const acc = {};
    (SOURCES ?? []).forEach((source) => {
      const type = source?.type || "Other";
      acc[type] = acc[type] ? [...acc[type], source] : [source];
    });
    return acc;
  }, []);

  const filteredGrouped = useMemo(() => {
    const q = normalise(query);
    if (!q) return grouped;

    const out = {};
    Object.entries(grouped).forEach(([group, items]) => {
      const keep = (items ?? []).filter((s) => {
        const h = safeHost(s?.url);
        const hay = [
          s?.tag,
          s?.label,
          s?.url,
          h,
          s?.type,
        ]
          .filter(Boolean)
          .map(normalise)
          .join(" | ");
        return hay.includes(q);
      });
      if (keep.length) out[group] = keep;
    });

    return out;
  }, [grouped, query]);

  const totalSourceCount = useMemo(() => {
    return Object.values(filteredGrouped).reduce((n, arr) => n + (arr?.length ?? 0), 0);
  }, [filteredGrouped]);

  const costChecklist = useMemo(
    () => (VERIFY_STEPS ?? []).filter((v) => isCostDomain(v.domain)),
    []
  );
  const otherChecklist = useMemo(
    () => (VERIFY_STEPS ?? []).filter((v) => !isCostDomain(v.domain)),
    []
  );

  const filteredCostChecklist = useMemo(() => {
    const q = normalise(query);
    if (!q) return costChecklist;
    return costChecklist.filter((v) => normalise(v.domain).includes(q));
  }, [costChecklist, query]);

  const filteredOtherChecklist = useMemo(() => {
    const q = normalise(query);
    if (!q) return otherChecklist;
    return otherChecklist.filter((v) => normalise(v.domain).includes(q));
  }, [otherChecklist, query]);

  async function handleCopyChecklist() {
    const text = buildChecklistText(VERIFY_STEPS);

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setCopyState("copied");
        setLiveMessage("Checklist copied to clipboard.");
        return;
      }

      // Fallback: best-effort (older browsers)
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);

      setCopyState("copied");
      setLiveMessage("Checklist copied to clipboard.");
    } catch {
      setCopyState("error");
      setLiveMessage("Copy failed. Select and copy manually.");
    } finally {
      setTimeout(() => setCopyState("idle"), 2000);
    }
  }

  const downloadNode = evidencePackUrl ? (
    <a
      href={evidencePackUrl}
      target="_blank"
      rel="noreferrer noopener"
      className="rounded-full border-2 border-blue-700 px-4 py-1.5 text-xs md:text-sm font-semibold text-blue-700 hover:bg-blue-700 hover:text-white transition inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#005EB8] focus:ring-offset-2"
    >
      <span aria-hidden="true">📥</span>
      <span>Download evidence pack</span>
    </a>
  ) : (
    <button
      type="button"
      onClick={onDownloadEvidence}
      disabled={!onDownloadEvidence}
      className={cx(
        "rounded-full border-2 px-4 py-1.5 text-xs md:text-sm font-semibold transition inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#005EB8] focus:ring-offset-2",
        onDownloadEvidence
          ? "border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white"
          : "border-slate-300 text-slate-400 cursor-not-allowed"
      )}
      aria-label="Download evidence pack"
      title={onDownloadEvidence ? "Download evidence pack" : "No download configured"}
    >
      <span aria-hidden="true">📥</span>
      <span>Download evidence pack</span>
    </button>
  );

  return (
    <section
      id={id}
      aria-labelledby={sectionId("title")}
      className="bg-white rounded-2xl shadow p-6"
    >
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-wide font-semibold text-slate-500 flex items-center gap-1">
            <span aria-hidden="true">📚</span>
            <span>Documentation</span>
          </p>
          <h2
            id={sectionId("title")}
            className="text-3xl font-bold text-blue-800 flex items-center gap-2"
          >
            <span aria-hidden="true">📂</span>
            <span>Sources &amp; methods</span>
          </h2>

          <p className="mt-1 text-sm text-slate-600 max-w-2xl">
            Public sources, local metrics and policy references underpin the High Cost Area
            Supplement (HCAS) case. This section also includes a repeatable checklist so figures
            can be refreshed consistently.
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          {downloadNode}
          <span className="inline-flex items-center rounded-full bg-[#e6f0f9] px-3 py-1 text-xs font-semibold text-[#005EB8]">
            {totalSourceCount} source{totalSourceCount === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      {/* Search + Jump links */}
      <div className="mb-4 flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor={sectionId("search")} className="text-xs font-semibold text-slate-600">
            Search sources / checklist
          </label>
          <input
            id={sectionId("search")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. ONS, council tax, AfC, nhs…"
            className="w-full sm:max-w-md rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#005EB8] focus:ring-offset-2"
          />
        </div>

        <nav
          aria-label="On this page"
          className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500"
        >
          <span className="uppercase tracking-wide mr-1">Jump to:</span>
          {Object.keys(filteredGrouped).map((g) => (
            <a
              key={g}
              href={`#${sectionId(`group-${g.toLowerCase()}`)}`}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-50 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#005EB8] focus:ring-offset-2"
            >
              <span aria-hidden="true">{groupIcon(g)}</span>
              <span>
                {g} ({filteredGrouped[g]?.length ?? 0})
              </span>
            </a>
          ))}
          <a
            href={`#${sectionId("checklist")}`}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-50 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#005EB8] focus:ring-offset-2"
          >
            ✅ <span>Checklist</span>
          </a>
        </nav>
      </div>

      {/* Source groups */}
      <div className="space-y-6">
        {Object.entries(filteredGrouped).map(([group, items]) => (
          <section
            key={group}
            id={sectionId(`group-${group.toLowerCase()}`)}
            aria-label={`${groupLabel(group)} sources`}
            className="space-y-2"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 flex items-center gap-2">
                <span aria-hidden="true" className="text-base">
                  {groupIcon(group)}
                </span>
                <span>{groupLabel(group)}</span>
              </h3>
              <span className="text-[11px] font-semibold text-slate-500">
                {items.length} item{items.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {items.map((item) => (
                <SourceCard key={item.tag} icon={groupIcon(group)} {...item} />
              ))}
            </div>
          </section>
        ))}

        {!totalSourceCount && (
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700">
            No matches for <span className="font-semibold">{query}</span>.
          </div>
        )}
      </div>

      {/* Live region for copy feedback */}
      <div aria-live="polite" className="sr-only">
        {liveMessage}
      </div>

      {/* Verification checklist */}
      <div
        id={sectionId("checklist")}
        className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/70 p-4"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-blue-900 flex items-center gap-1">
              <span aria-hidden="true">🧾</span>
              <span>Verification checklist</span>
            </h3>
            <p className="mt-1 text-sm text-blue-900/80 max-w-2xl">
              Use this when refreshing figures or answering follow-up questions. It shows how each
              domain is rebuilt from source data into the outputs used in this case.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCopyChecklist}
            className={cx(
              "inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold border transition focus:outline-none focus:ring-2 focus:ring-[#005EB8] focus:ring-offset-2",
              copyState === "copied"
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : copyState === "error"
                ? "bg-rose-50 text-rose-800 border-rose-200"
                : "bg-white/70 text-blue-800 border-blue-200 hover:bg-white"
            )}
          >
            <span aria-hidden="true">{copyState === "copied" ? "✅" : copyState === "error" ? "⚠️" : "📋"}</span>
            <span>
              {copyState === "copied"
                ? "Copied"
                : copyState === "error"
                ? "Copy failed"
                : "Copy checklist"}
            </span>
          </button>
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          <div className="space-y-3">
            {filteredCostChecklist.map((v) => (
              <ChecklistPanel key={v.domain} domain={v.domain} steps={v.steps} defaultOpen />
            ))}
          </div>
          <div className="space-y-3">
            {filteredOtherChecklist.map((v) => (
              <ChecklistPanel key={v.domain} domain={v.domain} steps={v.steps} defaultOpen={false} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
