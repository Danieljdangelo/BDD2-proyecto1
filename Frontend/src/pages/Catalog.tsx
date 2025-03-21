import React, { useState } from 'react';
import CatalogFilterPanel from '../components/CatalogFilterPanel';
import TarjetaCarro from '../components/TarjetaCarro';

interface Car {
  _id: string;
  marca: string;
  modelo: string;
  año: number;
  foto: string;
  kilometros: number;
  descripcion: string;
}

const Catalog: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [car, setCar] = useState<Car | null>(null);

  const handleFilter = async (filters: { marca: string; modelo: string; año: string }) => {
    setLoading(true);
    setCar(null);

    // Simula una llamada a la API con un retraso de 2 segundos
    setTimeout(() => {
      const foundCar: Car = {
        _id: '1',
        marca: filters.marca || 'Toyota',
        modelo: filters.modelo || 'Corolla',
        año: filters.año ? Number(filters.año) : 2020,
        foto: 'https://via.placeholder.com/600x400?text=Foto+del+Carro',
        kilometros: 50000,
        descripcion: 'Un carro en excelentes condiciones, con todas las características que buscas.'
      };
      setCar(foundCar);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 mt-20">
      <h2 className="text-3xl font-bold mb-4">Catálogo de Carros</h2>
      <div className="flex flex-col md:flex-row md:justify-center gap-8">
        {/* Columna izquierda: buscador con ancho fijo */}
        <div className="w-[400px]">
          <CatalogFilterPanel onFilter={handleFilter} />
          {loading && (
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
          )}
        </div>
        {/* Columna derecha: tarjeta del carro con ancho fijo */}
        <div className="w-[600px] flex items-center justify-center">
          {car && (
            <div className="w-full">
              <TarjetaCarro car={car} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
