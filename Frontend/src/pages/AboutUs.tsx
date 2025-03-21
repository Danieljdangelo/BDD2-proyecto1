import React from 'react';

const About: React.FC = () => {
  return (
    <div className="mt-20">
      {/* Sección: ¿Quiénes somos? */}
      <section className="px-6 py-12">
        <h2 className="text-4xl font-bold text-center mb-8">¿Quiénes somos?</h2>
        <div
          className="relative bg-cover bg-center rounded-xl shadow-lg"
          style={{ backgroundImage: 'url(https://via.placeholder.com/1200x400?text=Quienes+somos)' }}
        >
          <div className="bg-black bg-opacity-50 rounded-xl p-8">
            <p className="text-white text-lg">
              Somos una empresa dedicada a ofrecer los mejores carros del mercado, comprometidos con la calidad, la innovación y la satisfacción de nuestros clientes.
            </p>
          </div>
        </div>
      </section>

      {/* Sección: Misión */}
      <section className="px-6 py-12 bg-gray-100">
        <h2 className="text-4xl font-bold text-center mb-8">Misión</h2>
        <div
          className="relative bg-cover bg-center rounded-xl shadow-lg"
          style={{ backgroundImage: 'url(https://via.placeholder.com/1200x400?text=Misión)' }}
        >
          <div className="bg-black bg-opacity-50 rounded-xl p-8">
            <p className="text-white text-lg">
              Nuestra misión es revolucionar el mercado automotriz, ofreciendo una experiencia única y personalizada en la compra de vehículos, siempre con enfoque en la excelencia y la confianza.
            </p>
          </div>
        </div>
      </section>

      {/* Sección: Visión */}
      <section className="px-6 py-12">
        <h2 className="text-4xl font-bold text-center mb-8">Visión</h2>
        <div
          className="relative bg-cover bg-center rounded-xl shadow-lg"
          style={{ backgroundImage: 'url(https://via.placeholder.com/1200x400?text=Visión)' }}
        >
          <div className="bg-black bg-opacity-50 rounded-xl p-8">
            <p className="text-white text-lg">
              Nuestra visión es ser líderes en el sector automotriz a nivel global, transformando la manera en que las personas adquieren sus vehículos y creando experiencias memorables.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
