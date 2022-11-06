import React from 'react';
import { Link } from 'react-router-dom';
import http from '../helpers/http';

function Profile() {
  const [userProfile, setUserProfile] = React.useState({});
  const getProfile = async () => {
    const token = window.localStorage.getItem('token');
    const { data } = await http(token).get('/profile');
    setUserProfile(data.result);
  };

  React.useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <div>
        Full Name:
        {' '}
        {userProfile?.fullName}
      </div>
      <div>
        Birthdate:
        {' '}
        {userProfile?.birthDate}
      </div>
      <div>
        Picture:
        {' '}
        {userProfile?.picture}
      </div>
      <br />
      <Link to="/"><button className="btn btn-primary" type="button">Back</button></Link>
    </div>
  );
}

export default Profile;
