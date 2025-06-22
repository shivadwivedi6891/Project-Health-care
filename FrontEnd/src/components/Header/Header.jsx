

import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Header.css';
import './Navbar.css';
import { useState,useEffect } from 'react';
import { useAuth } from '../../context/AuthContext'; 

const Header = () => {
  const navigate = useNavigate();
  const { authData, logout } = useAuth(); 
 

    const [darkMode, setDarkMode] = useState(() => {
    // Get from localStorage on initial render
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    // Apply/remove dark class to <body>
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);



    const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const handleLogout = () => {
    logout(); 
    navigate('/login');
  };

  const isLoggedIn = !!authData;

  return (
     <header className="header">
      <div className="container header-container">
        <motion.div className="logo-container" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link to="/">
            <img src="/logo.png" alt="Health Record System" className="logo" />
            <span className="app-name">Health Record System</span>
          </Link>
        </motion.div>
        
        <motion.nav className="navigation" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          {isLoggedIn ? (
            <ul className="nav-links">
              <li>
               <Link to={
  authData?.role === "Doctor"
    ? `/docdashboard/${authData.id}`
    : authData?.role === "Admin"
    ? `/admindashboard`
    : `/dashboard`
}>
  Dashboard
</Link>

              </li>
              <li>
                <button onClick={toggleDarkMode} className="dark-toggle-btn">
                  {darkMode ? "☀ Light" : "🌙 Dark"}
                </button>
              </li>
              <li>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </li>
            </ul>
          ) : (
            <nav className="navbar">
              <ul className="navbar-list">
                <li><Link to="/home">Home</Link></li>
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
                <li><Link to="/login">Admin</Link></li>
                <li><Link to="/about">About</Link></li>
              </ul>
            </nav>
          )}
        </motion.nav>
      </div>
    </header>
  );
};

export default Header;
