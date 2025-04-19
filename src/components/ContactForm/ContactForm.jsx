import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';
import * as Yup from 'yup';
import { Toaster, toast } from 'react-hot-toast';
import styles from './ContactForm.module.css';

function ContactForm() {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Must be at least 3 characters')
      .required('Required'),
    number: Yup.string()
      .matches(
        /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
        'Invalid phone number'
      )
      .required('Required'),
  });

  return (
    <>
      <Toaster />
      <Formik
        initialValues={{ name: '', number: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          dispatch(addContact(values))
            .unwrap()
            .then(() => toast.success('Contact added!'));
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
            Number
            <Field name="number" type="text" className={styles.input} />
            <ErrorMessage
              name="number"
              component="div"
              className={styles.error}
            />
          </label>
          <button type="submit" className={styles.submitButton}>
            Add contact
          </button>
        </Form>
      </Formik>
    </>
  );
}

export default ContactForm;