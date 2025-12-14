// src/components/TransportCard.jsx
import React, { useMemo, useRef } from "react";
import { CostMetricHeader } from "./CostMetricHeader";
import { useChartJs } from "../hooks/useChartJs";
import { getCssVar, fmtGBP, niceBoundsGBP, makeEndLabelPlugin } from "../lib/chartHelpers";

export default function TransportCard({ dataAosDelay = "300" }) {
  const canvasRef = useRef(null);

  const routes = useMemo(() => {
    const nhsBlue = getCssVar("--nhs-blue", "#005EB8");
    return [
      { name: "Gillingham (SE)", value: 6784, colour: nhsBlue },
      { name: "Dartford (SE)", value: 6124, colour: "#41B6E6" },
      { name: "Gravesend (SE/HS1)", value: 6124, colour: "#78BE20" },
      { name: "East Tilbury (c2c)", value: 3724, colour: "#0072CE" },
    ];
  }, []);

  useChartJs(
    canvasRef,
    () => {
      const values = routes.map((r) => r.value);
      const { min, max } = niceBoundsGBP(values, { pad: 300, step: 250 });

      const endLabelPlugin = makeEndLabelPlugin({
        id: "transportEndLabels",
        formatter: (v) => fmtGBP(v),
      });

      return {
        type: "bar",
        data: {
          labels: routes.map((r) => r.name),
          datasets: [
            {
              label: "Annual Season Cost (£)",
              data: values,
              backgroundColor: routes.map((r) => r.colour),
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
    [routes]
  );

  return (
    <article
      data-aos="fade-up"
      data-aos-delay={dataAosDelay}
      className="rounded-2xl border border-white/60 bg-white/70 p-6 shadow-sm backdrop-blur flex flex-col h-full"
    >
      <CostMetricHeader icon="🚆" label="SEASON ticket (SE→London, 2025)" value="£6,784" detail="Gillingham to London Terminals — above Dartford/Gravesend, c2c" />

      <div className="flex flex-wrap gap-2 mb-3 text-xs font-semibold">
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200 px-2.5 py-0.5">
          Gap vs fringe avg: +£1.46k
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-0.5">
          Fringe comparators
        </span>
      </div>

      <h3 className="sr-only">Transport Expenses</h3>

      <p className="text-base text-gray-700">
        <strong>Annual season ticket from Gillingham (SE) to London Terminals is £6,784</strong>, above Dartford/Gravesend (~£6,124) and East
        Tilbury (c2c ~£3,724).
      </p>
      <p className="text-base text-gray-700 mt-3">
        High commuting costs cut take-home competitiveness for Medway staff versus some fringe and Essex routes.
      </p>

      <div className="mt-6 relative h-[300px]">
        <canvas ref={canvasRef} className="h-full w-full" role="img" aria-label="Annual rail season ticket cost comparison (£)" />
      </div>

      <p className="text-sm text-gray-500 mt-4">Period/prices: 2025 standard annual seasons. Sources: Southeastern · c2c · Kent Online.</p>
    </article>
  );
}
