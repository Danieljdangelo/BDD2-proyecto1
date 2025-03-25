import React from 'react';
import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ChartData 
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BestSellingCarsChartProps {
  data: ChartData<'bar'>;
  options?: unknown; // Puedes tiparlo mejor si lo deseas
}

const BestSellingCarsChart: React.FC<BestSellingCarsChartProps> = ({ data, options }) => {
  const defaultOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Carros más vendidos',
      },
    },
  };

  return <Bar data={data} options={options || defaultOptions} />;
};

export default BestSellingCarsChart;
