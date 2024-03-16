import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Import Chart from Chart.js

const BarChart = ({ chartData }) => {
  const chartRef = useRef(null); // Define chartRef

  const chartInstance = useRef(null);

  useEffect(() => {
    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart instance
    chartInstance.current = new Chart(chartRef.current, {
      type: 'bar',
      data: chartData,
      options: {
        // Add chart options here if needed
      },
    });

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData]); // Re-run effect when chartData changes

  return <canvas ref={chartRef} />;
};

export default BarChart;
