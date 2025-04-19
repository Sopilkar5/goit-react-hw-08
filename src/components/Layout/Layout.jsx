import { Outlet } from 'react-router-dom';
import AppBar from '../AppBar/AppBar';
import styles from './Layout.module.css';

function Layout() {
  return (
    <div className={styles.container}>
      <AppBar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;