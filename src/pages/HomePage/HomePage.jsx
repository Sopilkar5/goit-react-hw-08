import styles from './HomePage.module.css';

function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Contacts App</h1>
      <p className={styles.description}>
        Manage your contacts easily and securely.
      </p>
    </div>
  );
}

export default HomePage;