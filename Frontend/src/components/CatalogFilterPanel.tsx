import React, { useState } from 'react';

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
  const brands = ["Toyota", "Honda", "Ford", "BMW", "Audi"];
  const brandModels: { [key: string]: string[] } = {
    Toyota: ["Corolla", "Camry", "Yaris"],
    Honda: ["Civic", "Accord", "Fit"],
    Ford: ["Fiesta", "Focus", "Mustang"],
    BMW: ["3 Series", "5 Series", "X5"],
    Audi: ["A3", "A4", "A6"]
  };
  const years = ["2023", "2022", "2021", "2020", "2019"];

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
