import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const logout = () => {
    window.localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <div>
      Home &middot;
      <Link to="/characters">Go to Character List</Link>
      <Link to="/profile">Profile</Link>
      <button type="button" onClick={logout}>Logout</button>
    </div>
  );
}

export default Home;
