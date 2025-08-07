import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import { PokemonDataProvider } from './context/PokemonDataContext';
import { ErrorBoundary } from 'react-error-boundary';
import router from './router';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <PokemonDataProvider>
        <FavoritesProvider>
          <RouterProvider router={router} />
        </FavoritesProvider>
      </PokemonDataProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);