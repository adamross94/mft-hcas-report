import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';

/**
 * HousingCard.jsx
 *
 * A React component displaying:
 *   - Year-on-year house price growth for Medway & neighboring areas
 *   - A Chart.js bar chart showing % increases
 *   - Source references
 *
 * We store the chart instance in a ref and destroy it in cleanup
 * to avoid the \"Canvas is already in use\" error.
 *
 * Usage Example:
 *   import HousingCard from './HousingCard';
 *   <HousingCard dataAosDelay=\"100\" />
 */

export default function HousingCard({ dataAosDelay = '100' }) {
  const housingChartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (housingChartRef.current) {
      // Destroy any existing chart instance before creating a new one
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = housingChartRef.current.getContext('2d');
      // Year-on-year % changes (Dec 2023 -> Dec 2024) for each region:
      const yoyChanges = {
        Medway: 2.5,     // from 289k to 297k
        Thurrock: 2.6,   // from 318k to 327k
        Dartford: 3.0,   // from 352k to 362k
        Gravesham: 4.4,  // from 340k to 355k
      };

      chartInstanceRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(yoyChanges),
          datasets: [
            {
              label: 'Year-on-Year Price Increase (%)',
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
              // Show exact % plus text
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
      <h3 className="text-xl font-semibold mb-2">🏠 Housing</h3>
      <p className="text-base text-gray-700">
        In the year to December 2024, <strong>Medway's average house price rose by 2.5%</strong>, which is comparable to or only slightly below neighboring “fringe” areas Thurrock (2.6%), Dartford (3.0%), and Gravesham (4.4%).
      </p>

      <p className="text-base text-gray-700 mt-4">
        Though Medway's overall house price is somewhat lower in absolute terms, the <strong>similarity in growth trends</strong> supports its alignment with fringe areas currently receiving the NHS High Cost Area Supplement (HCAS).
      </p>

      <p className="text-base text-gray-700 mt-4">
        By property type, Medway's year-on-year increases ranged from +1.9% for detached homes to +2.7% for terraced houses and flats. These figures echo the growth seen in Dartford (+3.6% for flats), Thurrock (+3.0% for terraced), and Gravesham (+5.3% for terraced).
      </p>

      <div className="mt-6" style={{ height: '300px' }}>
        <canvas ref={housingChartRef}></canvas>
      </div>

      <p className="text-sm text-gray-500 mt-4">
        Sources:{' '}
        <a
          className="text-blue-600 hover:underline"
          href="https://www.kent.gov.uk"
          target="_blank"
          rel="noopener noreferrer"
        >
          kent.gov.uk
        </a>
        ,{' '}
        <a
          className="text-blue-600 hover:underline"
          href="https://cy.ons.gov.uk"
          target="_blank"
          rel="noopener noreferrer"
        >
          cy.ons.gov.uk
        </a>
      </p>
    </div>
  );
}
