import React from 'react';
import { Link } from 'react-router-dom';
import http from '../helpers/http';

function Profile() {
  const [userProfile, setUserProfile] = React.useState({});
  const getProfile = async () => {
    const token = window.localStorage.getItem('token');
    const { data } = await http(token).get('/profile');
    // console.log(data);
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
      <Link to="/"><button type="button">Back</button></Link>
    </div>
  );
}

export default Profile;
