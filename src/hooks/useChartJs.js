// src/hooks/useChartJs.js
import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

export function useChartJs(canvasRef, buildConfig, deps = []) {
  const chartRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Build config fresh
    const config = buildConfig();

    // Destroy old chart if any
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(canvas.getContext("2d"), config);

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return chartRef;
}
