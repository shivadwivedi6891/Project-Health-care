import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../../context/AuthContext'; // adjust path as needed
import './Dashboard.css';

const Dashboard = () => {
  const { user: authUser, setUser } = useAuth();
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const extractedUserId = decoded.id ||
        decoded.userId ||
        decoded[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
        ];
      const exp = decoded.exp * 1000;

      if (Date.now() >= exp) {
        localStorage.removeItem('token');
        navigate('/login', { replace: true });
        return;
      }

      setUser({ userId: extractedUserId }); // sync context user

      // if (extractedUserId.toString() !== userId.toString()) {
      if (!extractedUserId || !userId || extractedUserId.toString() !== userId.toString()){
        navigate(`/dashboard/${extractedUserId}`, { replace: true });
        return;
      }

      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5088/api/user/profile/${extractedUserId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUserData(response.data);
          setError('');
        } catch (err) {
          console.error('Error fetching user data:', err);
          if (retryCount < 2) {
            setTimeout(() => {
              setRetryCount((prev) => prev + 1);
            }, 1000);
          } else {
            setError('Failed to load user data. Please log in again.');
            localStorage.removeItem('token');
            navigate('/login', { replace: true });
          }
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    } catch (err) {
      console.error('Invalid token:', err);
      localStorage.removeItem('token');
      navigate('/login', { replace: true });
    }
  }, [userId, retryCount, navigate, setUser]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard-page">
      <div className="dashboard-gradient">
        <div className="container dashboard-container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="welcome-section"
          >
            <h1>Welcome, {user?.name || 'User'}</h1>
            <p>Manage your health information securely</p>
          </motion.div>

          <motion.div
            className="dashboard-options"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="option-card"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
              }}
            >
              <h2>Emergency QR</h2>
              <p>Access your emergency information via QR code</p>
              <Link to={`/emergency-qr/${userId}`} className="btn-primary">
                View QR Code
              </Link>
            </motion.div>

            <motion.div
              className="option-card"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
              }}
            >
              <h2>Profile</h2>
              <p>View and update your personal information</p>
              <Link to={`/profile/${userId}`} className="btn-primary">
                Manage Profile
              </Link>
            </motion.div>

            <motion.div
              className="option-card"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
              }}
            >
              <h2>Medical Reports</h2>
              <p>Upload and manage your medical reports</p>
              <Link to={`/upload-medical-report/${userId}`} className="btn-primary">
                Manage Reports
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;






//------------------------------------/
