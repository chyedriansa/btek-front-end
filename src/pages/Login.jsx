/* eslint-disable react/no-unescaped-entities */
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import YupPassword from 'yup-password';
import * as Yup from 'yup';
// eslint-disable-next-line no-unused-vars
import http from '../helpers/http';
import Button from '../components/Button';
import * as authAction from '../redux/asyncActions/auth';

YupPassword(Yup);

function Login() {
  const navigate = useNavigate();

  const basicAuthSchema = Yup.object().shape({
    email: Yup.string().email('Email is not valid').required(),
    password: Yup.string().password().required(),
  });

  const dispatch = useDispatch();
  const store = useSelector((state) => state.auth);

  const submitAction = async (values) => {
    try {
      dispatch(authAction.login(values));
    } catch (err) {
      // eslint-disable-next-line no-alert
      window.alert(err.response.data.message);
    }
  };

  React.useEffect(() => {
    if (store.user.token) {
      window.localStorage.setItem('token', store.user.token);
      navigate('/');
    }
  }, [store]);
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
        <div className="flex flex-col items-center justify-items-center h-full">
          <div className="center flex h-screen justify-center items-center col-start-2 col-span-4 card w-96 bg-base-100 shadow-xl outline-double">
            <figure><img className="rounded-3xl" src="https://res.cloudinary.com/dvtniqszt/image/upload/v1667914841/assets/logo-reactjs-removebg-preview_rzzlu6.png" alt="Shoes" /></figure>
            <div className="text-center card-body bg-slate-800">
              <h className="text-center text-white font-semibold">B-TEK LABS</h>
              <div className="rounded-2xl card-actions justify-end">
                <br />
                <br />
                <Form className="px-1 py-1 border-neutral-900 jus">
                  email:
                  <Field className="px-1 py-1 input input-bordered w-full max-w-xs" placeholder="  enter you email" type="email" name="email" />
                  <br />
                  {errors.email && touched.email ? (
                    <div>{errors.email}</div>
                  ) : null}
                  <br />
                  password:
                  <Field className="px-1 py-1 input input-bordered w-full max-w-xs" placeholder="  enter you password" type="password" name="password" />
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
                  <p>
                    {' '}
                    Don't have an account?, you must
                    <Link className="textarea-warning link text-sm hover:text-primary" to="/register"> Register</Link>
                    <p>first</p>
                  </p>
                </Form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default Login;
