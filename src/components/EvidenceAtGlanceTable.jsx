// src/components/EvidenceAtGlanceTable.jsx
import React, { useMemo, useState, useRef, useEffect, useId } from "react";
import { EVIDENCE_ROWS as DEFAULT_ROWS } from "../data/evidence";

/**
 * EvidenceAtGlanceTable
 *
 * Key upgrades:
 * - Unique internal IDs via useId() (safe if rendered more than once)
 * - Group order stays fixed (Cost → Workforce → Supporting); sorting happens within groups
 * - footerNote/freshnessNote unified (meta + footer use the same final text)
 * - CSV export: UTF-8 BOM + URL.revokeObjectURL
 * - Row striping controlled in JS so sticky first column matches stripe colour
 * - Slight ARIA improvements for sort buttons + live updates
 */
export default function EvidenceAtGlanceTable({
  id = "evidence", // keeps your #evidence links working
  title = "Evidence at a glance",
  rows = DEFAULT_ROWS ?? [],
  highlightRowKeys = [],
  highlightMedwayColumn = true,
  isSortable = true,
  compact = false,
  freshnessNote = "Periods aligned across cost and workforce indicators; see Sources & Methods for definitions, comparators and any FOI-sourced data.",
  footerNote,
  loading = false,
  error = null,
  onExportCSV,
}) {
  const uid = useId();
  const baseId = `${id}__${uid}`;

  const [sortBy, setSortBy] = useState("domain");
  const [sortDir, setSortDir] = useState("asc");

  const downloadRef = useRef(null);
  const liveRef = useRef(null);

  const footerText = footerNote || freshnessNote;

  const colDefs = useMemo(
    () => [
      { key: "domain", label: "Domain" },
      { key: "medway", label: "Medway" },
      { key: "comparators", label: "Fringe comparators" },
      { key: "why", label: "Why it matters" },
    ],
    []
  );

  // --- Live region updates for sort changes ---
  useEffect(() => {
    if (!liveRef.current) return;
    const label = colDefs.find((c) => c.key === sortBy)?.label || sortBy;
    liveRef.current.textContent = `Sorted by ${label} ${sortDir}`;
  }, [sortBy, sortDir, colDefs]);

  // --- Group counts + summary line ---
  const groupCounts = useMemo(() => {
    const counts = { cost: 0, workforce: 0, other: 0 };
    (rows ?? []).forEach((row) => {
      const group = resolveDomainGroup(row);
      if (group === "Cost pressures") counts.cost += 1;
      else if (group === "Workforce pressures") counts.workforce += 1;
      else counts.other += 1;
    });
    return counts;
  }, [rows]);

  const summaryLine = useMemo(() => {
    const total = rows?.length ?? 0;
    if (!total) {
      return "Side-by-side view of key Medway vs fringe comparators across cost, workforce and supporting evidence.";
    }
    const hasCost = groupCounts.cost > 0;
    const hasWorkforce = groupCounts.workforce > 0;
    if (hasCost && hasWorkforce) {
      return "Medway costs now sit at fringe levels; workforce gains remain fragile without a 5% HCAS uplift.";
    }
    if (hasCost) {
      return "Medway’s cost-of-living indicators align with or exceed neighbouring fringe comparators.";
    }
    if (hasWorkforce) {
      return "Workforce indicators highlight ongoing retention and vacancy risks without a 5% HCAS uplift.";
    }
    return "Evidence rows summarise Medway’s position against fringe comparators.";
  }, [rows, groupCounts]);

  const datapointChip = useMemo(() => {
    const total = rows?.length ?? 0;
    const parts = [`${total} datapoint${total === 1 ? "" : "s"}`];
    if (groupCounts.cost) parts.push(`${groupCounts.cost} cost`);
    if (groupCounts.workforce) parts.push(`${groupCounts.workforce} workforce`);
    if (groupCounts.other) parts.push(`${groupCounts.other} supporting`);
    return parts.join(" · ");
  }, [rows, groupCounts]);

  // ---------------------------------------------------------------------------
  // Sorting
  // ---------------------------------------------------------------------------

  const groupIndex = (group) => {
    if (group === "Cost pressures") return 0;
    if (group === "Workforce pressures") return 1;
    return 2; // Supporting evidence (or unknown)
  };

  const sortedRows = useMemo(() => {
    const data = Array.isArray(rows) ? [...rows] : [];
    if (!isSortable || !sortBy) return data;

    const collator = new Intl.Collator("en-GB", { numeric: true, sensitivity: "base" });

    data.sort((a, b) => {
      // 1) Always keep groups together in a stable order
      const ga = resolveDomainGroup(a);
      const gb = resolveDomainGroup(b);
      const gDiff = groupIndex(ga) - groupIndex(gb);
      if (gDiff !== 0) return gDiff;

      // 2) If sorting by domain, prefer severity within-group (high first)
      if (sortBy === "domain") {
        const sa = severityRank(a?.severity);
        const sb = severityRank(b?.severity);
        if (sa !== sb) return sb - sa; // high → low regardless of sortDir
      }

      // 3) Then apply selected sort column
      const av = (a?.[sortBy] ?? "").toString();
      const bv = (b?.[sortBy] ?? "").toString();
      const res = collator.compare(av, bv);
      return sortDir === "asc" ? res : -res;
    });

    return data;
  }, [rows, isSortable, sortBy, sortDir]);

  const handleSort = (key) => {
    if (!isSortable) return;
    if (sortBy === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDir("asc");
    }
  };

  const ariaSortFor = (key) =>
    !isSortable || sortBy !== key ? "none" : sortDir === "asc" ? "ascending" : "descending";

  const nextSortHint = (key) => {
    if (!isSortable) return "";
    if (sortBy !== key) return "activate to sort ascending";
    return sortDir === "asc" ? "activate to sort descending" : "activate to sort ascending";
  };

  // ---------------------------------------------------------------------------
  // CSV helpers
  // ---------------------------------------------------------------------------

  const safeCSV = (val) => {
    const s = (val ?? "").toString();
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };

  const toCSV = (data) => {
    const headers = colDefs.map((c) => c.label);
    const lines = [
      headers.join(","),
      ...data.map((r) =>
        [r.domain ?? "", r.medway ?? "", r.comparators ?? "", r.why ?? ""].map(safeCSV).join(",")
      ),
    ];
    return lines.join("\n");
  };

  const exportCSV = () => {
    const csvBody = toCSV(sortedRows);
    onExportCSV?.(csvBody);

    // UTF-8 BOM helps Excel read UTF-8 correctly
    const csv = "\ufeff" + csvBody;

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = downloadRef.current;
    if (a) {
      a.href = url;
      a.download = "evidence_at_a_glance.csv";
      a.click();
      // Revoke soon after click to avoid holding the Blob in memory
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  };

  // ---------------------------------------------------------------------------
  // States
  // ---------------------------------------------------------------------------

  if (loading) return skeleton(title);
  if (error) return errorBlock(title, error);
  if (!sortedRows?.length) return emptyBlock(title);

  const tdBase = compact ? "p-2" : "p-3";
  const thBase = compact ? "p-2" : "p-3";

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <section id={id} aria-labelledby={`${baseId}__heading`} className="bg-white rounded-2xl shadow p-6">
      {/* Heading + summary */}
      <div className="mb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id={`${baseId}__heading`} className="text-3xl font-bold" style={{ color: "var(--nhs-blue)" }}>
            {title}
          </h2>
          <span className="inline-flex items-center rounded-full bg-[#e6f0f9] px-3 py-1 text-sm font-semibold text-[#005EB8]">
            {datapointChip}
          </span>
        </div>
        <p className="mt-2 text-base leading-snug text-slate-600">{summaryLine}</p>
      </div>

      {/* Meta strip: freshness note + export */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 px-4 py-3">
        <p className="text-sm text-slate-600">
          {footerText}{" "}
          <a href="#sources" className="font-semibold underline" style={{ color: "var(--nhs-blue)" }}>
            Sources &amp; Methods
          </a>
        </p>

        <div className="shrink-0">
          <button
            type="button"
            onClick={exportCSV}
            className="inline-flex items-center gap-2 rounded-lg border-2 border-[#005EB8] px-3 py-1.5 text-sm font-bold text-[#005EB8] transition hover:bg-[#005EB8] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#005EB8] focus:ring-offset-2"
            aria-label="Export table to CSV"
            title="Export CSV"
          >
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M3 14.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a1 1 0 001 1h8a1 1 0 001-1v-1a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1A3 3 0 0114 19H6a3 3 0 01-3-3v-1z" />
              <path d="M10 3a.75.75 0 01.75.75v7.19l2.22-2.22a.75.75 0 111.06 1.06l-3.5 3.5a.75.75 0 01-1.06 0l-3.5-3.5a.75.75 0 111.06-1.06l2.22 2.22V3.75A.75.75 0 0110 3z" />
            </svg>
            Export CSV
          </button>
          <a ref={downloadRef} className="hidden" />
        </div>
      </div>

      {/* Live region for sorting updates */}
      <p ref={liveRef} role="status" aria-live="polite" className="sr-only" />

      {/* Mobile card view */}
      <div className="mt-2 space-y-3 md:hidden">
        {sortedRows.map((r, i) => {
          const group = resolveDomainGroup(r);
          const prevGroup = i > 0 ? resolveDomainGroup(sortedRows[i - 1]) : null;
          const showGroup = group && group !== prevGroup;
          const rowKey = r.key ?? `${r.domain ?? "row"}-${i}`;

          return (
            <article key={rowKey} className="rounded-2xl border border-gray-100 bg-white/90 p-4 shadow-sm">
              {showGroup && (
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#005EB8]">
                  {getDomainGroupLabel(group)}
                </p>
              )}

              <h3 className="mb-1 text-lg font-bold" style={{ color: "var(--nhs-blue)" }}>
                {withDomainIcon(r.domain)}
              </h3>

              <dl className="space-y-1 text-sm">
                <div>
                  <dt className="font-semibold text-gray-500">Medway</dt>
                  <dd>
                    <MedwayValue value={r.medway} comparators={r.comparators} severity={r.severity} />
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-500">Fringe comparators</dt>
                  <dd>{formatWithBadges(r.comparators)}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-500">Why it matters</dt>
                  <dd>{r.why || "—"}</dd>
                </div>
              </dl>
            </article>
          );
        })}
      </div>

      {/* Desktop table view */}
      <div className="mt-2 hidden overflow-x-auto md:block">
        <table className="w-full border-separate border-spacing-0" aria-describedby={`${baseId}__desc`}>
          <caption id={`${baseId}__desc`} className="sr-only">
            {footerText}
          </caption>

          <thead>
            <tr className="text-left">
              {colDefs.map((col, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === colDefs.length - 1;

                return (
                  <th
                    key={col.key}
                    scope="col"
                    className={[
                      thBase,
                      "sticky top-0",
                      isFirst ? "left-0 z-30 rounded-tl-xl" : "z-20",
                      isLast ? "rounded-tr-xl" : "",
                    ].join(" ")}
                    style={{
                      background: "var(--nhs-blue-50)",
                      color: "var(--nhs-ink)",
                      boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,0.6)",
                      minWidth: isFirst ? 240 : isLast ? 360 : 220,
                      whiteSpace: isLast ? "normal" : "nowrap",
                    }}
                    aria-sort={ariaSortFor(col.key)}
                  >
                    {isSortable ? (
                      <button
                        type="button"
                        onClick={() => handleSort(col.key)}
                        className="inline-flex items-center gap-1 font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2"
                        style={{ color: "var(--nhs-ink)" }}
                        aria-label={`Sort by ${col.label} (${nextSortHint(col.key)})`}
                      >
                        {col.label}
                        {sortBy === col.key && <span aria-hidden="true">{sortDir === "asc" ? "▲" : "▼"}</span>}
                      </button>
                    ) : (
                      <span className="font-semibold">{col.label}</span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {sortedRows.map((r, idx) => {
              const rowKey = r.key ?? `${r.domain ?? "row"}-${idx}`;
              const group = resolveDomainGroup(r);
              const prevGroup = idx > 0 ? resolveDomainGroup(sortedRows[idx - 1]) : null;
              const showGroup = group && group !== prevGroup;

              const highlightRow =
                highlightRowKeys.includes(r.key) || highlightRowKeys.includes(r.domain);

              const striped = idx % 2 === 1;
              const rowBg = striped ? "rgba(239, 246, 255, 0.4)" : "white"; // blue-50/40-ish

              return (
                <React.Fragment key={rowKey}>
                  {showGroup && (
                    <tr>
                      <th
                        scope="colgroup"
                        colSpan={4}
                        className="bg-[#f3f8ff] px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-[#005EB8]"
                      >
                        {getDomainGroupLabel(group)}
                      </th>
                    </tr>
                  )}

                  <tr
                    className={`border-t border-gray-100 ${highlightRow ? "ring-1 ring-inset ring-[var(--nhs-blue)]" : ""}`}
                    style={{ background: rowBg }}
                  >
                    {/* Sticky first column */}
                    <th
                      scope="row"
                      className={`${tdBase} sticky left-0 z-10 font-medium`}
                      style={{
                        color: "var(--nhs-ink)",
                        background: rowBg,
                        minWidth: 240,
                      }}
                    >
                      {withDomainIcon(r.domain)}
                    </th>

                    {/* Medway */}
                    <td
                      className={tdBase}
                      style={{
                        color: "var(--nhs-ink)",
                        background: highlightMedwayColumn ? "rgba(0,94,184,0.06)" : rowBg,
                        fontWeight: highlightMedwayColumn ? 600 : 400,
                        minWidth: 220,
                      }}
                    >
                      <MedwayValue value={r.medway} comparators={r.comparators} severity={r.severity} />
                    </td>

                    {/* Comparators */}
                    <td className={tdBase} style={{ color: "var(--nhs-ink)", minWidth: 220 }}>
                      {formatWithBadges(r.comparators)}
                    </td>

                    {/* Why it matters */}
                    <td className={tdBase} style={{ color: "#374151", whiteSpace: "normal", minWidth: 360 }}>
                      {r.why || <span className="text-gray-400">-</span>}
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan={4} className={`${tdBase} text-sm`} style={{ color: "var(--nhs-ink)", opacity: 0.85 }}>
                {footerText}{" "}
                <a href="#sources" className="underline" style={{ color: "var(--nhs-blue)" }}>
                  Sources &amp; Methods
                </a>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------- */
/* Loading / error / empty states                                            */
/* ------------------------------------------------------------------------- */

function skeleton(title) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow" role="status" aria-live="polite">
      <h2 className="mb-2 text-3xl font-bold" style={{ color: "var(--nhs-blue)" }}>
        {title}
      </h2>
      <div className="mt-4 space-y-2">
        <div className="h-4 animate-pulse rounded bg-gray-100" />
        <div className="h-4 animate-pulse rounded bg-gray-100" />
        <div className="h-4 animate-pulse rounded bg-gray-100" />
      </div>
    </div>
  );
}

function errorBlock(title, error) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow" role="status" aria-live="polite">
      <h2 className="mb-2 text-3xl font-bold" style={{ color: "var(--nhs-blue)" }}>
        {title}
      </h2>
      <p className="text-sm text-red-700">Could not load evidence: {error}</p>
    </div>
  );
}

function emptyBlock(title) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-2 text-3xl font-bold" style={{ color: "var(--nhs-blue)" }}>
        {title}
      </h2>
      <p className="text-sm" style={{ color: "var(--nhs-ink)", opacity: 0.85 }}>
        No evidence rows to display. Check data sources or filters.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/* Formatting helpers                                                        */
/* ------------------------------------------------------------------------- */

function severityRank(severity) {
  switch (severity) {
    case "high":
      return 3;
    case "medium":
      return 2;
    case "improving":
      return 1;
    case "low":
      return 0;
    default:
      return -1;
  }
}

function withDomainIcon(domain) {
  const d = (domain || "").toLowerCase();
  const icon =
    d.includes("council") || d.includes("band")
      ? "🪙"
      : d.includes("house") || d.includes("price")
      ? "🏠"
      : d.includes("rent")
      ? "📈"
      : d.includes("rail") || d.includes("ticket") || d.includes("transport")
      ? "🚆"
      : d.includes("turnover")
      ? "🔄"
      : d.includes("vacancy")
      ? "📉"
      : "🔹";
  return (
    <span className="inline-flex items-center gap-2">
      <span aria-hidden="true">{icon}</span>
      <span>{domain || "—"}</span>
    </span>
  );
}

function formatWithBadges(value) {
  if (!value) return <span className="text-gray-400">-</span>;

  const parts = value.toString().split(/(\s+)/);
  return parts.map((p, i) => {
    const token = p.trim();

    // Percent or currency tokens
    if (/^\+?\-?\d+(\.\d+)?%$/.test(token) || /^£\s?\d/.test(token) || /^~?£\s?\d/.test(token)) {
      return (
        <span
          key={i}
          className="mr-1 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-bold"
          style={{
            background: "var(--nhs-blue-50)",
            color: "var(--nhs-blue)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {p}
        </span>
      );
    }

    if (token === "→" || token === "->") {
      return (
        <span key={i} className="mx-1">
          →
        </span>
      );
    }

    return <React.Fragment key={i}>{p}</React.Fragment>;
  });
}

/* ------------------------------------------------------------------------- */
/* Medway value + trend / gap chips                                          */
/* ------------------------------------------------------------------------- */

function MedwayValue({ value, comparators, severity }) {
  const { main, period } = parseValueParts(value);
  const inferredDirection = inferTrendDirection(main);

  const direction =
    severity === "high" ? "up" : severity === "improving" ? "down" : severity === "medium" ? "steady" : inferredDirection;

  const gap = computeGap(value, comparators);

  return (
    <div className="flex flex-col gap-1 text-sm leading-snug">
      {direction && (
        <div>
          <TrendPill direction={direction} />
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-medium text-slate-800">{formatWithBadges(main)}</span>

        {period && (
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
            {period}
          </span>
        )}

        {gap && (
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold border ${
              gap.tone === "up"
                ? "bg-orange-100 text-orange-800 border-orange-200"
                : gap.tone === "down"
                ? "bg-green-100 text-green-800 border-green-200"
                : "bg-slate-100 text-slate-700 border-slate-200"
            }`}
          >
            vs fringe: {gap.text}
          </span>
        )}
      </div>
    </div>
  );
}

function TrendPill({ direction }) {
  const meta =
    {
      up: { label: "Higher pressure", bg: "bg-orange-100 text-orange-800", icon: "M5 12l5-5 5 5" },
      down: { label: "Improving", bg: "bg-green-100 text-green-800", icon: "M5 8l5 5 5-5" },
      steady: { label: "Steady", bg: "bg-slate-200 text-slate-700", icon: "M4 10h12" },
    }[direction] || null;

  if (!meta) return null;

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${meta.bg}`}>
      <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d={meta.icon} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
      {meta.label}
    </span>
  );
}

function parseValueParts(value) {
  const str = (value ?? "").toString();
  const match = str.match(/\(([^)]+)\)/);
  const period = match ? match[1] : null;
  const main = match ? str.replace(match[0], "").replace(/\s{2,}/g, " ").trim() : str;
  return { main, period };
}

function firstNumber(str) {
  const match = (str || "").replace(/,/g, "").match(/-?\d+(?:\.\d+)?/);
  return match ? parseFloat(match[0]) : null;
}

function computeGap(medwayValue, comparatorsValue) {
  const medwayStr = (medwayValue ?? "").toString();
  const comparatorStr = (comparatorsValue ?? "").toString();
  const medwayNum = firstNumber(medwayStr);
  const comparatorNum = firstNumber(comparatorStr);
  if (medwayNum === null || comparatorNum === null) return null;

  const isPercent = medwayStr.includes("%");
  const isCurrency = medwayStr.includes("£");
  const diff = medwayNum - comparatorNum;

  const formatter = isCurrency
    ? (n) =>
        new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(n)
    : (n) => (isPercent ? `${n.toFixed(1).replace(/\.0$/, "")}%` : n.toString());

  return {
    text: `${diff > 0 ? "+" : ""}${formatter(diff)}`,
    tone: diff > 0 ? "up" : diff < 0 ? "down" : "steady",
  };
}

function inferTrendDirection(value) {
  if (!value) return null;
  const str = value.toString().toLowerCase();

  // Treat arrows as “change” but default to improving only when ↓ or explicit “improving”
  if (str.includes("improving") || /↓/.test(str)) return "down";
  if (str.includes("higher pressure") || /[+↑]/.test(str)) return "up";
  if (str.includes("steady") || str.includes("~") || str.includes("≈")) return "steady";

  return null;
}

/* ------------------------------------------------------------------------- */
/* Domain grouping helpers                                                   */
/* ------------------------------------------------------------------------- */

function resolveDomainGroup(row) {
  if (row?.group === "cost") return "Cost pressures";
  if (row?.group === "workforce") return "Workforce pressures";
  if (row?.group === "supporting") return "Supporting evidence";
  return getDomainGroup(row?.domain ?? "");
}

function getDomainGroup(domain = "") {
  const d = domain.toLowerCase();
  if (!d) return "Supporting evidence";
  if (/house|rent|council|rail|ticket|transport|cost|tax/.test(d)) return "Cost pressures";
  if (/nurse|vacancy|turnover|workforce|staff/.test(d)) return "Workforce pressures";
  return "Supporting evidence";
}

function getDomainGroupLabel(group) {
  switch (group) {
    case "Cost pressures":
      return "Cost pressures (housing, rent, tax, travel)";
    case "Workforce pressures":
      return "Workforce pressures (turnover, vacancy)";
    case "Supporting evidence":
      return "Supporting evidence (catchment, policy, context)";
    default:
      return group;
  }
}
