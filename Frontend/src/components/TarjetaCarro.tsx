// src/components/TarjetaCarro.tsx
import React from 'react';

interface Car {
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

interface TarjetaCarroProps {
  car: Car;
}

const TarjetaCarro: React.FC<TarjetaCarroProps> = ({ car }) => {
  // Extraemos el año de la fecha
  const year = new Date(car.Date).getFullYear();

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-2">
        {car.Company} {car.Model} ({year})
      </h2>
      <p><strong>ID:</strong> {car.Car_id}</p>
      <p><strong>Color:</strong> {car.Color}</p>
      <p><strong>Engine:</strong> {car.Engine}</p>
      <p><strong>Transmission:</strong> {car.Transmission}</p>
      <p><strong>Price:</strong> ${car["Price ($)"]}</p>
      <p><strong>Dealer:</strong> {car.Dealer_Name} ({car.Dealer_No})</p>
      <p><strong>Region:</strong> {car.Dealer_Region}</p>
      <p><strong>Body Style:</strong> {car["Body Style"]}</p>
      <p><strong>Phone:</strong> {car.Phone}</p>
      <p><strong>Customer:</strong> {car["Customer Name"]}</p>
      <p><strong>Gender:</strong> {car.Gender}</p>
      <p><strong>Annual Income:</strong> ${car["Annual Income"]}</p>
    </div>
  );
};

export default TarjetaCarro;