import React from 'react';

interface Car {
  _id: string;
  marca: string;
  modelo: string;
  año: number;
  // Otros campos que consideres necesarios
}

interface CarListProps {
  cars: Car[];
}

const CarList: React.FC<CarListProps> = ({ cars }) => {
  return (
    <div className="mt-4">
      <h3 className="text-xl font-bold mb-2">Resultados:</h3>
      {cars.length === 0 ? (
        <p>No se encontraron carros.</p>
      ) : (
        <ul className="space-y-2">
          {cars.map(car => (
            <li key={car._id} className="border rounded p-2 shadow-sm">
              {car.marca} {car.modelo} - {car.año}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CarList;
