// components/CostChart.jsx
import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function CostChart({
  id = "cost-chart",
  title = "Cost comparison: Medway vs fringe comparators",
  subtitle = "Illustrative values – update with latest validated figures for HPI, rent or other cost indicators.",
  yLabel = "Average house price (£)",
  periodLabel = "HPI, year to Dec 2024",
  sourceLabel = "Source: ONS UK House Price Index; local analysis.",
  labels = ["Medway", "Dartford", "Thurrock"],
  values = [321665, 379675, 314000],
}) {
  const data = useMemo(() => {
    return {
      labels,
      datasets: [
        {
          label: yLabel,
          data: values,
          backgroundColor: labels.map((label) =>
            label === "Medway"
              ? "rgba(0, 94, 184, 0.85)" // NHS blue emphasis
              : "rgba(0, 169, 206, 0.7)" // Lighter comparator bars
          ),
          hoverBackgroundColor: labels.map((label) =>
            label === "Medway"
              ? "rgba(0, 94, 184, 1)"
              : "rgba(0, 169, 206, 0.9)"
          ),
          borderWidth: 0,
          borderRadius: 6,
          borderSkipped: false,
        },
      ],
    };
  }, [labels, values, yLabel]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
          callbacks: {
            label: (context) => {
              const value = context.parsed.y;
              if (typeof value === "number") {
                return ` £${value.toLocaleString("en-GB")}`;
              }
              return value;
            },
          },
        },
        title: {
          display: false,
        },
      },
      layout: {
        padding: {
          top: 10,
          right: 10,
          bottom: 0,
          left: 0,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 12,
            },
            color: "#4b5563", // slate-700
          },
        },
        y: {
          grid: {
            color: "rgba(148, 163, 184, 0.25)", // light grid
            drawBorder: false,
          },
          ticks: {
            font: {
              size: 11,
            },
            color: "#4b5563",
            callback: (value) => {
              if (typeof value === "number") {
                return `£${value.toLocaleString("en-GB")}`;
              }
              return value;
            },
          },
          title: {
            display: true,
            text: yLabel,
            font: {
              size: 12,
              weight: "bold",
            },
            color: "#111827", // slate-900
          },
        },
      },
    }),
    [yLabel]
  );

  const titleId = `${id}__title`;

  return (
    <figure aria-labelledby={titleId}>
      <div className="flex flex-col gap-1 mb-3">
        <p
          id={titleId}
          className="text-base font-semibold"
          style={{ color: "var(--nhs-ink)" }}
        >
          {title}
        </p>
        {subtitle && (
          <p className="text-sm text-slate-600">
            {subtitle}
          </p>
        )}
      </div>

      <div className="h-64 md:h-72">
        <Bar data={data} options={options} />
      </div>

      <figcaption className="mt-2 text-xs text-slate-500">
        {periodLabel}
        {sourceLabel && <> · {sourceLabel}</>}
      </figcaption>
    </figure>
  );
}
