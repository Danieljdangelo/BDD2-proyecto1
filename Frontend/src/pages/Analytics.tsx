// src/pages/Analytics.tsx
import React, { useEffect, useState } from 'react';
import BestSellingCarsChart from '../components/Charts/BestSellingCarsChart';
import MonthlySalesChart from '../components/Charts/MonthlySalesChart';
import TopBrandsChart from '../components/Charts/TopBrandsChart';
import { ChartData } from 'chart.js';

const Analytics: React.FC = () => {
  const [rawBestSelling, setRawBestSelling] = useState<any[]>([]);
  const [bestSellingData, setBestSellingData] = useState<ChartData<'bar'> | null>(null);
  const [monthlySalesData, setMonthlySalesData] = useState<ChartData<'line'> | null>(null);
  const [topBrandsData, setTopBrandsData] = useState<ChartData<'pie'> | null>(null);
  const [loading, setLoading] = useState(true);
  const [topN, setTopN] = useState<number | 'all'>('all');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [bestSellingRes] = await Promise.all([
          fetch('http://localhost:5000/analytics/best-selling'),
          // Otros endpoints se pueden agregar cuando estén listos
        ]);

        if (!bestSellingRes.ok) {
          throw new Error('Error en la respuesta del backend para best-selling');
        }

        const bestSellingFetched = await bestSellingRes.json();
        console.log('Respuesta del endpoint best-selling:', bestSellingFetched);
        setRawBestSelling(bestSellingFetched);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
        setRawBestSelling([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  // Cada vez que rawBestSelling o topN cambien, transformamos la data para el gráfico
  useEffect(() => {
    if (!rawBestSelling || rawBestSelling.length === 0) {
      setBestSellingData(null);
      return;
    }
  
    // Filtra los datos según el filtro topN
    let filteredData = rawBestSelling;
    if (topN !== 'all') {
      filteredData = rawBestSelling.slice(0, Number(topN));
    }
  
    // Mapea para extraer etiquetas y datos
    const labels = filteredData.map((item: any) => `${item._id.Brand} ${item._id.Model}`);
    const data = filteredData.map((item: any) => item.count);
  
    // Define un array de colores para cada barra
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#AA66CC', '#66AA00'];
  
    const bestSellingChartData: ChartData<'bar'> = {
      labels,
      datasets: [{
        label: 'Cantidad de carros',
        data,
        backgroundColor: labels.map((_, idx) => colors[idx % colors.length]),
      }],
    };
  
    console.log('Datos transformados para el gráfico:', bestSellingChartData);
    setBestSellingData(bestSellingChartData);
  }, [rawBestSelling, topN]);
  

  if (loading) return <p>Cargando analíticas...</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 mt-20">
      <h1 className="text-4xl font-bold mb-8">Analíticas</h1>
      
      <section className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Modelos más repetidos por marca</h3>
          <div>
            <label htmlFor="topN" className="mr-2">Mostrar:</label>
            <select
              id="topN"
              value={topN}
              onChange={(e) => {
                const value = e.target.value;
                setTopN(value === 'all' ? 'all' : Number(value));
              }}
              className="border rounded px-2 py-1"
            >
              <option value="all">Todas</option>
              <option value="3">Top 3</option>
              <option value="5">Top 5</option>
              <option value="10">Top 10</option>
            </select>
          </div>
        </div>
        {bestSellingData ? (
          <BestSellingCarsChart
            data={bestSellingData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Modelos más repetidos' },
              },
            }}
          />
        ) : (
          <p>No hay datos para mostrar.</p>
        )}
      </section>

      <section className="mb-12">
        <h3 className="text-xl font-bold mb-4">Cantidad de carros por año</h3>
        {monthlySalesData ? (
          <MonthlySalesChart
            data={monthlySalesData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Carros por año' },
              },
            }}
          />
        ) : (
          <p>No hay datos.</p>
        )}
      </section>

      <section className="mb-12">
        <h3 className="text-xl font-bold mb-4">Marca con mayor cantidad de carros</h3>
        {topBrandsData ? (
          <TopBrandsChart
            data={topBrandsData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Top marcas' },
              },
            }}
          />
        ) : (
          <p>No hay datos.</p>
        )}
      </section>
    </div>
  );
};

export default Analytics;
