import React, { useEffect, useState } from 'react';
import BestSellingCarsChart from '../components/Charts/BestSellingCarsChart';
import MonthlySalesChart from '../components/Charts/MonthlySalesChart';
import TopBrandsChart from '../components/Charts/TopBrandsChart';
import { ChartData } from 'chart.js';

const Analytics: React.FC = () => {
  const [bestSellingData, setBestSellingData] = useState<ChartData<'bar'> | null>(null);
  const [monthlySalesData, setMonthlySalesData] = useState<ChartData<'line'> | null>(null);
  const [topBrandsData, setTopBrandsData] = useState<ChartData<'pie'> | null>(null);

  useEffect(() => {
    // Datos simulados
    const bestSelling: ChartData<'bar'> = {
      labels: ['Corolla', 'Civic', 'Mustang', '3 Series', 'A4'],
      datasets: [{
        label: 'Ventas',
        data: [50, 30, 20, 10, 40],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      }],
    };

    const monthlySales: ChartData<'line'> = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      datasets: [{
        label: 'Ventas',
        data: [20, 25, 30, 35, 40, 50, 45, 55, 60, 65, 70, 75],
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      }],
    };

    const topBrands: ChartData<'pie'> = {
      labels: ['Toyota', 'Honda', 'Ford', 'BMW', 'Audi'],
      datasets: [{
        label: 'Porcentaje',
        data: [30, 25, 20, 15, 10],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      }],
    };

    setBestSellingData(bestSelling);
    setMonthlySalesData(monthlySales);
    setTopBrandsData(topBrands);
  }, []);

  return (
    <div className="mt-20 p-4">
      <h1 className="text-4xl font-bold mb-8">Analíticas</h1>
      
      <section className="mb-12">
        {bestSellingData ? <BestSellingCarsChart data={bestSellingData} /> : <p>Cargando gráfico...</p>}
      </section>
      <section className="mb-12">
        {monthlySalesData ? <MonthlySalesChart data={monthlySalesData} /> : <p>Cargando gráfico...</p>}
      </section>
      <section className="mb-12">
        {topBrandsData ? <TopBrandsChart data={topBrandsData} /> : <p>Cargando gráfico...</p>}
      </section>
    </div>
  );
};

export default Analytics;
