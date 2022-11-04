import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import YupPassword from 'yup-password';
import * as Yup from 'yup';
import http from '../helpers/http';

YupPassword(Yup);

function Login() {
  const navigate = useNavigate();

  const basicAuthSchema = Yup.object().shape({
    email: Yup.string().email('Email is not valid').required(),
    password: Yup.string().password().required(),
  });

  const submitAction = async (values) => {
    try {
      const form = new URLSearchParams(values);
      const { data } = await http().post('/auth/login', form.toString());
      window.localStorage.setItem('token', data.results.token);
      navigate('/');
    } catch (err) {
      // eslint-disable-next-line no-alert
      window.alert(err.response.data.message);
    }
  };
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={basicAuthSchema}
        onSubmit={submitAction}
      >
        {({ errors, touched }) => (
          <Form className="px-1 py-2">
            email:
            <Field className="px-1 py-2" placeholder="  enter you email" type="email" name="email" />
            <br />
            {errors.email && touched.email ? (
              <div>{errors.email}</div>
            ) : null}
            <br />
            password:
            <Field className="px-1 py-2" placeholder="  enter you password" type="password" name="password" />
            <br />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <br />
            <button className="rounded bg-green-600 " type="submit"> Login </button>
          </Form>
        )}
      </Formik>
      <div>
        <Link to="/forgot-password"><button className='peer-hover:' type="button">Forgot Password</button></Link>
      </div>
      <div>
        <Link to="/register"><button type="button">Register</button></Link>
      </div>
    </>
  );
}

export default Login;
