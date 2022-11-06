import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import YupPassword from 'yup-password';
import * as Yup from 'yup';
import http from '../helpers/http';
import Button from '../components/Button';

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
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={basicAuthSchema}
      onSubmit={submitAction}
    >
      {({ errors, touched }) => (
        <div className='className="card w-96 bg-base-100 shadow-xl"'>
          <div className="card-body">
            <div className="card-actions justify-end">
              <h className="card-tittle inline-block rounded-md font-sans text-3xl bg-slate-900 text-white">Please login!</h>
              <br />
              <br />
              <Form className="px-1 py-1 border-neutral-900">
                email:
                <Field className="px-1 py-1 border-gray-1000 outline-double" placeholder="  enter you email" type="email" name="email" />
                <br />
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}
                <br />
                password:
                <Field className="px-1 py-1 border-neutral-900 outline-double" placeholder="  enter you password" type="password" name="password" />
                <br />
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
                <br />
                <div>
                  <Button className="rounded bg-green-1000 " type="submit"> Login </Button>
                  <Link to="/forgot-password"><Button type="button">Forgot Password</Button></Link>
                  <Link to="/register"><Button type="button">Register</Button></Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default Login;
