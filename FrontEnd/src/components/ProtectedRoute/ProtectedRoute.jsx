import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { authData } = useAuth();


   
  const token = localStorage.getItem('token');
  if (!token  ) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
