// src/lib/chartHelpers.js
// Chart.js responsiveness reference:
// https://www.chartjs.org/docs/latest/configuration/responsive.html

export function getCssVar(name, fallback = "") {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name);
    return (v && v.trim()) || fallback;
  }
  
  export function fmtPercent(n, dp = 1) {
    const s = Number(n).toFixed(dp).replace(/\.0$/, "");
    return `${s}%`;
  }
  
  export function fmtGBP(n) {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits: 0,
    }).format(Number(n));
  }
  
  // Nice axis max for percent charts (rounded to 0.5% steps by default)
  export function niceMaxPercent(values, { headroom = 1.2, step = 0.5, min = 5 } = {}) {
    const maxVal = Math.max(...values.map(Number));
    const raw = Math.max(min, maxVal * headroom);
    return Math.ceil(raw / step) * step;
  }
  
  // Nice axis bounds for GBP charts (rounded to nearest £250 by default)
  export function niceBoundsGBP(values, { pad = 250, step = 250 } = {}) {
    const nums = values.map(Number);
    const vMin = Math.min(...nums);
    const vMax = Math.max(...nums);
  
    const min = Math.floor((vMin - pad) / step) * step;
    const max = Math.ceil((vMax + pad) / step) * step;
  
    return { min, max };
  }
  
  // End-of-bar label plugin factory (shared across cards)
  export function makeEndLabelPlugin({
    id = "endLabelPlugin",
    formatter = (v) => String(v),
    font = "12px system-ui, -apple-system, Segoe UI, Roboto, Arial",
    colour = "#1f2937", // slate-800
    padding = 8,
  } = {}) {
    return {
      id,
      afterDatasetsDraw(chart) {
        const { ctx, chartArea } = chart;
        if (!chartArea) return;
  
        const rightEdge = chartArea.right;
        const leftEdge = chartArea.left;
  
        chart.data.datasets.forEach((ds, di) => {
          const meta = chart.getDatasetMeta(di);
          meta.data.forEach((bar, i) => {
            const raw = ds.data[i];
            const label = formatter(raw);
  
            // tooltipPosition() works nicely for bars across orientations
            const { x, y } = bar.tooltipPosition();
  
            ctx.save();
            ctx.fillStyle = colour;
            ctx.font = font;
            ctx.textBaseline = "middle";
            ctx.textAlign = "left";
  
            const w = ctx.measureText(label).width;
  
            // Clamp label within chart area so it never “creates” awkward overflow
            const desiredX = x + padding;
            const clampedX = Math.min(desiredX, rightEdge - w - 2);
            const safeX = Math.max(clampedX, leftEdge + 2);
  
            ctx.fillText(label, safeX, y);
            ctx.restore();
          });
        });
      },
    };
  }
  