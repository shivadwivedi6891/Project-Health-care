import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="container about-container">
        <motion.div 
          className="about-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>About Health Record System</h2>
          
          <div className="about-content">
            <p>
              The Health Record System is a secure platform designed to help individuals store, manage, and access their health records in one central location. Our mission is to empower patients by giving them control over their health information.
            </p>
            
            <h3>Our Features</h3>
            <ul className="feature-list">
              <li>
                <strong>Secure Storage</strong>
                <p>Keep all your medical records in one secure place with industry-standard encryption.</p>
              </li>
              <li>
                <strong>Emergency Access</strong>
                <p>Generate QR codes that allow emergency medical professionals to access vital information when needed.</p>
              </li>
              <li>
                <strong>Easy Management</strong>
                <p>Upload and organize your medical reports, prescriptions, and test results with ease.</p>
              </li>
              <li>
                <strong>Profile Management</strong>
                <p>Keep your personal health information up-to-date and accessible.</p>
              </li>
            </ul>
            
            <h3>Privacy & Security</h3>
            <p>
              We take your privacy seriously. Your health information is encrypted and stored securely. You control who can access your information and when.
            </p>
            
            <h3>Contact Us</h3>
            <p>
              If you have any questions or feedback, please contact us at:
              <br />
              <a href="mailto:support@healthrecordsystem.com">support@healthrecordsystem.com</a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;