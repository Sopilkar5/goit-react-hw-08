import { useDispatch } from 'react-redux';
import { register, refreshUser } from '../../redux/auth/operations'; 
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Toaster, toast } from 'react-hot-toast';
import styles from './RegistrationForm.module.css';

function RegistrationForm() {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Email must include a valid domain (e.g., example.com)'
      )
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  return (
    <>
      <Toaster />
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          dispatch(register(values))
            .unwrap()
            .then(() => {
              toast.success('Registered successfully!');
              dispatch(refreshUser()); 
            })
            .catch((error) => {
              toast.error(error || 'Registration failed!');
            });
          resetForm();
        }}
      >
        <Form className={styles.form}>
          <label className={styles.label}>
            Name
            <Field name="name" type="text" className={styles.input} />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.error}
            />
          </label>
          <label className={styles.label}>
            Email
            <Field name="email" type="email" className={styles.input} />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.error}
            />
          </label>
          <label className={styles.label}>
            Password
            <Field name="password" type="password" className={styles.input} />
            <ErrorMessage
              name="password"
              component="div"
              className={styles.error}
            />
          </label>
          <button type="submit" className={styles.submitButton}>
            Register
          </button>
        </Form>
      </Formik>
    </>
  );
}

export default RegistrationForm;