// src/components/QuotePromoCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const QuotePromoCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden my-8 p-6">
      <blockquote className="text-2xl italic text-gray-700 mb-4">
        "En BD CarStore, cada trato es una oportunidad de demostrar calidad y confianza. ¡La experiencia del cliente es lo primero!"
      </blockquote>
      <p className="text-right">
        <span className="font-bold">- Vendedor Experto</span>
      </p>
      <div className="mt-6 text-center">
        <Link
          to="/catalog"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Cotiza con nosotros
        </Link>
      </div>
    </div>
  );
};

export default QuotePromoCard;
