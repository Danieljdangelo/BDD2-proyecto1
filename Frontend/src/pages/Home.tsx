import React from 'react';
import CarruselMarcas from '../components/CarruselMarcas'

const Home: React.FC = () => {
    return (
      <main id="home" className="mt-20">
        {/* Sección Hero */}
        <section className="flex flex-col md:flex-row items-center justify-between px-6 py-12 bg-white rounded-xl shadow-md mx-4">
          {/* Columna de texto */}
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
              Encuentra el carro de tus sueños
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              En BD CarStore te ofrecemos una selección exclusiva de vehículos, 
              con opciones para todos los gustos y presupuestos. ¡Tu próximo carro te espera!
            </p>
          </div>
          {/* Columna de imagen */}
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
            <img
              src="https://via.placeholder.com/500x300"
              alt="Car placeholder"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </section>
  
        {/* Sección de Marcas */}
        <section className="px-6 py-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Alguna de nuestras marcas más vendidas
          </h2>
          <CarruselMarcas />
        </section>
      </main>
    );
  };
  
  export default Home;