

import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { authData } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("id is here "+ authData?.id)
        const response = await axios.get(
          `http://localhost:5088/api/user/GetProfile/`,
          {
            headers: {
              Authorization: `Bearer ${authData?.token}`,
            },
          }
        );
        console.log("Fetched User:", response);
        setUserData(response.data);
        setError('');
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(err);
      }
    };
      fetchUserData();
  }, [authData?.id]);

    


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



if (error) {
  return <div className="error">{error}</div>;
}


  return (
    <div className="dashboard-page">
      
      {console.log(authData.id)}
      <div className="dashboard-gradient">
        <div className="container dashboard-container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="welcome-section"
          >
            <h1>Welcome, {userData?.name || 'User'}</h1>
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
              <Link to={`/emergency-qr/`} className="btn-primary">
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
              <Link to={`/profile/`} className="btn-primary">
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
              <Link to={`/upload-medical-report/`} className="btn-primary">
                Manage Reports
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
              <h2>Hospital</h2>
              <p>Get Nearby Hospital Details</p>
              <Link to={`/hospitals/`} className="btn-primary">
                Get Hospital
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
              <h2>Doctors</h2>
              <p>See Available Doctors</p>
              <Link to={`/doctors/`} className="btn-primary">
                Get Doctors
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
