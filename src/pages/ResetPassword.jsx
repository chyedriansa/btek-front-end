import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik'; import YupPassword from 'yup-password';
import * as Yup from 'yup';
import http from '../helpers/http';
import Button from '../components/Button';

YupPassword(Yup);

function ResetPassword() {
  const navigate = useNavigate();

  const basicAuthSchema = Yup.object().shape({
    email: Yup.string().email('Email is not valid').required(),
    code: Yup.number().min(6).required(),
    newPassword: Yup.string().password().required(),
  });

  const submitAction = async (values) => {
    try {
      const form = new URLSearchParams(values);
      await http().post('/auth/reset-password', form.toString());
      navigate('/login');
    } catch (err) {
      // eslint-disable-next-line no-alert
      window.alert(err.response.data.message);
    }
  };
  return (
    <Formik
      initialValues={{
        email: '',
        code: '',
        newPassword: '',
        confirmPassword: '',
      }}
      validationSchema={basicAuthSchema}
      onSubmit={submitAction}
    >
      {({ errors, touched }) => (
        <div className="grid grid-cols-6 gap-4 ">
          <div className=" h-screen flex justify-center items-center col-start-2 col-span-4 card w-96 bg-base-100 shadow-xl outline-double">
            <figure><img className="rounded-3xl" src="./src/assets/pic/react.png" alt="Shoes" /></figure>
            <div className="card-body bg-slate-800">
              <div className="card-actions justify-end">
                <Form>
                  Secret Code :
                  <Field className="px-1 py-1 input input-bordered w-full max-w-xs" type="text" name="code" />
                  <br />
                  {errors.code && touched.code ? (
                    <div>{errors.code}</div>
                  ) : null}
                  <br />
                  Email :
                  <Field className="px-1 py-1 input input-bordered w-full max-w-xs" type="text" name="email" />
                  <br />
                  {errors.email && touched.email ? (
                    <div>{errors.email}</div>
                  ) : null}
                  <br />
                  New Password :
                  <Field className="px-1 py-1 input input-bordered w-full max-w-xs" type="password" name="newPassword" />
                  <br />
                  {errors.newPassword && touched.newPassword ? (
                    <div>{errors.newPassword}</div>
                  ) : null}
                  <br />
                  Confirm Password :
                  <Field className="px-1 py-1 input input-bordered w-full max-w-xs" type="password" name="confirmPassword" />
                  <br />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <div>{errors.confirmPassword}</div>
                  ) : null}
                  <br />
                  <Button type="submit">Send</Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default ResetPassword;
