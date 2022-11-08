import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import http from '../helpers/http';

function Register() {
  const navigate = useNavigate();
  const submitAction = async (e) => {
    try {
      e.preventDefault();
      const form = {
        email: e.target.email.value,
        password: e.target.password.value,
      };
      const encoded = new URLSearchParams(form);
      const { data } = await http().post('/auth/register', encoded.toString());
      window.localStorage.setItem('token', data.results.token);
      navigate('/');
    } catch (err) {
      // eslint-disable-next-line no-alert
      window.alert(err.response.data.message);
    }
  };
  return (
    <div className="grid grid-cols-6 gap-4 ">
      <div className=" h-screen flex justify-center items-center col-start-2 col-span-4 card w-96 bg-base-100 shadow-xl outline-double">
        <figure><img className="rounded-3xl" src="https://o.remove.bg/downloads/dd281772-08a2-4916-ba8c-260e1f31bc70/logo-reactjs-removebg-preview.png" alt="Shoes" /></figure>
        <div className="card-body bg-slate-800">
          <div className="card-actions justify-end">
            <form onSubmit={submitAction}>
              Email :
              <input className="px-1 py-1 input input-bordered w-full max-w-xs" type="email" name="email" />
              <br />
              Password :
              <input className="px-1 py-1 input input-bordered w-full max-w-xs" type="password" name="password" />
              <br />
              Confirm Password :
              <input className="px-1 py-1 input input-bordered w-full max-w-xs" type="password" name="confirmPassword" />
              <br />
              <br />
              <Button className="btn btn-primary" type="submit">Register</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
