import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
import styles from './UserMenu.module.css';

function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div className={styles.userMenu}>
      <p className={styles.welcome}>Welcome, {user.name}</p>
      <button
        className={styles.logoutButton}
        onClick={() => dispatch(logout())}
      >
        Logout
      </button>
    </div>
  );
}

export default UserMenu;