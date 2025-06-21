import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Home.css';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  const linkVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: (i) => ({ 
      x: 0, 
      opacity: 1, 
      transition: { 
        delay: 0.3 + (i * 0.1),
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="home-page"  >
      <div className="home-gradient">
        <div className="container home-container" >
          <motion.div 
            className="home-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="home-logo"
              variants={itemVariants}
            >
              <img src="/logo.png" alt="Health Record System" />
            </motion.div>
            
            <motion.h1 
              className="home-title"
              variants={itemVariants}
            >
              Health Record System
            </motion.h1>
            
            <motion.p 
              className="home-tagline"
              variants={itemVariants}
            >
              Your health information, secure and accessible anytime, anywhere.
            </motion.p>
            
            <motion.div 
              className="home-cta"
              variants={itemVariants}
            >
              <Link to="/register" className="btn btn-primary">Get Started</Link>
            </motion.div>
            
            <motion.div 
              className="home-features"
              variants={containerVariants}
            >
              <motion.div 
                className="feature-card"
                variants={itemVariants}
              >
                <h3>Secure Storage</h3>
                <p>Keep your medical records safe and secure in one place</p>
              </motion.div>
              
              <motion.div 
                className="feature-card"
                variants={itemVariants}
              >
                <h3>Easy Access</h3>
                <p>Access your health information anytime, anywhere</p>
              </motion.div>
              
              <motion.div 
                className="feature-card"
                variants={itemVariants}
              >
                <h3>Emergency Ready</h3>
                <p>Quick access to critical information in emergencies</p>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="home-navigation"
            >
              <ul>
                <motion.li custom={0} variants={linkVariants} initial="hidden" animate="visible">
                  <Link to="/login">Login</Link>
                </motion.li>
                <motion.li custom={1} variants={linkVariants} initial="hidden" animate="visible">
                  <Link to="/register">Register</Link>
                </motion.li>
                <motion.li custom={2} variants={linkVariants} initial="hidden" animate="visible">
                  <Link to="/admin/add-hospital">Admin</Link>
                </motion.li>
                <motion.li custom={3} variants={linkVariants} initial="hidden" animate="visible">
                  <Link to="/about">About</Link>
                </motion.li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;