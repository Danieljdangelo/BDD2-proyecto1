import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check if a token exists in localStorage
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    window.location.reload(); // Refresh the page to update UI
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 text-white z-50">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* App Name */}
        <Link to="/" className="text-xl md:text-3xl font-bold">
          BD CarStore
        </Link>

        {/* Desktop Menu */}
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
              {token ? (
                <button 
                  onClick={handleLogout} 
                  className="hover:text-gray-300 text-lg md:text-xl"
                >
                  Cerrar Sesión
                </button>
              ) : (
                <Link to="/login" className="hover:text-gray-300 text-lg md:text-xl">Login/Sign In</Link>
              )}
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
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
              <Link onClick={() => setIsOpen(false)} to="/analytics" className="block hover:text-gray-300 text-lg">Analíticas</Link>
            </li>
            <li>
              <Link onClick={() => setIsOpen(false)} to="/about" className="block hover:text-gray-300 text-lg">Sobre Nosotros</Link>
            </li>
            <li>
              <Link onClick={() => setIsOpen(false)} to="/contact" className="block hover:text-gray-300 text-lg">Contáctanos</Link>
            </li>
            <li>
              {token ? (
                <button 
                  onClick={() => { handleLogout(); setIsOpen(false); }} 
                  className="block hover:text-gray-300 text-lg"
                >
                  Cerrar Sesión
                </button>
              ) : (
                <Link onClick={() => setIsOpen(false)} to="/login" className="block hover:text-gray-300 text-lg">Login/Sign In</Link>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;