import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';

export default function GeneralLivingCard({ dataAosDelay = '400' }) {
  const councilTaxChartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (councilTaxChartRef.current) {
      // Destroy any existing chart instance before creating a new one
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = councilTaxChartRef.current.getContext('2d');

      // Council Tax Band D (2023/24) for each region
      // (based on the data you provided):
      const bandDData = {
        Medway: 2008.56, // +5.24%
        Thurrock: 1898.91, // +9.44%
        Dartford: 2077.98, // +4.68%
        Gravesham: 2103.76, // +5.02%
      };

      chartInstanceRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(bandDData),
          datasets: [
            {
              label: 'Council Tax Band D (£)',
              data: Object.values(bandDData),
              backgroundColor: ['#005EB8', '#0072CE', '#41B6E6', '#78BE20'],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: false,
              ticks: {
                callback: (value) => '£' + value.toLocaleString(),
              },
              title: {
                display: true,
                text: 'Annual Council Tax (2023/24)',
              },
            },
          },
          plugins: {
            legend: { display: false },
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
      <h3 className="text-xl font-semibold mb-2">💡 General Living Expenses</h3>
      <p className="text-base text-gray-700">
        Day-to-day expenses such as groceries and utilities in Medway largely align with the
        national average, as do many fringe areas outside London. However, council tax rates
        in Medway can be relatively high, which tightens budgets further for many households.
      </p>
      <p className="text-base text-gray-700 mt-4">
        The chart below compares the <strong>Band D Council Tax</strong> for Medway and three fringe
        local authorities (Thurrock, Dartford, and Gravesham). While band classifications vary by
        property, Band D typically represents a middle-range home.
      </p>

      <div className="mt-6" style={{ height: '300px' }}>
        <canvas ref={councilTaxChartRef} />
      </div>

      <p className="text-sm text-gray-500 mt-4">
        <em>Note:</em> Council Tax figures reflect 2023/24 rates and percentage increases.{' '}
        Source data aggregated from local.gov.uk or direct local council websites.
      </p>
    </div>
  );
}
