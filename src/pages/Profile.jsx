/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
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
    <div className="grid grid-cols-6 gap-4 ">
      <div className=" h-screen flex justify-center items-center col-start-2 col-span-4 card w-96 bg-base-100 shadow-xl outline-double">
        <figure><img className="rounded-3xl" src="https://res.cloudinary.com/dvtniqszt/image/upload/v1667914841/assets/logo-reactjs-removebg-preview_rzzlu6.png" alt="Shoes" /></figure>
        <div className="rounded-lg card-body bg-slate-800">
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
            {/* {userProfile?.picture} */}
            <img src="./src/assets/uploads/" />
          </div>
          <br />
          {/* <div id="pic" /> */}
          <Link to="/"><Button className="btn btn-primary" type="button">Back</Button></Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
