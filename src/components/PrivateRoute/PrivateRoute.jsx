import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

function PrivateRoute({ component: Component }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? Component : <Navigate to="/login" />;
}

export default PrivateRoute;