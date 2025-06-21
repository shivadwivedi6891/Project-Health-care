import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // ✅ Adjust path as needed

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); 

  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }

  return children;
};

export default ProtectedRoute;

