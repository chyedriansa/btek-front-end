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
      Home &middot;
      {/* <Link to="/characters">Go to Character List</Link>
      <br /> */}
      <Link to="/profile"><button type="button">Profile</button></Link>
      <br />
      <Link to="/profile/edit"><button type="button">Edit Profile</button></Link>
      <br />
      <button type="button" onClick={logout}>Logout</button>
      <Button>OK</Button>

    </div>
  );
}

export default Home;
