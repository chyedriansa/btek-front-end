import React from 'react';
import {
  createBrowserRouter, RouterProvider,
} from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Home from './pages/Home';
import Login from './pages/Login';
// eslint-disable-next-line import/no-unresolved
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
// eslint-disable-next-line import/no-unresolved
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RequireAuth><Home /></RequireAuth>,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/profile',
    element: <RequireAuth><Profile /></RequireAuth>,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password',
    element: <resetPassword />,
  },
  {
    path: '/profile/edit',
    element: <RequireAuth><EditProfile /></RequireAuth>,
  },

]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
