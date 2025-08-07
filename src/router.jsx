import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import FavoritesPage from './pages/FavoritesPage';
import ComparisonPage from './pages/ComparisonPage';
import NotFoundPage from './pages/NotFoundPage';
import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/pokemon/:id',
        element: <DetailPage />
      },
      {
        path: '/favorites',
        element: <FavoritesPage />
      },
      {
        path: '/compare',
        element: <ComparisonPage />
      }
    ]
  }
]);

export default router;