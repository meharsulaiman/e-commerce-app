import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ProductList from './features/productList/productList';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/cart',
    element: <CartPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
