import React from 'react';

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

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex w-full min-h-[300px]">
      {/* Columna izquierda: imagen del carro (40% del ancho) */}
      <div className="w-2/5">
        <img 
          // src={car.foto} 
          alt={`${car.Brand} ${car.Model}`} 
          className="w-full h-full object-cover"
        />
      </div>
      {/* Columna derecha: información del carro (60% del ancho) */}
      <div className="w-3/5 flex flex-col justify-between p-4">
        <div>
          <h3 className="text-2xl font-bold mb-2">
            {car.Brand} {car.Model}
          </h3>
          <p className="text-gray-600 mb-1">Año: {car.Year}</p>
          <p className="text-gray-600 mb-1">Kilómetros: {car.Mileage} km</p>
          <p className="text-gray-600 mb-1">Color: {car.Color}</p>
          <p className="text-gray-600 mb-1">Condición: {car.Condition}</p>
          {/* <p className="text-gray-600">{car.descripcion}</p> */}
        </div>
        <div className="mt-4 text-right">
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            onClick={() => {
              // Lógica futura de redirección a la página de login o precio
            }}
          >
            VER PRECIO
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
