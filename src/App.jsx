import React from 'react';
import {
  createBrowserRouter, RouterProvider,
} from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Home from './pages/Home';
import Login from './pages/Login';
// eslint-disable-next-line import/no-unresolved
import Profile from './pages/Profile';
// eslint-disable-next-line import/no-unresolved
import Register from './pages/Register';

// import CharacterDetail from './pages/CharacterDetail';
// import CharacterList from './pages/CharacterList';

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
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
