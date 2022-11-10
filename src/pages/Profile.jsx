/* eslint-disable react/self-closing-comp */
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button';
import * as profileAction from '../redux/asyncActions/profile';
import * as profileReducerAction from '../redux/reducers/profile';

function Profile() {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile.user);

  React.useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (!userProfile?.fullName) {
      dispatch(profileAction.getDataUser({ token }));
    }
  }, []);

  return (
    <div className="grid grid-cols-6 gap-4 ">
      <div className=" h-screen flex justify-center items-center col-start-2 col-span-4 card w-96 bg-base-100 shadow-xl outline-double">
        <figure><img className="rounded-3xl" src="https://res.cloudinary.com/dvtniqszt/image/upload/v1667914841/assets/logo-reactjs-removebg-preview_rzzlu6.png" alt="Shoes" /></figure>
        <div className="rounded-lg card-body bg-slate-800">
          <div>
            <h2 className="py-6">
              Name :
              {' '}
              {userProfile?.fullName ?? '(Not edit yet)'}
              <br />
              <br />
              .Birth Date:
              {' '}
              {userProfile?.birthDate ?? '(Not edit yet)'}
              {userProfile?.picture && <img className="mask mask-circle" style={{ width: '50%', height: '80%' }} src={`${userProfile?.picture}`} alt={userProfile?.picture} />}
            </h2>
          </div>
          <Link to="/"><Button className="btn btn-primary" type="button" onClick={() => dispatch(profileReducerAction.resetProfile())}>Back</Button></Link>
          <br />
        </div>
      </div>
    </div>
  );
}

export default Profile;
