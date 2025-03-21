import React, { useState } from 'react';

interface FilterProps {
  onFilter: (filters: { marca: string; modelo: string; año: string }) => void;
}

const FilterPanel: React.FC<FilterProps> = ({ onFilter }) => {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [año, setAño] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({ marca, modelo, año });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-md shadow-md">
      <div className="mb-2">
        <label className="mr-2 font-semibold">Marca:</label>
        <input 
          type="text"
          value={marca} 
          onChange={(e) => setMarca(e.target.value)} 
          className="border rounded p-1"
          placeholder="Ej: Toyota"
        />
      </div>
      <div className="mb-2">
        <label className="mr-2 font-semibold">Modelo:</label>
        <input 
          type="text"
          value={modelo} 
          onChange={(e) => setModelo(e.target.value)} 
          className="border rounded p-1"
          placeholder="Ej: Corolla"
        />
      </div>
      <div className="mb-2">
        <label className="mr-2 font-semibold">Año:</label>
        <input 
          type="number"
          value={año} 
          onChange={(e) => setAño(e.target.value)} 
          className="border rounded p-1"
          placeholder="Ej: 2020"
        />
      </div>
      <button type="submit" className="mt-2 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">
        Filtrar
      </button>
    </form>
  );
};

export default FilterPanel;
