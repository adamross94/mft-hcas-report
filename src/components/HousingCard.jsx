// src/components/HousingCard.jsx
import React, { useMemo, useRef } from "react";
import { CostMetricHeader } from "./CostMetricHeader";
import { useChartJs } from "../hooks/useChartJs";
import { getCssVar, fmtPercent, niceMaxPercent, makeEndLabelPlugin } from "../lib/chartHelpers";

export default function HousingCard({ dataAosDelay = "100" }) {
  const canvasRef = useRef(null);

  const rows = useMemo(() => {
    const nhsBlue = getCssVar("--nhs-blue", "#005EB8");
    return [
      { name: "Medway", value: 2.5, colour: nhsBlue },
      { name: "Thurrock", value: 2.6, colour: "#0072CE" },
      { name: "Dartford", value: 3.0, colour: "#41B6E6" },
      { name: "Gravesham", value: 4.4, colour: "#78BE20" },
    ];
  }, []);

  useChartJs(
    canvasRef,
    () => {
      const values = rows.map((r) => r.value);
      const xMax = niceMaxPercent(values, { headroom: 1.35, step: 0.5, min: 5 });

      const endLabelPlugin = makeEndLabelPlugin({
        id: "housingEndLabels",
        formatter: (v) => fmtPercent(v, 1),
      });

      return {
        type: "bar",
        data: {
          labels: rows.map((r) => r.name),
          datasets: [
            {
              label: "YoY Growth (%)",
              data: values,
              backgroundColor: rows.map((r) => r.colour),
              borderRadius: 8,
              barThickness: 18,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: "y",
          layout: { padding: 8 },
          scales: {
            x: {
              beginAtZero: true,
              max: xMax,
              grid: { color: "rgba(0,0,0,0.06)" },
              ticks: {
                callback: (v) => `${Number(v)}%`,
                color: "#111827",
              },
            },
            y: {
              grid: { display: false },
              ticks: { color: "#111827" },
            },
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => `${ctx.label}: ${fmtPercent(ctx.parsed.x, 1)}`,
              },
            },
          },
          animation: { duration: 450 },
        },
        plugins: [endLabelPlugin],
      };
    },
    [rows]
  );

  return (
    <article
      data-aos="fade-up"
      data-aos-delay={dataAosDelay}
      className="rounded-2xl border border-white/60 bg-white/70 p-6 shadow-sm backdrop-blur flex flex-col h-full"
    >
      <CostMetricHeader
        icon="🏠"
        label="HOUSING YoY growth (to Dec 2024)"
        value="+2.5%"
        detail="Close to Thurrock (+2.6%); tracks Dartford/Gravesham trend"
      />

      <div className="flex flex-wrap gap-2 mb-3 text-xs font-semibold">
        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 text-green-800 border border-green-200 px-2.5 py-0.5">
          Gap vs fringe avg: -0.8pp
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-0.5">
          Fringe comparators
        </span>
      </div>

      <h3 className="sr-only">Housing</h3>

      <p className="text-base text-gray-700">
        <strong>Medway&apos;s average house price rose by 2.5% to Dec 2024</strong>, closely tracking
        fringe comparators (Thurrock 2.6%, Dartford 3.0%, Gravesham 4.4%).
      </p>
      <p className="text-base text-gray-700 mt-3">
        Staff face the same housing inflation trend even though Medway is not paid as a fringe trust.
      </p>

      <div className="mt-6 relative h-[300px]">
        <canvas ref={canvasRef} className="h-full w-full" role="img" aria-label="Year-on-year house price growth by area (%)" />
      </div>

      <p className="text-sm text-gray-500 mt-4">
        Period: HPI to Dec-2024. Sources:{" "}
        <a className="text-blue-600 hover:underline" href="https://www.kent.gov.uk" target="_blank" rel="noreferrer">
          kent.gov.uk
        </a>{" "}
        ·{" "}
        <a
          className="text-blue-600 hover:underline"
          href="https://www.gov.uk/government/collections/uk-house-price-index-reports"
          target="_blank"
          rel="noreferrer"
        >
          UK HPI (ONS/Land Registry)
        </a>
      </p>
    </article>
  );
}
