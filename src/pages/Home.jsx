import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

function Home() {
  const navigate = useNavigate();
  const logout = () => {
    window.localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <div>
      Your main Home &middot;
      <Link to="/profile"><Button type="button">Profile</Button></Link>
      <br />
      <Link to="/profile/edit"><Button type="button">Edit Profile</Button></Link>
      <br />
      <button className="block bg-sky-900 hover:bg-sky-500 text-white rounded-2xl btn btn-primary" type="submit" onClick={logout}>Logout</button>
    </div>
  );
}

export default Home;
