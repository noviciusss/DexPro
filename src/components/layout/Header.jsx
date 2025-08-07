import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useFavorites } from '../../hooks/useFavorites';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { favorites } = useFavorites();
  const location = useLocation();
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const closeMenu = () => {
    setMenuOpen(false);
  };
  
  // Navigation links config with icons
  const navLinks = [
    { 
      to: "/", 
      label: "Home",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    { 
      to: "/favorites", 
      label: `Favorites (${favorites.length})`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    { 
      to: "/compare", 
      label: "Compare",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];
  
  // Active link style helper with improved active state
  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
      isActive 
        ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md shadow-red-500/20"
        : "text-gray-700 hover:bg-red-50 hover:text-red-700"
    }`;
  };
  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg relative z-10">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-red-500 via-white to-red-500"></div>
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-pokeball-pattern opacity-[0.03] pointer-events-none"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center group">
            <div className="w-10 h-10 relative mr-3 flex-shrink-0">
              <div className="pokeball w-full h-full"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 leading-tight group-hover:scale-105 transition-transform origin-left">
                Dexplorer
              </span>
              <span className="text-xs text-gray-500 -mt-1">
                Pokédex + Explorer
              </span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={getLinkClass(link.to)}
              >
                {link.icon}
                <span>{link.label}</span>
                
                {/* Animated underline for active link */}
                {location.pathname === link.to && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                    layoutId="underline"
                  />
                )}
              </NavLink>
            ))}
          </nav>
          
          {/* Mobile menu button with improved styling */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-blue-500 hover:bg-blue-50 focus:outline-none transition-colors"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu with enhanced animation */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <motion.div 
                className="pt-2 pb-4 space-y-2 bg-white rounded-lg shadow-lg mb-4"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                {navLinks.map((link, index) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={`${getLinkClass(link.to)} mx-2`}
                    onClick={closeMenu}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </NavLink>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
</header>
  );
};

export default Header;