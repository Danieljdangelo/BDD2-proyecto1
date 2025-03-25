// src/pages/Analytics.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useMemo } from 'react';
import BestSellingCarsChart from '../components/Charts/BestSellingCarsChart';
import MonthlySalesChart from '../components/Charts/MonthlySalesChart';
import TopBrandsChart from '../components/Charts/TopBrandsChart';
import MultiSelectDropdown from '../components/MultiSelectDropdown';
import { ChartData } from 'chart.js';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const Analytics: React.FC = () => {
  // Estados para el gráfico best-selling (ventas por marca y región)
  const [rawBestSelling, setRawBestSelling] = useState<any[]>([]);
  const [bestSellingData, setBestSellingData] = useState<ChartData<'bar'> | null>(null);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  // Estados para el gráfico vehicles-by-price (vehículos por rango de precio)
  const [monthlySalesData, setMonthlySalesData] = useState<ChartData<'line'> | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(50000);
  const [selectedRegionForPrice, setSelectedRegionForPrice] = useState<string>('');
  const [selectedDealership, setSelectedDealership] = useState<string>('');
  const [dealers, setDealers] = useState<string[]>([]);
  const [selectedDealers, setSelectedDealers] = useState<string[]>([]);
  const [topBrandsData, setTopBrandsData] = useState<ChartData<'pie'> | null>(null);
  const [loading, setLoading] = useState(true);

  // Interfaz para tipar la data del endpoint best-selling
  interface BestSellingItem {
    _id: {
      Company: string;
      Dealer_Region: string;
    };
    count: number;
  }

  // useMemo para obtener todas las regiones disponibles a partir de rawBestSelling
  const allRegionsForSelect = useMemo(() => {
    if (!rawBestSelling || rawBestSelling.length === 0) return [];
    const regionTotals: Record<string, number> = {};
    rawBestSelling.forEach((item: BestSellingItem) => {
      const region = item._id.Dealer_Region;
      if (region) {
        regionTotals[region] = (regionTotals[region] || 0) + item.count;
      }
    });
    return Object.keys(regionTotals).sort((a, b) => regionTotals[b] - regionTotals[a]);
  }, [rawBestSelling]);

  // UseEffect para hacer fetch del endpoint best-selling
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

  // UseEffect para transformar la data de best-selling usando el filtro de regiones
  useEffect(() => {
    if (!rawBestSelling || rawBestSelling.length === 0) {
      setBestSellingData(null);
      return;
    }
    // Si no se ha seleccionado ninguna región o se seleccionó "all", usamos todas las regiones disponibles
    let finalRegions: string[] = [];
    if (selectedRegions.length === 0 || selectedRegions.includes("all")) {
      const regionTotals: Record<string, number> = {};
      rawBestSelling.forEach((item: BestSellingItem) => {
        const region = item._id.Dealer_Region;
        if (region) {
          regionTotals[region] = (regionTotals[region] || 0) + item.count;
        }
      });
      finalRegions = Object.keys(regionTotals).sort((a, b) => regionTotals[b] - regionTotals[a]);
    } else {
      finalRegions = selectedRegions;
    }
    // Obtener todas las marcas únicas
    const companiesSet = new Set<string>();
    rawBestSelling.forEach((item: BestSellingItem) => {
      if (item._id.Company) companiesSet.add(item._id.Company);
    });
    const companies = Array.from(companiesSet);

    // Definir colores para cada marca
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#AA66CC', '#66AA00'];
    const colorForIndex = (idx: number): string => colors[idx % colors.length];

    // Construir datasets para cada marca
    const datasets = companies.map((company) => {
      const data = finalRegions.map((region) => {
        const found = rawBestSelling.find((item: BestSellingItem) =>
          item._id.Company === company && item._id.Dealer_Region === region
        );
        return found ? found.count : 0;
      });
      return {
        label: company,
        data,
        backgroundColor: colorForIndex(companies.indexOf(company)),
      };
    });

    const newChartData: ChartData<'bar'> = {
      labels: finalRegions,
      datasets,
    };

    console.log('Datos transformados para ventas por marca y región:', newChartData);
    setBestSellingData(newChartData);
  }, [rawBestSelling, selectedRegions]);

  // UseEffect para el gráfico de vehículos por rango de precio
  useEffect(() => {
    const fetchVehiclesByPrice = async () => {
      try {
        const params = new URLSearchParams({
          minPrice: priceRange[0].toString(),
          maxPrice: priceRange[1].toString(),
          region: selectedRegionForPrice.join(','), // Si usas selección múltiple, conviertele a cadena separada por comas
          dealership: selectedDealers.join(','),      // Si usas selección múltiple para dealerships
        });
        const res = await fetch(`http://localhost:5000/analytics/vehicles-by-price?${params.toString()}`);
        if (!res.ok) throw new Error('Error fetching vehicles by price');
        const data = await res.json();
        console.log('Respuesta de vehicles-by-price:', data);
        // Se espera que data tenga la forma: [{ _id: "0-10000", count: 20 }, ...]
        const labels = data.map((item: any) => item._id);
        const counts = data.map((item: any) => item.count);
        const chartData: ChartData<'line'> = {
          labels,
          datasets: [{
            label: 'Cantidad de vehículos',
            data: counts,
            borderColor: '#36A2EB',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: true,
          }],
        };
        setMonthlySalesData(chartData);
      } catch (error) {
        console.error('Error fetching vehicles by price:', error);
        setMonthlySalesData(null);
      }
    };
  
    fetchVehiclesByPrice();
  }, [priceRange, selectedRegionForPrice, selectedDealers]);
  
  useEffect(() => {
    if (selectedRegionForPrice.length === 0) {
      setDealers([]);
      setSelectedDealers([]);
      return;
    }
    // Convierte el arreglo de regiones a una cadena separada por comas
    const regionsParam = selectedRegionForPrice.join(',');
    fetch(`http://localhost:5000/cars/dealers?regions=${encodeURIComponent(regionsParam)}`)
      .then(res => res.json())
      .then(data => {
        console.log('Dealers recibidos:', data);
        setDealers(data);
        setSelectedDealers([]); // Reinicia la selección de dealers si es necesario
      })
      .catch(err => console.error('Error fetching dealers:', err));
  }, [selectedRegionForPrice]);
  

  if (loading) return <p>Cargando analíticas...</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 mt-20">
      <h1 className="text-4xl font-bold mb-8">Analíticas</h1>

      {/* Sección: Ventas por Marca y Región */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Ventas por Marca y Región</h3>
          <div className="w-64">
            <MultiSelectDropdown 
              options={allRegionsForSelect}
              selected={selectedRegions}
              onChange={setSelectedRegions}
              placeholder="Selecciona regiones"
            />
          </div>
        </div>
        {bestSellingData ? (
          <BestSellingCarsChart
            data={bestSellingData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Ventas por Marca y Región' },
              },
            }}
          />
        ) : (
          <p>No hay datos para mostrar.</p>
        )}
      </section>

      {/* Sección: Vehículos por Rango de Precio */}
      <section className="mb-12">
  <h3 className="text-xl font-bold mb-4">Vehículos por Rango de Precio</h3>
  <div className="mb-4 flex flex-col md:flex-row gap-4 items-center">
    {/* Filtro de precio con slider */}
    <div className="flex-1">
      <label className="block font-semibold mb-1">Rango de Precio:</label>
      <Slider
        range
        min={0}
        max={100000}
        value={priceRange}
        onChange={(value: [number, number]) => setPriceRange(value)}
        trackStyle={[{ backgroundColor: '#36A2EB' }]}
        handleStyle={[{ borderColor: '#36A2EB' }, { borderColor: '#36A2EB' }]}
      />
      <div className="flex justify-between text-sm mt-1">
        <span>${priceRange[0]}</span>
        <span>${priceRange[1]}</span>
      </div>
    </div>
    {/* Filtro de región */}
    <div className="w-64">
      <label className="block font-semibold mb-1">Región:</label>
      <MultiSelectDropdown
        options={allRegionsForSelect}
        selected={selectedRegionForPrice}
        onChange={setSelectedRegionForPrice}
        placeholder="Selecciona región(es)"
      />
    </div>
    {/* Filtro de dealership */}
    <div className="w-64">
      <label className="block font-semibold mb-1">Dealership:</label>
      <MultiSelectDropdown
        options={dealers}
        selected={selectedDealers}
        onChange={setSelectedDealers}
        placeholder="Selecciona dealership(s)"
      />
    </div>
  </div>
  {monthlySalesData ? (
  <MonthlySalesChart
    data={monthlySalesData}
    options={{
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Vehículos por Rango de Precio' },
      },
    }}
  />
) : (
  <p>No hay datos.</p>
)}
</section>


      {/* Sección: Top Marcas */}
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
