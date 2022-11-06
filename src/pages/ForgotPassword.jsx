import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import http from '../helpers/http';
import Button from '../components/Button';

function ForgotPassword() {
  const navigate = useNavigate();

  const basicAuthSchema = Yup.object().shape({
    email: Yup.string().email('Email is not valid').required(),
  });

  const submitAction = async (values) => {
    try {
      const form = new URLSearchParams(values);
      await http().post('/auth/forgot-password', form.toString());
      navigate('/reset-password');
    } catch (err) {
      // eslint-disable-next-line no-alert
      window.alert(err.response.data.message);
    }
  };
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
          <Field className="outline-double" type="text" name="email" />
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
