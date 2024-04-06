import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ chartData }) => {
  const chartRef = useRef(null); 
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: 'bar',
      data: chartData,
      options: {
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData]); 

  return <canvas ref={chartRef} />;
};

export default BarChart;
