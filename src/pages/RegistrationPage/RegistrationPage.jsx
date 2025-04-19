import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import styles from './RegistrationPage.module.css';

function RegistrationPage() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Register</h2>
      <RegistrationForm />
    </div>
  );
}

export default RegistrationPage;