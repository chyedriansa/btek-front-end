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
        <figure><img className="rounded-3xl" src="https://o.remove.bg/downloads/dd281772-08a2-4916-ba8c-260e1f31bc70/logo-reactjs-removebg-preview.png" alt="Shoes" /></figure>
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
            {userProfile?.picture}
          </div>
          <br />
          <Link to="/"><Button className="btn btn-primary" type="button">Back</Button></Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
