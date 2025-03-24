// src/components/TarjetaCarro.tsx
import React from 'react';

export interface Car {
  _id: string;
  Brand: string;
  Model: string;
  Year: number;
  Color: string;
  Mileage: number;
  Price: number;
  Condition: string;
}

export interface CarCardProps {
  car: Car;
}

const TarjetaCarro: React.FC<CarCardProps> = ({ car }) => {
  return (
    <div className="p-4 border rounded">
      <h3 className="text-2xl font-bold mb-2">
        {car.Brand} {car.Model} ({car.Year})
      </h3>
      <p>Color: {car.Color}</p>
      <p>Kilometraje: {car.Mileage}</p>
      <p>Precio: {car.Price}</p>
      <p>Condición: {car.Condition}</p>
    </div>
  );
};

export default TarjetaCarro;
