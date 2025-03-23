import React, { useState, useEffect } from 'react';
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

interface CatalogFilterProps {
  onFilter: (filters: { marca: string; modelo: string; año: string }) => void;
}

const CatalogFilterPanel: React.FC<CatalogFilterProps> = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    marca: '',
    modelo: '',
    año: ''
  });

  // Simulamos datos que vendrían de MongoDB
  const [cars, setCars] = useState<Car[]>([]); // Estado para almacenar los carros
  const [brands, setBrands] = useState<string[]>([]); // Estado para almacenar las marcas
  const [brandModels, setBrandModels] = useState<{ [key: string]: string[] }>({}); // Estado para almacenar los modelos por marca
  const [years, setYears] = useState<string[]>([]); // Estado para almacenar los años

  // Obtener los carros desde el backend al cargar el componente
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:3000/cars'); // Ruta del backend
        const data: Car[] = await response.json();
        setCars(data);

        // Extraer marcas, modelos y años únicos
        const uniqueBrands = [...new Set(data.map((car: Car) => car.Brand))];
        const uniqueModelsByBrand: { [key: string]: string[] } = {};
        const uniqueYears = [...new Set(data.map((car: Car) => car.Year.toString()))];

        data.forEach((car: Car) => {
          if (!uniqueModelsByBrand[car.Brand]) {
            uniqueModelsByBrand[car.Brand] = [];
          }
          if (!uniqueModelsByBrand[car.Brand].includes(car.Model)) {
            uniqueModelsByBrand[car.Brand].push(car.Model);
          }
        });

        setBrands(uniqueBrands);
        setBrandModels(uniqueModelsByBrand);
        setYears(uniqueYears);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'marca' ? { modelo: '' } : {}) // Al cambiar marca, reiniciamos modelo
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block font-semibold mb-1" htmlFor="marca">Marca</label>
        <select 
          id="marca" 
          name="marca" 
          value={filters.marca} 
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        >
          <option value="">Selecciona una marca</option>
          {brands.map((brand, idx) => (
            <option key={idx} value={brand}>{brand}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1" htmlFor="modelo">Modelo</label>
        <select 
          id="modelo" 
          name="modelo" 
          value={filters.modelo} 
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
          disabled={!filters.marca}
        >
          <option value="">Selecciona un modelo</option>
          {filters.marca && brandModels[filters.marca]?.map((model, idx) => (
            <option key={idx} value={model}>{model}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1" htmlFor="año">Año</label>
        <select 
          id="año" 
          name="año" 
          value={filters.año} 
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        >
          <option value="">Selecciona un año</option>
          {years.map((year, idx) => (
            <option key={idx} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
        Buscar
      </button>
    </form>
  );
};

export default CatalogFilterPanel;
