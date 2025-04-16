import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';

export default function RentalCard({ dataAosDelay = '200' }) {
  const rentalChartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (rentalChartRef.current) {
      // Destroy any existing chart instance before creating a new one
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = rentalChartRef.current.getContext('2d');
      // Year-on-year % changes (Jan 2024 -> Jan 2025) for each region:
      const yoyChanges = {
        Medway: 13.1, // from £1030 to £1165
        Thurrock: 7.8, // from £1162 to £1253
        Dartford: 11.2, // from £1334 to £1483
        Gravesham: 9.1, // from £1119 to £1221
      };

      chartInstanceRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(yoyChanges),
          datasets: [
            {
              label: 'Year-on-Year Rent Increase (%)',
              data: Object.values(yoyChanges),
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
                // Add a '%' sign to the axis labels
                callback: (value) => value + '%',
              },
              title: {
                display: true,
                text: 'YoY Growth (%)',
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (context) => `${context.parsed.y}%`,
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
      <h3 className="text-xl font-semibold mb-2">📈 Rental Costs</h3>
      <p className="text-base text-gray-700">
        The average monthly private rent in Medway rose to <strong>£1,165</strong> in January 2025,
        up 13.1% from January 2024 (£1,030). This significant jump underscores rising cost-of-living
        pressures. Meanwhile, Thurrock saw a 7.8% rise, Dartford an 11.2% increase, and Gravesham a 9.1% hike.
      </p>

      <p className="text-base text-gray-700 mt-4">
        In Medway, most property types saw over a 12% rise in monthly rent:
      </p>
      <ul className="list-disc list-inside text-gray-700">
        <li>
          <strong>Flats / Maisonettes:</strong> ~£959/month
        </li>
        <li>
          <strong>Terraced Properties:</strong> ~£1,179/month
        </li>
        <li>
          <strong>Semi-Detached:</strong> ~£1,305/month
        </li>
        <li>
          <strong>Detached:</strong> ~£1,578/month
        </li>
      </ul>

      <p className="text-base text-gray-700 mt-4">
        By bedroom count, Medway rents range from ~£841 for a 1-bed to ~£1,740 for a 4-bed.
        The comparable growth across Thurrock, Dartford, and Gravesham indicates broad rental
        market pressure around Greater London’s fringe.
      </p>

      <div className="mt-6" style={{ height: '300px' }}>
        <canvas ref={rentalChartRef}></canvas>
      </div>

      <p className="text-sm text-gray-500 mt-4">
        Sources:{' '}
        <a
          className="text-blue-600 hover:underline"
          href="https://polimapper.co.uk"
          target="_blank"
          rel="noopener noreferrer"
        >
          polimapper.co.uk
        </a>
        ,{' '}
        <a
          className="text-blue-600 hover:underline"
          href="https://cy.ons.gov.uk"
          target="_blank"
          rel="noopener noreferrer"
        >
          cy.ons.gov.uk
        </a>,{' '}
        <a
          className="text-blue-600 hover:underline"
          href="https://www.kent.gov.uk"
          target="_blank"
          rel="noopener noreferrer"
        >
          kent.gov.uk
        </a>
      </p>
    </div>
  );
}
