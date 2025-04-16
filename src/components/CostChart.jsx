// components/CostChart.jsx
import React, { useRef, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CostChart = () => {
  const chartRef = useRef(null);

  const data = {
    labels: ['Medway', 'Dartford', 'Thurrock'],
    datasets: [
      {
        label: 'Average House Price (£)',
        data: [321665, 379675, 314000],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)'
        ]
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true
      }
    }
  };

  useEffect(() => {
    // Cleanup function: Destroy the chart instance on unmount if it exists
    return () => {
      if (chartRef.current) {
        if (chartRef.current.destroy) {
          chartRef.current.destroy();
        }
      }
    };
  }, []);

  return (
    <Bar
      ref={chartRef}
      data={data}
      options={options}
      key={JSON.stringify(data)} // Force remount if data changes
    />
  );
};

export default CostChart;
