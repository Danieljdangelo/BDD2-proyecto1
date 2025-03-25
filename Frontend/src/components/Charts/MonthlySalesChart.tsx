// src/components/Charts/MonthlySalesChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface MonthlySalesChartProps {
  data: ChartData<'line'>;
  options?: any;
}

const MonthlySalesChart: React.FC<MonthlySalesChartProps> = ({ data, options }) => {
  const defaultOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Cantidad de carros por año' },
    },
  };

  return <Line data={data} options={options || defaultOptions} />;
};

export default MonthlySalesChart;
