import { useContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';
import {
  Navigate,
  useLocation,
} from 'react-router-dom';

/**
 * shamelessly stolen from https://www.robinwieruch.de/react-router-authentication/
 */
const ProtectedRoute = ({ children }) => {
  const ctx = useContext(UserProfileContext);
  console.log({ ctx })
  const token = ctx.token
  const location = useLocation();
  console.log('looking for token', token)
  if (!token) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute
