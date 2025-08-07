import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-indigo-50">
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* More vibrant background gradients */}
      <div className="absolute -top-10 -right-10 w-96 h-96 rounded-full bg-red-100 opacity-40 blur-3xl"></div>
      <div className="absolute -bottom-10 -left-10 w-96 h-96 rounded-full bg-blue-100 opacity-40 blur-3xl"></div>
      <div className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full bg-yellow-100 opacity-30 blur-3xl"></div>
    </div>
      
      <Header />
      
      <motion.main 
        className="flex-grow relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>
      
      <Footer />
    </div>
  );
};

export default App;