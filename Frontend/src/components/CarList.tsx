// src/components/CarList.tsx
import React from 'react';

export interface Car {
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

interface CarListProps {
  cars: Car[];
}

const CarList: React.FC<CarListProps> = ({ cars }) => {
  if (cars.length === 0) return null;

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Marca</th>
            <th className="border p-2">Modelo</th>
            <th className="border p-2">Transmisión</th>
            <th className="border p-2">Tipo de Motor</th>
            <th className="border p-2">Precio</th>
            <th className="border p-2">Dealer</th>
            <th className="border p-2">Región</th>
            <th className="border p-2">Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {cars.map(car => (
            <tr key={car._id}>
              <td className="border p-2">{car.Company}</td>
              <td className="border p-2">{car.Model}</td>
              <td className="border p-2">{car.Transmission}</td>
              <td className="border p-2">{car.Engine}</td>
              <td className="border p-2">${car["Price ($)"]}</td>
              <td className="border p-2">{car.Dealer_Name}</td>
              <td className="border p-2">{car.Dealer_Region}</td>
              <td className="border p-2">{car.Phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarList;