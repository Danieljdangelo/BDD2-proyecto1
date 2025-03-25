// src/pages/Catalog.tsx
import React, { useState, useEffect } from 'react';
import CatalogFilterPanel from '../components/CatalogFilterPanel';
import TarjetaCarro from '../components/TarjetaCarro';
import CarList from '../components/CarList';

interface Car {
  _id: string;
  Car_id: string;
  Date: string;
  "Customer Name": string;
  Gender: string;
  "Annual Income": number;
  Dealer_Name: string;
  Company: string;
  Model: string;
  Engine: string;
  Transmission: string;
  Color: string;
  "Price ($)": number;
  Dealer_No: string;
  "Body Style": string;
  Phone: number;
  Dealer_Region: string;
}

const Catalog: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [car, setCar] = useState<Car | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  // Filtros para la nueva estructura
  const [companies, setCompanies] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // Obtener las empresas desde el backend
  useEffect(() => {
    fetch('http://localhost:5000/cars/brands')
      .then(res => res.json())
      .then(data => setCompanies(data))
      .catch(err => console.error('Error fetching companies:', err));
  }, []);

  // Al seleccionar una empresa, obtener modelos
  useEffect(() => {
    if (selectedCompany) {
      fetch(`http://localhost:5000/cars/models?Company=${encodeURIComponent(selectedCompany)}`)
        .then(res => res.json())
        .then(data => {
          setModels(data);
          setSelectedModel('');
          setYears([]);
          setSelectedYear('');
        })
        .catch(err => console.error('Error fetching models:', err));
    } else {
      setModels([]);
      setSelectedModel('');
      setYears([]);
      setSelectedYear('');
    }
  }, [selectedCompany]);

  // Al seleccionar un modelo, obtener los años
  useEffect(() => {
    if (selectedCompany && selectedModel) {
      fetch(`http://localhost:5000/cars/years?Company=${encodeURIComponent(selectedCompany)}&Model=${encodeURIComponent(selectedModel)}`)
        .then(res => res.json())
        .then(data => {
          setYears(data);
          setSelectedYear('');
        })
        .catch(err => console.error('Error fetching years:', err));
    } else {
      setYears([]);
      setSelectedYear('');
    }
  }, [selectedCompany, selectedModel]);

  // Función para filtrar y obtener todos los carros que coincidan
  const handleFilter = async (filters: { Company: string; Model: string; Year: string }) => {
    setLoading(true);
    setCar(null);
    setCars([]);
    try {
      const queryParams = new URLSearchParams({
        Company: filters.Company,
        Model: filters.Model,
        Year: filters.Year,
      });
      const res = await fetch(`http://localhost:5000/cars?${queryParams.toString()}`);
      const data = await res.json();
      if (data && data.length > 0) {
        setCar(data[0]); // Seleccionamos el primer carro para la tarjeta
        setCars(data);   // Guardamos la lista completa
      } else {
        setCar(null);
        setCars([]);
      }
    } catch (error) {
      console.error('Error fetching filtered cars:', error);
      setCar(null);
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  // ... Código previo de Catalog.tsx

return (
  <div className="max-w-7xl mx-auto p-4 mt-20">
    <h2 className="text-3xl font-bold mb-4 text-center">Catálogo de Carros</h2>
    <div className="flex flex-col md:flex-row md:justify-center gap-8">
      {/* Panel de filtros */}
      <div className="w-[400px]">
        <CatalogFilterPanel 
          onFilter={handleFilter} 
          companies={companies}
          models={models}
          years={years}
          selectedCompany={selectedCompany}
          setSelectedCompany={setSelectedCompany}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
        {loading && (
          <div className="mt-4 p-4 bg-white bg-opacity-70 rounded-lg flex justify-center items-center h-[200px]">
            <p>Cargando...</p>
          </div>
        )}
      </div>

      {/* Columna derecha: Tarjeta de carro */}
      <div className="w-[600px]">
        {car ? (
          <TarjetaCarro car={car} />
        ) : (
          <p className="text-center">No se encontró un carro destacado.</p>
        )}
      </div>
    </div>

    {/* Sección separada para la lista, centrada horizontalmente */}
    {cars && cars.length > 0 && (
      <div className="w-[910px] mx-auto mt-8">
        <h3 className="text-2xl font-bold mb-4 text-center">Lista de Carros</h3>
        <div className="max-h-[400px] w-full overflow-y-auto overflow-x-hidden border rounded">
          <CarList cars={cars} />
        </div>
      </div>
    )}
  </div>
);
};

export default Catalog;