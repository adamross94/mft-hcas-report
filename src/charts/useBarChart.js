// src/charts/useBarChart.js
import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

export function useBarChart(canvasRef, config) {
  const instanceRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (instanceRef.current) instanceRef.current.destroy();

    instanceRef.current = new Chart(canvasRef.current.getContext('2d'), config);

    // Optional: handle container resizes
    const ro = new ResizeObserver(() => instanceRef.current?.resize());
    ro.observe(canvasRef.current);
    return () => {
      ro.disconnect();
      instanceRef.current?.destroy();
    };
  }, [canvasRef, JSON.stringify(config)]); // config stable via generator

  return instanceRef;
}