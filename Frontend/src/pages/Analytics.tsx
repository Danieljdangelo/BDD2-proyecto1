// src/pages/Analytics.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useMemo } from 'react';
import BestSellingCarsChart from '../components/Charts/BestSellingCarsChart';
import TopBrandsChart from '../components/Charts/TopBrandsChart';
import MultiSelectDropdown from '../components/MultiSelectDropdown';
import QueryDisplay from '../components/QueryDisplay';
import { ChartData } from 'chart.js';

const Analytics: React.FC = () => {
  const [rawBestSelling, setRawBestSelling] = useState<any[]>([]);
  const [bestSellingData, setBestSellingData] = useState<ChartData<'bar'> | null>(null);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedRegionsForBrand, setSelectedRegionsForBrand] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>(''); 
  const [brandsTotalSumData, setBrandsTotalSumData] = useState<ChartData<'pie'> | null>(null);
  const [brands, setBrands] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);

  interface BestSellingItem {
    _id: {
      Company: string;
      Dealer_Region: string;
    };
    count: number;
  }

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

  useEffect(() => {
    const fetchBestSelling = async () => {
      try {
        const res = await fetch('http://localhost:5000/analytics/best-selling');
        if (!res.ok) throw new Error('Error en la respuesta del backend para best-selling');
        const data = await res.json();
        console.log('Respuesta del endpoint best-selling:', data);
        setRawBestSelling(data);
      } catch (error) {
        console.error('Error fetching best-selling data:', error);
        setRawBestSelling([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBestSelling();
  }, []);

  useEffect(() => {
    if (!rawBestSelling || rawBestSelling.length === 0) {
      setBestSellingData(null);
      return;
    }
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
    const companiesSet = new Set<string>();
    rawBestSelling.forEach((item: BestSellingItem) => {
      if (item._id.Company) companiesSet.add(item._id.Company);
    });
    const companies = Array.from(companiesSet);
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#AA66CC', '#66AA00'];
    const colorForIndex = (idx: number): string => colors[idx % colors.length];
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

  // UseEffect para obtener la lista de marcas (para el filtro del gráfico de Total de Ventas)
  useEffect(() => {
    fetch('http://localhost:5000/cars/brands')
      .then(res => res.json())
      .then(data => {
        console.log('Marcas recibidas:', data);
        setBrands(data);
      })
      .catch(err => console.error('Error fetching brands:', err));
  }, []);

  // UseEffect para obtener los datos del endpoint de Total de Ventas por Marca (Precio Acumulado)
  useEffect(() => {
    const fetchBrandsTotalSum = async () => {
      try {
        const params = new URLSearchParams();
        if (selectedRegionsForBrand.length > 0) {
          params.append('region', selectedRegionsForBrand.join(','));
        }
        if (selectedBrand) {
          params.append('brand', selectedBrand);
        }
        const res = await fetch(`http://localhost:5000/analytics/brands-total-sum?${params.toString()}`);
        if (!res.ok) throw new Error('Error fetching brands total sum');
        const data = await res.json();
        console.log('Respuesta de brands-total-sum:', data);
        const labels = data.map((item: any) => item._id);
        const totals = data.map((item: any) => item.total);
        const chartData: ChartData<'pie'> = {
          labels,
          datasets: [{
            label: 'Total de ventas',
            data: totals,
            backgroundColor: labels.map((_, idx) => {
              const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#AA66CC', '#66AA00'];
              return colors[idx % colors.length];
            }),
          }],
        };
        setBrandsTotalSumData(chartData);
      } catch (error) {
        console.error('Error fetching brands total sum:', error);
        setBrandsTotalSumData(null);
      }
    };
    fetchBrandsTotalSum();
  }, [selectedRegionsForBrand, selectedBrand]);

  if (loading) return <p>Cargando analíticas...</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 mt-20">
      <h1 className="text-4xl font-bold mb-8">Analíticas</h1>

      {/* Sección 1: Ventas por Marca y Región */}
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
          <>
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
            <QueryDisplay 
              sqlQuery={`SELECT Company, Dealer_Region, COUNT(*) as total_sales
                          FROM vehicle_sales
                          WHERE Dealer_Region IN (${selectedRegions.length > 0 ? selectedRegions.join(', ') : 'Todas'})
                          GROUP BY Company, Dealer_Region
                          ORDER BY total_sales DESC;`}
              mongoQuery={`db.vehicle_sales.aggregate([
                          { $match: { Dealer_Region: { $in: [${selectedRegions.length > 0 ? selectedRegions.join(', ') : 'Todas'}] } } },
                          { $group: { _id: { Company: "$Company", Dealer_Region: "$Dealer_Region" }, total_sales: { $sum: 1 } } },
                          { $sort: { total_sales: -1 } }
                          ]);`}
            />
          </>
        ) : (
          <p>No hay datos para mostrar.</p>
        )}
      </section>

      {/* Sección 2: Total de Ventas por Marca (Precio Acumulado) - Gráfico de Torta */}
      <section className="mb-12">
        <h3 className="text-xl font-bold mb-4">Total de Ventas por Marca (Precio Acumulado)</h3>
        <div className="mb-4 flex flex-col md:flex-row gap-4 items-center">
          {/* Filtro de región (selección múltiple) */}
          <div className="w-64">
            <label htmlFor="regionBrand" className="block font-semibold mb-1">Región:</label>
            <MultiSelectDropdown 
              options={allRegionsForSelect}
              selected={selectedRegionsForBrand}
              onChange={setSelectedRegionsForBrand}
              placeholder="Selecciona región(es)"
            />
          </div>
          {/* Filtro de marca (select simple) */}
          <div className="w-64">
            <label htmlFor="brandFilter" className="block font-semibold mb-1">Marca:</label>
            <select 
              id="brandFilter" 
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="border rounded px-2 py-1 w-full"
            >
              <option value="">Todas</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>
        </div>
        {brandsTotalSumData ? (
          <>
            <TopBrandsChart
              data={brandsTotalSumData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: true, text: 'Total de Ventas por Marca' },
                },
              }}
            />
            <QueryDisplay 
              sqlQuery={`SELECT Company, SUM(Price) as total FROM Cars
WHERE ${selectedRegionsForBrand.length > 0 ? `Dealer_Region IN (${selectedRegionsForBrand.join(', ')})` : '1=1'}
${selectedBrand ? `AND Company = '${selectedBrand}'` : ''}
GROUP BY Company;`}
              mongoQuery={`db.proyecto-BD2.aggregate([
  { $match: { ${selectedRegionsForBrand.length > 0 ? `Dealer_Region: { $in: ${JSON.stringify(selectedRegionsForBrand)} }` : '{}' }${selectedBrand ? `, Company: "${selectedBrand}"` : ''} } },
  { $group: { _id: "$Company", total: { $sum: "$Price" } } }
]);`}
            />
          </>
        ) : (
          <p>No hay datos para mostrar.</p>
        )}
      </section>
    </div>
  );
};

export default Analytics;
