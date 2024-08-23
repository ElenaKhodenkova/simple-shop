import './App.css';
import Root from './Root';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import SigninPage from './pages/SigninPage/SigninPage';
import SignupPage from './pages/SignupPage/SignupPage';
import { useState, useEffect } from 'react';
import axiosInstance, { setAccessToken } from './axiosInstance';
import './style.scss';

import ProtectedRoute from './ProtectedRoute';
import CartPage from './pages/CartPage/CartPage';
import AddProduct from './pages/AddProduct/AddProduct';
import EditProduct from './pages/EditProduct/EditProduct';

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    axiosInstance
      .get(`${import.meta.env.VITE_API}/tokens/refresh`)
      .then((res) => {
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
      });
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root user={user} setUser={setUser} />,
      children: [
        {
          path: '/',
          element: <HomePage user={user} />,
        },
        {
          path: '/signin',
          element: (
            <ProtectedRoute authUser={user.username} redirectTo={'/'}>
              <SigninPage setUser={setUser} />
            </ProtectedRoute>
          ),
        },
        {
          path: '/signup',
          element: (
            <ProtectedRoute authUser={user.username} redirectTo={'/'}>
              <SignupPage setUser={setUser} />
            </ProtectedRoute>
          ),
        },
        {
          path: '/cart',
          element: <CartPage user={user} />,
        },
        {
          path: '/add-product',
          element: <AddProduct user={user} />,
        },
        {
          path: '/edit-product',
          element: <EditProduct user={user} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
