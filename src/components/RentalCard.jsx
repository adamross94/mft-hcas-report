// src/components/RentalCard.jsx
import React, { useMemo, useRef } from "react";
import { CostMetricHeader } from "./CostMetricHeader";
import { useChartJs } from "../hooks/useChartJs";
import { getCssVar, fmtPercent, niceMaxPercent, makeEndLabelPlugin } from "../lib/chartHelpers";

export default function RentalCard({ dataAosDelay = "200" }) {
  const canvasRef = useRef(null);

  const rows = useMemo(() => {
    const nhsBlue = getCssVar("--nhs-blue", "#005EB8");
    return [
      { name: "Medway", value: 13.1, colour: nhsBlue },
      { name: "Dartford", value: 11.2, colour: "#41B6E6" },
      { name: "Gravesham", value: 9.1, colour: "#78BE20" },
      { name: "Thurrock", value: 7.8, colour: "#0072CE" },
    ];
  }, []);

  useChartJs(
    canvasRef,
    () => {
      const values = rows.map((r) => r.value);
      const xMax = niceMaxPercent(values, { headroom: 1.15, step: 0.5, min: 10 });

      const endLabelPlugin = makeEndLabelPlugin({
        id: "rentalEndLabels",
        formatter: (v) => fmtPercent(v, 1),
      });

      return {
        type: "bar",
        data: {
          labels: rows.map((r) => r.name),
          datasets: [
            {
              label: "YoY Rent Increase (%)",
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
      <CostMetricHeader icon="📈" label="MEDIAN private rent (Jan 2025)" value="£1,165" detail="+13.1% YoY — in fringe-level uplift range" />

      <div className="flex flex-wrap gap-2 mb-3 text-xs font-semibold">
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200 px-2.5 py-0.5">
          Gap vs fringe avg: +3.7pp
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-0.5">
          Fringe comparators
        </span>
      </div>

      <h3 className="sr-only">Rental Costs</h3>

      <p className="text-base text-gray-700">
        <strong>Medway&apos;s average monthly private rent rose to £1,165 in January 2025</strong> (up 13.1%), above Dartford (11.2%),
        Gravesham (9.1%), and Thurrock (7.8%).
      </p>
      <p className="text-base text-gray-700 mt-3">
        Faster rent growth puts Medway in fringe-level territory and erodes take-home pay without a 5% HCAS.
      </p>

      <div className="mt-6 relative h-[300px]">
        <canvas ref={canvasRef} className="h-full w-full" role="img" aria-label="Year-on-year rent increase by area (%)" />
      </div>

      <details className="mt-4">
        <summary className="cursor-pointer text-sm text-gray-700 font-semibold">Medway rent levels (illustrative)</summary>
        <ul className="list-disc list-inside text-gray-700 text-sm mt-2">
          <li>
            <strong>Flats / Maisonettes:</strong> ~£959 / month
          </li>
          <li>
            <strong>Terraced:</strong> ~£1,179 / month
          </li>
          <li>
            <strong>Semi-Detached:</strong> ~£1,305 / month
          </li>
          <li>
            <strong>Detached:</strong> ~£1,578 / month
          </li>
        </ul>
      </details>

      <p className="text-sm text-gray-500 mt-4">
        Period: Jan-2025 vs Jan-2024. Sources:{" "}
        <a className="text-blue-600 hover:underline" href="https://www.ons.gov.uk" target="_blank" rel="noreferrer">
          ONS Private Rental Market
        </a>{" "}
        ·{" "}
        <a className="text-blue-600 hover:underline" href="https://www.kent.gov.uk" target="_blank" rel="noreferrer">
          kent.gov.uk
        </a>{" "}
        ·{" "}
        <a className="text-blue-600 hover:underline" href="https://polimapper.co.uk" target="_blank" rel="noreferrer">
          polimapper.co.uk
        </a>
      </p>
    </article>
  );
}
