// src/components/CatalogFilterPanel.tsx
import React from 'react';

interface CatalogFilterProps {
  onFilter: (filters: { Company: string; Model: string; Year: string }) => void;
  companies: string[];
  models: string[];
  years: number[];
  selectedCompany: string;
  setSelectedCompany: (value: string) => void;
  selectedModel: string;
  setSelectedModel: (value: string) => void;
  selectedYear: string;
  setSelectedYear: (value: string) => void;
}

const CatalogFilterPanel: React.FC<CatalogFilterProps> = ({
  onFilter,
  companies,
  models,
  years,
  selectedCompany,
  setSelectedCompany,
  selectedModel,
  setSelectedModel,
  selectedYear,
  setSelectedYear,
}) => {
  // Eliminamos el estado local de filtros, usamos directamente las props

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'Company') {
      setSelectedCompany(value);
      setSelectedModel('');
      setSelectedYear('');
    } else if (name === 'Model') {
      setSelectedModel(value);
      setSelectedYear('');
    } else if (name === 'Year') {
      setSelectedYear(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({
      Company: selectedCompany,
      Model: selectedModel,
      Year: selectedYear,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block font-semibold mb-1" htmlFor="Company">Marca</label>
        <select 
          id="Company" 
          name="Company" 
          value={selectedCompany} 
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        >
          <option value="">Selecciona una marca</option>
          {companies.map((company, idx) => (
            <option key={idx} value={company}>{company}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1" htmlFor="Model">Modelo</label>
        <select 
          id="Model" 
          name="Model" 
          value={selectedModel} 
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
          disabled={!selectedCompany}
        >
          <option value="">Selecciona un modelo</option>
          {models.map((model, idx) => (
            <option key={idx} value={model}>{model}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1" htmlFor="Year">Año</label>
        <select 
          id="Year" 
          name="Year" 
          value={selectedYear} 
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