import React from 'react';

const logos = [
  'https://via.placeholder.com/150?text=Marca+1',
  'https://via.placeholder.com/150?text=Marca+2',
  'https://via.placeholder.com/150?text=Marca+3',
  'https://via.placeholder.com/150?text=Marca+4',
  'https://via.placeholder.com/150?text=Marca+5',
];

const BrandsCarousel: React.FC = () => {
  // Duplicamos el array para lograr un efecto de bucle continuo
  const logosRepeated = [...logos, ...logos];

  return (
    <div className="overflow-hidden">
      <div className="flex space-x-8 animate-marquee">
        {logosRepeated.map((logo, index) => (
          <div key={index} className="flex-shrink-0">
            <img src={logo} alt={`Marca ${index + 1}`} className="w-40 h-auto" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandsCarousel;
