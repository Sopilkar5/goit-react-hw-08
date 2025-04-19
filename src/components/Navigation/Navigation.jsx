import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

function Navigation() {
  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={styles.link}>
        Home
      </NavLink>
      <NavLink to="/contacts" className={styles.link}>
        Contacts
      </NavLink>
    </nav>
  );
}

export default Navigation;