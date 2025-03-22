import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, ChartData } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface TopBrandsChartProps {
  data: ChartData<'pie'>;
}

const TopBrandsChart: React.FC<TopBrandsChartProps> = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Marcas más vendidas' },
    },
  };

  return <Pie options={options} data={data} />;
};

export default TopBrandsChart;
