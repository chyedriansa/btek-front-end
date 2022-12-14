import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import YupPassword from 'yup-password';
import * as Yup from 'yup';
// eslint-disable-next-line no-unused-vars
import http from '../helpers/http';
import Button from '../components/Button';
import * as authAction from '../redux/asyncActions/auth';
import * as authReset from '../redux/reducers/auth';

YupPassword(Yup);

function ResetPassword() {
  const navigate = useNavigate();

  const basicAuthSchema = Yup.object().shape({
    email: Yup.string().email('Email is not valid').required(),
    code: Yup.number().min(6).required(),
    newPassword: Yup.string().password().required(),
  });

  const dispatch = useDispatch();
  const store = useSelector((state) => state.auth);

  const submitAction = async (values) => {
    try {
      dispatch(authAction.resetPassword(values));
    } catch (err) {
      // eslint-disable-next-line no-alert
      window.alert(err.response.data.message);
    }
  };

  React.useEffect(() => {
    if (store.user.email) {
      dispatch(authReset.handleReset());
      navigate('/login');
    }
  }, [store]);

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
            <figure><img className="rounded-3xl" src="https://res.cloudinary.com/dvtniqszt/image/upload/v1667914841/assets/logo-reactjs-removebg-preview_rzzlu6.png" alt="Shoes" /></figure>
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
