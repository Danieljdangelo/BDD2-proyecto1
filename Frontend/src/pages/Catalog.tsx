import React, { useEffect, useState } from 'react';
import TarjetaCarro from '../components/TarjetaCarro';

interface Car {
  _id: string;
  Brand: string;
  Model: string;
  Year: number;
  Color: string;
  Mileage: number;
  Price: number;
  Condition: string;
}

const Catalog: React.FC = () => {
  // Estados para los filtros y datos del backend
  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [years, setYears] = useState<number[]>([]);

  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(false);

  // Cargar marcas del backend al montar el componente
  useEffect(() => {
    fetch('http://localhost:5000/cars/brands')
      .then((res) => res.json())
      .then((data) => {
        console.log('Marcas recibidas:', data);
        setBrands(data);
      })
      .catch((err) => console.error('Error al cargar marcas:', err));
  }, []);
  

  // Cuando se seleccione una marca, cargar los modelos disponibles para esa marca
  useEffect(() => {
    if (selectedBrand) {
      fetch(`http://localhost:5000/cars/models?Brand=${encodeURIComponent(selectedBrand)}`)
        .then((res) => res.json())
        .then((data) => {
          setModels(data);
          // Reiniciamos modelo y año si cambia la marca
          setSelectedModel('');
          setSelectedYear('');
          setYears([]);
        })
        .catch((err) => console.error('Error al cargar modelos:', err));
    } else {
      setModels([]);
      setSelectedModel('');
      setSelectedYear('');
      setYears([]);
    }
  }, [selectedBrand]);

  // Cuando se seleccione un modelo, cargar los años disponibles para esa combinación de marca y modelo
  useEffect(() => {
    if (selectedBrand && selectedModel) {
      fetch(
        `http://localhost:5000/cars/years?Brand=${encodeURIComponent(
          selectedBrand,
        )}&Model=${encodeURIComponent(selectedModel)}`
      )
        .then((res) => res.json())
        .then((data) => {
          setYears(data);
          setSelectedYear('');
        })
        .catch((err) => console.error('Error al cargar años:', err));
    } else {
      setYears([]);
      setSelectedYear('');
    }
  }, [selectedBrand, selectedModel]);

  // Función para buscar el carro basado en los filtros seleccionados
  const handleSearch = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        Brand: selectedBrand,
        Model: selectedModel,
        Year: selectedYear,
      });
      const response = await fetch(`http://localhost:5000/cars?${queryParams.toString()}`);
      const data = await response.json();
      // Suponemos que el endpoint devuelve un array de carros
      if (data && data.length > 0) {
        setCar(data[0]);
      } else {
        setCar(null);
      }
    } catch (error) {
      console.error('Error al buscar carro:', error);
      setCar(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 mt-20">
      <h2 className="text-3xl font-bold mb-4">Catálogo de Carros</h2>
      <div className="flex flex-col md:flex-row md:justify-center gap-8">
        {/* Panel de filtros */}
        <div className="w-[400px] space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Marca:</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full border rounded px-2 py-1"
            >
              <option value="">Seleccione una marca</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Modelo:</label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              disabled={!selectedBrand}
              className="w-full border rounded px-2 py-1"
            >
              <option value="">Seleccione un modelo</option>
              {models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Año:</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              disabled={!selectedModel}
              className="w-full border rounded px-2 py-1"
            >
              <option value="">Seleccione un año</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleSearch}
            disabled={loading || !selectedBrand || !selectedModel || !selectedYear}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>

        {/* Tarjeta de resultados */}
        <div className="w-[600px] flex items-center justify-center">
          {loading ? (
            <div className="mt-4 p-4 bg-white bg-opacity-70 rounded-lg flex justify-center items-center h-[200px]">
              <svg
                className="animate-spin h-8 w-8 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            </div>
          ) : car ? (
            <div className="w-full">
              <TarjetaCarro car={car} />
            </div>
          ) : (
            <p>No se encontraron datos para esos filtros.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
