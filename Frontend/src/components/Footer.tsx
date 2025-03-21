import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-gray-800 text-white py-6"
      style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}
    >
      <div className="px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Derechos y créditos */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <p>&copy; {currentYear} BD CarStore. Todos los derechos reservados.</p>
          <p>Desarrollado por [Tu Equipo]</p>
        </div>
        {/* Iconos de redes sociales */}
        <div className="flex space-x-4 mb-4 md:mb-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z" />
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
            <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M24 4.557a9.9 9.9 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.723 9.864 9.864 0 0 1-3.127 1.195A4.916 4.916 0 0 0 16.616 3c-2.73 0-4.945 2.21-4.945 4.936 0 .39.044.77.128 1.138-4.112-.206-7.764-2.176-10.214-5.17a4.822 4.822 0 0 0-.667 2.481c0 1.71.87 3.216 2.188 4.099a4.903 4.903 0 0 1-2.24-.616v.062c0 2.386 1.693 4.374 3.946 4.827a4.935 4.935 0 0 1-2.232.084 4.937 4.937 0 0 0 4.604 3.417A9.867 9.867 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.212c9.058 0 14.01-7.506 14.01-14.01 0-.213-.005-.425-.014-.636A10.025 10.025 0 0 0 24 4.557z" />
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
            <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.247 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.247-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.247-2.242-1.31-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608C4.517 2.497 5.784 2.225 7.15 2.163 8.416 2.105 8.796 2.093 12 2.093m0-2.163C8.736 0 8.332.015 7.052.072 5.78.129 4.59.386 3.635 1.341c-.955.955-1.212 2.145-1.269 3.417C2.015 5.668 2 6.072 2 9.335v5.33c0 3.263.015 3.667.072 4.947.057 1.272.314 2.462 1.269 3.417.955.955 2.145 1.212 3.417 1.269 1.28.057 1.684.072 4.947.072s3.667-.015 4.947-.072c1.272-.057 2.462-.314 3.417-1.269.955-.955 1.212-2.145 1.269-3.417.057-1.28.072-1.684.072-4.947s-.015-3.667-.072-4.947c-.057-1.272-.314-2.462-1.269-3.417-.955-.955-2.145-1.212-3.417-1.269C15.668.015 15.264 0 12 0z" />
              <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
              <circle cx="18.406" cy="5.594" r="1.44"/>
            </svg>
          </a>
        </div>
        <div className="flex space-x-4">
          <Link to="/privacy" className="hover:underline text-sm">Aviso de Privacidad</Link>
          <Link to="/terms" className="hover:underline text-sm">Términos de Uso</Link>
          <Link to="/about" className="hover:underline text-sm">Acerca de</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
