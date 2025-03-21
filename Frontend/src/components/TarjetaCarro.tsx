import React from 'react';

interface Car {
  _id: string;
  marca: string;
  modelo: string;
  año: number;
  foto: string;
  kilometros: number;
  descripcion: string;
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
          src={car.foto} 
          alt={`${car.marca} ${car.modelo}`} 
          className="w-full h-full object-cover"
        />
      </div>
      {/* Columna derecha: información del carro (60% del ancho) */}
      <div className="w-3/5 flex flex-col justify-between p-4">
        <div>
          <h3 className="text-2xl font-bold mb-2">
            {car.marca} {car.modelo}
          </h3>
          <p className="text-gray-600 mb-1">Año: {car.año}</p>
          <p className="text-gray-600 mb-1">Kilómetros: {car.kilometros} km</p>
          <p className="text-gray-600">{car.descripcion}</p>
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
