// src/components/GeneralLivingCard.jsx
import React, { useMemo, useRef } from "react";
import { CostMetricHeader } from "./CostMetricHeader";
import { useChartJs } from "../hooks/useChartJs";
import { getCssVar, fmtGBP, niceBoundsGBP, makeEndLabelPlugin } from "../lib/chartHelpers";

export default function GeneralLivingCard({ dataAosDelay = "400" }) {
  const canvasRef = useRef(null);

  const bandD = useMemo(() => {
    const nhsBlue = getCssVar("--nhs-blue", "#005EB8");
    return [
      { name: "Gravesham", value: 2103.76, colour: "#78BE20" },
      { name: "Dartford", value: 2077.98, colour: "#41B6E6" },
      { name: "Medway", value: 2008.56, colour: nhsBlue },
      { name: "Thurrock", value: 1898.91, colour: "#0072CE" },
    ].sort((a, b) => b.value - a.value);
  }, []);

  useChartJs(
    canvasRef,
    () => {
      const values = bandD.map((d) => d.value);
      const { min, max } = niceBoundsGBP(values, { pad: 60, step: 10 });

      const endLabelPlugin = makeEndLabelPlugin({
        id: "councilTaxEndLabels",
        formatter: (v) => fmtGBP(v),
      });

      return {
        type: "bar",
        data: {
          labels: bandD.map((d) => d.name),
          datasets: [
            {
              label: "Band D (2023/24)",
              data: values,
              backgroundColor: bandD.map((d) => d.colour),
              borderRadius: 999,
              barThickness: 10,
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
              min,
              max,
              grid: { color: "rgba(0,0,0,0.06)" },
              ticks: {
                callback: (v) => fmtGBP(v),
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
                label: (ctx) => `${ctx.label}: ${fmtGBP(ctx.parsed.x)}`,
              },
            },
          },
          animation: { duration: 450 },
        },
        plugins: [endLabelPlugin],
      };
    },
    [bandD]
  );

  return (
    <article
      data-aos="fade-up"
      data-aos-delay={dataAosDelay}
      className="rounded-2xl border border-white/60 bg-white/70 p-6 shadow-sm backdrop-blur flex flex-col h-full"
    >
      <CostMetricHeader
        icon="🪙"
        label="Band D council tax (2023/24)"
        value="£2,009"
        detail="In line with fringe comparators (Dartford £2,078; Gravesham £2,104)"
      />

      <div className="flex flex-wrap gap-2 mb-2 text-xs font-semibold text-blue-800">
        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 border border-blue-100">
          Comparator set: Dartford / Gravesham / Thurrock
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 border border-slate-200 text-slate-700">
          Medway vs fringe avg: -£17
        </span>
      </div>

      <h3 className="sr-only">General Living Expenses</h3>

      <p className="text-base text-gray-700">
        Day-to-day expenses such as groceries and utilities in Medway are broadly in line with national averages, but <strong>council tax</strong> adds
        a fixed cost pressure comparable to nearby fringe authorities.
      </p>
      <p className="text-base text-gray-700 mt-4">
        The chart compares <strong>Band&nbsp;D Council Tax (2023/24)</strong> across Medway and three neighbouring authorities. Band&nbsp;D is a common
        benchmark for a mid-range home.
      </p>

      <div className="mt-6 relative h-[300px]">
        <canvas
          ref={canvasRef}
          className="h-full w-full"
          role="img"
          aria-label="Council Tax Band D comparison across Medway, Dartford, Gravesham and Thurrock (£)"
        />
      </div>

      <p className="text-sm text-gray-500 mt-4">Period: 2023/24 Band&nbsp;D schedules. Source: local authority publications / local.gov.uk.</p>
    </article>
  );
}
