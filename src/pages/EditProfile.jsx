import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import YupPassword from 'yup-password';
import * as Yup from 'yup';
import * as profileAction from '../redux/asyncActions/profile';
import Button from '../components/Button';

YupPassword(Yup);

function EditProfile() {
  const navigate = useNavigate();

  const editProfileSchema = Yup.object().shape({
    fullName: Yup.string().required(),
    birthDate: Yup.string().required(),
    picture: Yup.mixed().nullable(),
  });

  const userProfile = useSelector((state) => state.profile.user);
  const dispatch = useDispatch();

  const [file, setFile] = React.useState(null);
  const submitAction = (e) => {
    const token = window.localStorage.getItem('token');
    const data = {
      fullName: e.fullName,
      birthDate: e.birthDate,
      picture: file,
    };

    dispatch(profileAction.editData({ token, data }));
    navigate('/profile');
  };

  React.useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (!userProfile?.fullName) {
      dispatch(profileAction.getDataUser({ token }));
    }
  }, []);
  return (
    <>
      {userProfile?.picture && <img style={{ width: '240px', height: '100%' }} src={`${userProfile?.picture}`} alt={userProfile?.picture} />}
      <Formik
        initialValues={{
          fullName: '',
          birthDate: '',
        }}
        validationSchema={editProfileSchema}
        onSubmit={submitAction}
      >
        {({ errors, touched }) => (
          <Form>
            Full Name:
            <Field type="text" name="fullName" />
            {errors.fullName && touched.fullName ? (
              <div className="text-red-400">{errors.fullName}</div>
            ) : null}
            <br />
            <br />
            Birth Date:
            <Field type="date" name="birthDate" placeholder="Birth date" />
            {errors.birthDate && touched.birthDate ? (
              <div>{errors.birthDate}</div>
            ) : null}
            <br />
            <br />
            Picture
            <input type="file" onChange={(e) => setFile(e.target.files[0])} name="picture" />
            {errors.picture && touched.picture ? (
              <div>{errors.picture}</div>
            ) : null}
            <br />
            <br />
            <Button type="submit">save</Button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default EditProfile;
