import React from 'react';
import { useNavigate } from 'react-router-dom';
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
    <form onSubmit={submitAction}>
      Email
      <input type="email" name="email" />
      <br />
      Password
      <input type="password" name="password" />
      <br />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
