import React, { useEffect, useState } from 'react';
import CarruselMarcas from '../components/CarruselMarcas';
import ContactPromoCard from '../components/ContactPromoCard';
import QuotePromoCard from '../components/QuotePromoCard';

interface Car {
  _id: string;
  ID: number;
  Brand: string;
  Model: string;
  Year: number;
  Color: string;
  Mileage: number;
  Price: number;
  Condition: string;
}

const Home: React.FC = () => {

  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);

  // Función para obtener datos del backend
  const fetchFeaturedCars = async () => {
    try {
      const response = await fetch('http://localhost:3000/cars/featured'); // Ruta del backend
      const result = await response.json() as Car[];
      setFeaturedCars(result);
    } catch (error) {
      console.error('Error fetching featured cars:', error);
    }
  };

  // Ejecuta fetchFeaturedCars al cargar el componente
  useEffect(() => {
    fetchFeaturedCars();
  }, []);

  return (
    <main id="home" className="mt-20">
      {/* Sección Hero inicial */}
      <section className="flex flex-col md:flex-row items-center gap-8 justify-between px-6 py-12 bg-gray-100 rounded-xl">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Encuentra el carro de tus sueños
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            En BD CarStore te ofrecemos una selección exclusiva de vehículos, 
            con opciones para todos los gustos y presupuestos. ¡Tu próximo carro te espera!
          </p>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
          <img
            src="https://www.topgear.com/sites/default/files/2023/12/1%20Ferrari%20Purosangue%20review.jpg"
            alt="Car placeholder"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      </section>

      {/* Carrusel de marcas */}
      <section className="px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Alguna de nuestras marcas más vendidas
        </h2>
        <CarruselMarcas />
      </section>

      {/* Tarjeta de promoción de contacto */}
      <ContactPromoCard />

      {/* Tarjeta de promoción con quote */}
      <QuotePromoCard />
    </main>
  );
};

export default Home;


// const Home: React.FC = () => {
//     return (
//       <main id="home" className="mt-20">
//         {/* Sección Hero */}
//         <section className="flex flex-col md:flex-row items-center justify-between px-6 py-12 bg-white rounded-xl shadow-md mx-4">
//           {/* Columna de texto */}
//           <div className="md:w-1/2">
//             <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
//               Encuentra el carro de tus sueños
//             </h1>
//             <p className="text-lg md:text-xl text-gray-600">
//               En BD CarStore te ofrecemos una selección exclusiva de vehículos, 
//               con opciones para todos los gustos y presupuestos. ¡Tu próximo carro te espera!
//             </p>
//           </div>
//           {/* Columna de imagen */}
//           <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
//             <img
//               src="https://www.topgear.com/sites/default/files/2023/12/1%20Ferrari%20Purosangue%20review.jpg"
//               alt="Car placeholder"
//               className="w-full h-auto object-cover rounded-lg"
//             />
//           </div>
//         </section>
  
//         {/* Sección de Marcas */}
//         <section className="px-6 py-12">
//           <h2 className="text-3xl font-bold text-gray-800 mb-8">
//             Alguna de nuestras marcas más vendidas
//           </h2>
//           <CarruselMarcas />
//         </section>
//       </main>
//     );
//   };
  
//   export default Home;