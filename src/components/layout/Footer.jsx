import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white shadow-inner mt-auto py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-6 h-6 relative mr-2">
              <div className="pokeball w-full h-full transform scale-75"></div>
            </div>
            <span className="font-medium text-gray-700">Dexplorer</span>
          </div>
          
          <div className="text-sm text-gray-500 mb-4 md:mb-0 text-center">
            <p>Pokémon and related properties are © of Nintendo {currentYear}.</p>
            <p>This is a fan project and not affiliated with Nintendo or The Pokémon Company.</p>
          </div>
          
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/favorites" className="text-gray-600 hover:text-blue-600 transition-colors">
              Favorites
            </Link>
            <a 
              href="https://github.com/noviciusss/Dexplorer" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;