import React from 'react';

const About: React.FC = () => {
  return (
    <div className="mt-20 space-y-12 px-4 mb-12">
      {/* Tarjeta 1: Quienes somos */}
      <section className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Lado izquierdo: Texto */}
          <div className="md:w-1/2 p-8">
            <h2 className="text-3xl font-bold mb-4">Quienes somos</h2>
            <p className="text-gray-700">
              Somos una empresa dedicada a ofrecer soluciones automotrices de alta calidad. 
              Nuestro compromiso es brindar una experiencia única a cada cliente, combinando innovación, confianza y un excelente servicio.
            </p>
          </div>
          {/* Lado derecho: Imagen con gradiente */}
          <div className="md:w-1/2 relative">
            <img
              src="https://www.workitdaily.com/media-library/sales-leader-with-an-active-style-of-management.jpg?id=23290231&width=800&quality=85"
              alt="Quienes somos"
              className="w-full h-full object-cover"
            />
            {/* Gradiente: de transparente a blanco, aplicado en el lado izquierdo de la imagen */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white"></div>
          </div>
        </div>
      </section>

      {/* Tarjeta 2: Misión */}
      <section className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Lado izquierdo: Imagen con gradiente */}
          <div className="md:w-1/2 relative">
            <img
              src="https://d9s1543upwp3n.cloudfront.net/wp-content/uploads/2021/05/fi-manager-696x464.jpg"
              alt="Misión"
              className="w-full h-full object-cover"
            />
            {/* Gradiente: de transparente a blanco, aplicado en el lado derecho de la imagen */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white"></div>
          </div>
          {/* Lado derecho: Texto */}
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">Misión</h2>
            <p className="text-gray-700">
              Nuestra misión es revolucionar la experiencia automotriz ofreciendo productos y servicios de primer nivel, 
              adaptándonos a las necesidades de nuestros clientes y superando sus expectativas en cada interacción.
            </p>
          </div>
        </div>
      </section>

      {/* Tarjeta 3: Visión */}
      <section className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Lado izquierdo: Texto */}
          <div className="md:w-1/2 p-8">
            <h2 className="text-3xl font-bold mb-4">Visión</h2>
            <p className="text-gray-700">
              Nuestra visión es ser reconocidos a nivel global por la excelencia en el sector automotriz, 
              innovando continuamente y creando relaciones duraderas basadas en la confianza y la satisfacción del cliente.
            </p>
          </div>
          {/* Lado derecho: Imagen con gradiente */}
          <div className="md:w-1/2 relative">
            <img
              src="https://www.wjhl.com/wp-content/uploads/sites/98/2022/12/367ca78d5b5e4e54879769fdad17a543.jpg?w=2560&h=1440&crop=1"
              alt="Visión"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
