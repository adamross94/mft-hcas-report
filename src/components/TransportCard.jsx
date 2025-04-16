import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';

export default function TransportCard({ dataAosDelay = '300' }) {
  const transportChartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (transportChartRef.current) {
      // Destroy any existing chart instance before creating a new one
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = transportChartRef.current.getContext('2d');
      // Annual season ticket costs (2025) by region
      const annualFares = {
        Gillingham: 6784, // cost per day: ~£26.11
        'East Tilbury': 3724, // cost per day: ~£14.33
        Dartford: 6124, // cost per day: ~£23.57
        Gravesend: 6124, // cost per day: ~£23.57
      };

      chartInstanceRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(annualFares),
          datasets: [
            {
              label: 'Annual Season Ticket (£)',
              data: Object.values(annualFares),
              backgroundColor: ['#005EB8', '#0072CE', '#41B6E6', '#78BE20'],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => '£' + value.toLocaleString(),
              },
              title: {
                display: true,
                text: 'Annual Season Cost (£)',
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (context) => '£' + context.parsed.y.toLocaleString(),
              },
            },
          },
        },
      });
    }

    // Cleanup function: destroy the chart on unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={dataAosDelay}
      className="bg-gray-50 rounded-lg p-6 shadow-md"
    >
      <h3 className="text-xl font-semibold mb-2">🚆 Transport Expenses</h3>
      <p className="text-base text-gray-700">
        As of 2025, a standard annual season ticket from Gillingham (Kent) to London Terminals costs around <strong>£6,784</strong> (about £26.11/day),
        significantly higher than East Tilbury’s £3,724 (~£14.33/day). Dartford and Gravesend fares both cost £6,124 (~£23.57/day).
      </p>
      <p className="text-base text-gray-700 mt-4">
        <strong>Monthly passes</strong> are also available:
      </p>
      <ul className="list-disc list-inside text-gray-700">
        <li><strong>Gillingham:</strong> £651.30 (~£30.08/day)</li>
        <li><strong>East Tilbury:</strong> £357.60 (~£16.52/day)</li>
        <li><strong>Dartford:</strong> £588 (~£27.16/day)</li>
        <li><strong>Gravesend:</strong> £588 (~£27.16/day)</li>
      </ul>

      <p className="text-base text-gray-700 mt-4">
        These commuting costs often rival or exceed those for other fringe locales closer to London. Notably, Southeastern High Speed routes (valid
        for Gillingham and Gravesend) raise ticket prices further, underscoring the extra burden on Medway-based staff compared to certain Essex or
        Kent locations already considered fringe.
      </p>

      <div className="mt-6" style={{ height: '300px' }}>
        <canvas ref={transportChartRef}></canvas>
      </div>

      <p className="text-sm text-gray-500 mt-4">
        Sources:{' '}
        <a
          className="text-blue-600 hover:underline"
          href="https://kentonline.co.uk"
          target="_blank"
          rel="noopener noreferrer"
        >
          kentonline.co.uk
        </a>,{' '}
        Southeastern Fare Data
      </p>
    </div>
  );
}
