import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import * as Yup from 'yup';
import styles from './RegistrationForm.module.css';

function RegistrationForm() {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    password: Yup.string()
      .min(6, 'Must be at least 6 characters')
      .required('Required'),
  });

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        dispatch(register(values));
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
          Register
        </button>
      </Form>
    </Formik>
  );
}

export default RegistrationForm;