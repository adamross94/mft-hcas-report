// src/charts/config.js
export const NHS_COLORS = {
    medway: getComputedStyle(document.documentElement).getPropertyValue('--nhs-blue')?.trim() || '#005EB8',
    comp1: '#0072CE',
    comp2: '#41B6E6',
    comp3: '#78BE20',
    grey:  '#6f777b',
  };
  
  export const fmtGBP = (n) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(n);
  
  export const fmtPct = (n) =>
    `${Number(n).toFixed(1).replace(/\.0$/, '')}%`;
  
  /** Minimal plugin to draw end-of-bar value labels (no extra deps) */
  export const endLabelPlugin = {
    id: 'endLabelPlugin',
    afterDatasetsDraw(chart) {
      const { ctx } = chart;
      chart.data.datasets.forEach((ds, di) => {
        const meta = chart.getDatasetMeta(di);
        meta.data.forEach((bar, i) => {
          const raw = ds.data[i];
          const isPct = /%/.test(ds.label) || ds.unit === 'pct';
          const label = isPct ? fmtPct(raw) : ds.unit === 'gbp' ? fmtGBP(raw) : raw;
          const { x, y } = bar.tooltipPosition();
          ctx.save();
          ctx.fillStyle = '#1f2937'; // dark grey
          ctx.font = '12px system-ui, -apple-system, Segoe UI, Roboto, Arial';
          ctx.textBaseline = 'middle';
          const alignLeft = chart.options.indexAxis === 'y';
          ctx.textAlign = alignLeft ? 'left' : 'center';
          const dx = alignLeft ? 8 : 0;
          const dy = alignLeft ? 0 : -12;
          ctx.fillText(String(label), x + dx, y + dy);
          ctx.restore();
        });
      });
    }
  };
  
  /** Standard options generator */
  export function baseOptions({ isPercent = false, title = '', indexAxis = 'y', minZero = true }) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis,
      layout: { padding: 8 },
      scales: {
        x: indexAxis === 'y'
          ? { // value axis
              beginAtZero: minZero,
              grid: { color: 'rgba(0,0,0,0.06)' },
              ticks: {
                callback: (v) => (isPercent ? fmtPct(v) : fmtGBP(v)),
              },
            }
          : undefined,
        y: indexAxis === 'y'
          ? { // category axis
              ticks: { color: '#111827' },
              grid: { display: false },
            }
          : undefined,
      },
      plugins: {
        legend: { display: false },
        title: title
          ? { display: true, text: title, align: 'start', color: '#111827', font: { size: 14, weight: 'bold' } }
          : { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const val = ctx.parsed[ctx.chart.options.indexAxis === 'y' ? 'x' : 'y'];
              return isPercent ? fmtPct(val) : fmtGBP(val);
            },
          },
        },
      },
      elements: {
        bar: {
          borderRadius: 6,
          borderWidth: 0,
        },
      },
    };
  }
  