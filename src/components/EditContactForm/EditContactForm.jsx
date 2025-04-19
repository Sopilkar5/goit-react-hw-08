import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { updateContact } from '../../redux/contacts/operations';
import toast from 'react-hot-toast';
import styles from './EditContactForm.module.css';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be at most 50 characters')
    .required('Name is required'),
  number: Yup.string()
    .min(3, 'Number must be at least 3 characters')
    .max(50, 'Number must be at most 50 characters')
    .required('Number is required'),
});

export default function EditContactForm({ contact, onClose }) {
  const dispatch = useDispatch();

  const initialValues = {
    name: contact.name,
    number: contact.number,
  };

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(updateContact({ id: contact.id, ...values }))
      .unwrap()
      .then(() => {
        toast.success('Contact updated successfully!');
        onClose();
      })
      .catch(() => {
        toast.error('Failed to update contact.');
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <Field
              type="text"
              name="name"
              id="name"
              className={styles.input}
            />
            <ErrorMessage name="name" component="div" className={styles.error} />
          </div>
          <div className={styles.field}>
            <label htmlFor="number" className={styles.label}>
              Number
            </label>
            <Field
              type="text"
              name="number"
              id="number"
              className={styles.input}
            />
            <ErrorMessage name="number" component="div" className={styles.error} />
          </div>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            Save
          </button>
        </Form>
      )}
    </Formik>
  );
}