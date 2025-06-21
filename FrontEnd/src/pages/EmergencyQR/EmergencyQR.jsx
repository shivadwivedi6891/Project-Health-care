// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { getEmergencyQR } from '../../api/Axios';
// import './EmergencyQR.css';

// const EmergencyQR = () => {
//  const userId = localStorage.getItem('userId');
//   const navigate = useNavigate();
//   const [qrCode, setQrCode] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchQRCode = async () => {
//       try {
//         const imageUrl = await getEmergencyQR(userId);
//         setQrCode(imageUrl);

        
//       } catch (error) {
//         console.error('Error fetching QR code:', error);
//         setError('Failed to load QR code. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQRCode();
//   }, [userId]);

//   return (
//     <div className="qr-page">
//       <div className="container qr-container">
//         <motion.div 
//           className="qr-card"
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h2>Emergency QR Code</h2>
          
//           {loading ? (
//             <div className="loading-indicator">Loading QR code...</div>
//           ) : error ? (
//             <div className="error-message">{error}</div>
//           ) : (
//             <motion.div 
//               className="qr-content"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3, duration: 0.5 }}
//             >

//               {console.log("QR Code value:", qrCode)}

//               <div className="qr-image-container">
//                 <img src={qrCode} alt="Emergency QR Code" className="qr-image" />
//               </div>
              
//               <div className="qr-description">
//                 <p>Scan this QR code for emergency access to your medical information.</p>
//                 <p className="qr-note">This QR code allows emergency responders to access your critical medical information without requiring login credentials.</p>
//               </div>
              
//               <div className="qr-instructions">
//                 <h3>How to use</h3>
//                 <ol>
//                   <li>Save a screenshot of this QR code</li>
//                   <li>Share it with family members or caregivers</li>
//                   <li>Consider printing it to keep in your wallet</li>
//                 </ol>
//               </div>
//             </motion.div>
//           )}
          
//           <div className="qr-actions">
//             <button 
//               className="btn btn-primary"
//               onClick={() => navigate(`/dashboard/${userId}`)}
//             >
//               Back to Dashboard
//             </button>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default EmergencyQR;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getEmergencyQR } from '../../api/Axios';
import { useAuth } from '../../context/AuthContext'; // adjust if needed
import './EmergencyQR.css';

const EmergencyQR = () => {
  const { user } = useAuth();
  const userId = user?.userId;
  const navigate = useNavigate();

  const [qrCode, setQrCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }

    const fetchQRCode = async () => {
      try {
        const imageUrl = await getEmergencyQR(userId);
        setQrCode(imageUrl);
      } catch (error) {
        console.error('Error fetching QR code:', error);
        setError('Failed to load QR code. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchQRCode();
  }, [userId, navigate]);

  return (
    <div className="qr-page">
      <div className="container qr-container">
        <motion.div
          className="qr-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Emergency QR Code</h2>

          {loading ? (
            <div className="loading-indicator">Loading QR code...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <motion.div
              className="qr-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="qr-image-container">
                <img src={qrCode} alt="Emergency QR Code" className="qr-image" />
              </div>

              <div className="qr-description">
                <p>Scan this QR code for emergency access to your medical information.</p>
                <p className="qr-note">
                  This QR code allows emergency responders to access your critical medical information without requiring login credentials.
                </p>
              </div>

              <div className="qr-instructions">
                <h3>How to use</h3>
                <ol>
                  <li>Save a screenshot of this QR code</li>
                  <li>Share it with family members or caregivers</li>
                  <li>Consider printing it to keep in your wallet</li>
                </ol>
              </div>
            </motion.div>
          )}

          <div className="qr-actions">
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/dashboard/${userId}`)}
            >
              Back to Dashboard
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmergencyQR;
