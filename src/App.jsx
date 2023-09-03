import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ProtectedRoute from './features/auth/components/ProtectedRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemByUserIdAsync } from './features/cart/CartSlice';
import { selectLoggedInUser } from './features/auth/authSlice';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: '/cart',
    element: (
      <ProtectedRoute>
        <CartPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/checkout',
    element: (
      <ProtectedRoute>
        <Checkout />
      </ProtectedRoute>
    ),
  },
  {
    path: '/product-details/:id',
    element: (
      <ProtectedRoute>
        <ProductDetailsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(
    function () {
      if (user) {
        dispatch(fetchItemByUserIdAsync(user.id));
      }
    },
    [dispatch, user?.id]
  );
  return <RouterProvider router={router} />;
}

export default App;
