/* eslint-disable no-alert */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
// eslint-disable-next-line no-unused-vars
import http from '../helpers/http';
import Button from '../components/Button';
import * as authAction from '../redux/asyncActions/auth';
import * as authReset from '../redux/reducers/auth';

function ForgotPassword() {
  const navigate = useNavigate();

  const basicAuthSchema = Yup.object().shape({
    email: Yup.string().email('Email is not valid').required(),
  });

  const dispatch = useDispatch();
  const store = useSelector((state) => state.auth);

  const submitAction = async (values) => {
    try {
      dispatch(authAction.forgotPassword(values));
    } catch (err) {
      window.alert(err.response.data.message);
    }
  };

  React.useEffect(() => {
    if (store.user.email) {
      dispatch(authReset.handleReset());
      navigate('/reset-password');
    }
  }, [store]);

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={basicAuthSchema}
      onSubmit={submitAction}
    >
      {({ errors, touched }) => (
        <Form>
          Email :
          <Field className="px-1 py-1 input input-bordered w-full max-w-xs" type="text" name="email" />
          <br />
          {errors.email && touched.email ? (
            <div>{errors.email}</div>
          ) : null}
          <br />
          <Button type="submit">Send</Button>
        </Form>
      )}
    </Formik>
  );
}
export default ForgotPassword;
