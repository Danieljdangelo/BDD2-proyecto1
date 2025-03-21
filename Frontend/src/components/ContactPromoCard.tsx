// src/components/ContactPromoCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const ContactPromoCard: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-white rounded-xl shadow-md overflow-hidden my-8">
      {/* Sección de imagen */}
      <div className="md:w-1/2">
        <img
          src="https://t4.ftcdn.net/jpg/00/87/26/69/360_F_87266908_vPok425ZDn1vVBoVOWKBOtircaRNcf1N.jpg"
          alt="Contacto"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Sección de contenido */}
      <div className="md:w-1/2 p-6 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-4">¿Tienes preguntas?</h2>
        <p className="text-gray-600 mb-6">
          Estamos aquí para ayudarte. Contáctanos para obtener más información y asesoría personalizada.
        </p>
        <Link
          to="/contact"
          className="self-end bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-8"
        >
          Contáctanos
        </Link>
      </div>
    </div>
  );
};

export default ContactPromoCard;
