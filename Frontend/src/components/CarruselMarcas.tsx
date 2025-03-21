import React from 'react';

const logos = [
  'https://pngimg.com/d/car_logo_PNG1665.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Mitsubishi-logo.png/1200px-Mitsubishi-logo.png',
  'https://cdn.iconscout.com/icon/free/png-256/free-kia-logo-icon-download-in-svg-png-gif-file-formats--new-2021-motors-logos-icons-2641348.png',
  'https://logos-world.net/wp-content/uploads/2021/03/Hyundai-Emblem.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/2048px-BMW.svg.png',
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
