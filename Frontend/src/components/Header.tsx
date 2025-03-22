import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 text-white z-50">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Nombre de la App */}
        <Link to="/" className="text-xl md:text-3xl font-bold">
          BD CarStore
        </Link>
        {/* Menú de escritorio */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <Link to="/" className="hover:text-gray-300 text-lg md:text-xl">Inicio</Link>
            </li>
            <li>
              <Link to="/catalog" className="hover:text-gray-300 text-lg md:text-xl">Catálogo</Link>
            </li>
            <li>
              <Link to="/analytics" className="hover:text-gray-300 text-lg md:text-xl">Analíticas</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-300 text-lg md:text-xl">Sobre Nosotros</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-300 text-lg md:text-xl">Contáctanos</Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-gray-300 text-lg md:text-xl">Login/Sign In</Link>
            </li>
          </ul>
        </nav>
        {/* Botón de menú hamburguesa para móviles */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      {/* Menú móvil */}
      {isOpen && (
        <nav className="md:hidden bg-gray-700">
          <ul className="px-6 py-4 space-y-2">
            <li>
              <Link onClick={() => setIsOpen(false)} to="/" className="block hover:text-gray-300 text-lg">Inicio</Link>
            </li>
            <li>
              <Link onClick={() => setIsOpen(false)} to="/catalog" className="block hover:text-gray-300 text-lg">Catálogo</Link>
            </li>
            <li>
              <Link to="/catalog" className="hover:text-gray-300 text-lg md:text-xl">Analíticas</Link>
            </li>
            <li>
              <Link onClick={() => setIsOpen(false)} to="/about" className="block hover:text-gray-300 text-lg">Sobre Nosotros</Link>
            </li>
            <li>
              <Link onClick={() => setIsOpen(false)} to="/contact" className="block hover:text-gray-300 text-lg">Contáctanos</Link>
            </li>
            <li>
              <Link onClick={() => setIsOpen(false)} to="/login" className="block hover:text-gray-300 text-lg">Login/Sign In</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
