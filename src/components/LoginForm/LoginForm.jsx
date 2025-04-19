import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';
import * as Yup from 'yup';
import styles from './LoginForm.module.css';

function LoginForm() {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    password: Yup.string().required('Required'),
  });

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        dispatch(login(values));
        resetForm();
      }}
    >
      <Form className={styles.form}>
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
          <Field
            name="password"
            type="password"
            className={styles.input}
          />
          <ErrorMessage
            name="password"
            component="div"
            className={styles.error}
          />
        </label>
        <button type="submit" className={styles.submitButton}>
          Login
        </button>
      </Form>
    </Formik>
  );
}

export default LoginForm;