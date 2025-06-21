import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Header.css';
import { useState } from 'react';
import './Navbar.css';


const Header = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
   const [isUserOpen, setIsUserOpen] = useState(false);
  const [isDocOpen, setIsDocOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container header-container">
        <motion.div 
          className="logo-container"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/">
            <img src="/logo.png" alt="Health Record System" className="logo" />
            <span className="app-name">Health Record System</span>
          </Link>
        </motion.div>
        
        <motion.nav 
          className="navigation"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {isLoggedIn ? (
            <ul className="nav-links">
              <li>
                <Link to={`/dashboard/${localStorage.getItem('userId')}`}>Dashboard</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </li>
            </ul>
          ) : (
            <ul className="nav-links">
             
              {/* <li>
                <Link to="/login">Login</Link>
              </li> */}
              {/* <li  className = "dropDown">
                 <div
          className="relative"
          onMouseEnter={() => setIsUserOpen(true)}
          onMouseLeave={() => setIsUserOpen(false)}
        >
          <button className="hover:underline">User</button>
          {isUserOpen && (
            <div className="User-dropDownbtn">
              <Link to="/login" className="Drop-login">Login</Link>
              <Link to="/register" className="Drop-register">Register</Link>
            </div>
          )}
        </div>
              </li> */}

               {/* <li className="dropdown">
          <span className="dropbtn">User</span>
          <div className="dropdown-content">
            <Link to="/login">Login</Link>
            <Link to="/registerUser">Register</Link>
          </div>
        </li> */}


          <nav className="navbar">
      <ul className="navbar-list">

         <li>
                <Link to="/home">Home</Link>
              </li>
       

        <li className="dropdown">
          <span className="dropbtn">User</span>
          <div className="dropdown-content">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </li>

        <li className="dropdown">
          <span className="dropbtn">Doctor</span>
          <div className="dropdown-content">
            <Link to="/login">Login</Link>
            <Link to="/registerDoc">Register</Link>
          </div>
        </li>

        <li><Link to="/admin/add-hospital">Admin</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>



              {/* <li>
                <Link to="/register">RegisterUser</Link>
              </li> */}
              <li>
                {/* <Link to="/DocLogin">DoctorLogin</Link>
              </li>

              <li>
                <Link to="/registerDoc">RegisterDoc</Link>
              </li>
              <li>
                <Link to="/admin/add-hospital">Admin</Link>
              </li>
              <li>
                <Link to="/about">About</Link> */}
              </li>
            </ul>
          )}
        </motion.nav>
      </div>
    </header>
  );
};

export default Header;