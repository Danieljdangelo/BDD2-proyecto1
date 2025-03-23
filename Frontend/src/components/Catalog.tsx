import React, { useState, useEffect } from 'react';
import CatalogFilterPanel from './CatalogFilterPanel';
import CarCard from './TarjetaCarro'; // Importa el componente CarList

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
  const [cars, setCars] = useState<Car[]>([]); // Lista completa de carros
  const [filteredCars, setFilteredCars] = useState<Car[]>([]); // Lista de carros filtrados

  // Obtener los carros desde el backend al cargar el componente
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:3000/cars'); // Ruta del backend
        const data = await response.json();
        setCars(data);
        setFilteredCars(data); // Inicialmente, muestra todos los carros
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  // Manejar el filtrado de carros
  const handleFilter = (filters: { marca: string; modelo: string; año: string }) => {
    const filtered = cars.filter(car =>
      (filters.marca ? car.Brand === filters.marca : true) &&
      (filters.modelo ? car.Model === filters.modelo : true) &&
      (filters.año ? car.Year.toString() === filters.año : true)
    );
    setFilteredCars(filtered);
  };

  return (
    <div>
      {/* Panel de filtros */}
      <CatalogFilterPanel onFilter={handleFilter} />

      {/* Lista de carros filtrados */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {filteredCars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;