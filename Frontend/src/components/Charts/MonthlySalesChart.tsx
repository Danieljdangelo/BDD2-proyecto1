import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartData } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface MonthlySalesChartProps {
  data: ChartData<'line'>;
}

const MonthlySalesChart: React.FC<MonthlySalesChartProps> = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Ventas mensuales' },
    },
  };

  return <Line options={options} data={data} />;
};

export default MonthlySalesChart;
