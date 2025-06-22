


import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; // 
import { useState,useEffect } from 'react';


import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import RegisterDoc from './pages/Register/RegisterDoc';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Profile/Profile';
import UploadMedicalReport from './pages/UploadMedicalReport/UploadMedicalReport';
import EmergencyQR from './pages/EmergencyQR/EmergencyQR';
import AdminAddHospital from './pages/AdminAddHospital/AdminAddHospital';
import About from './pages/About/About';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';


import './App.css';
import DocDashboard from './pages/Dashboard/DocDashboard';
import HospitalPage from './pages/Hospitals/HospitalPage';
import Doctor from './pages/Doctors/Doctor';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import AllUsers from './pages/Profile/AllUsers';
import AllDoctors from './pages/Profile/AllDoctors';

function App() {
  const { user, logout, authData } = useAuth(); // ✅ from context

    const [isDarkMode, setIsDarkMode] = useState(() => {
    
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  return (

  
    <Router>
      <div className="app-container">
        <Header isLoggedIn={!!user} onLogout={logout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/DocLogin" element={<DocLogin />} /> */}

            <Route path="/docDashboard" element={
              
              <ProtectedRoute>
              <DocDashboard/>
              </ProtectedRoute>
              
              
              } />
            <Route path="/adminDashboard" element={
              
              <ProtectedRoute>
              <AdminDashboard/>
              </ProtectedRoute>
              
              
              } />
            <Route path="/registerDoc" element={<RegisterDoc />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin/add-hospital" element={<AdminAddHospital />} />

            {/* Optional: Short route to auto-redirect using userId */}
            <Route
              path="/dashboard"
              element={
                authData?.id ? (
                  <Navigate to={`/dashboard/`} replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* ✅ Protected Routes */}
            <Route
              path="/dashboard/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/allUser/"
              element={
                <ProtectedRoute>
                  <AllUsers/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/allDoctors/"
              element={
                <ProtectedRoute>
                  <AllDoctors/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/docDashboard/:userId"
              element={
                <ProtectedRoute>
                  <DocDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/adminDashboard/:userId"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hospitals/"
              element={
                <ProtectedRoute>
                <HospitalPage/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctors/"
              element={
                <ProtectedRoute>
               <Doctor/>
                </ProtectedRoute>
              }
            />



            <Route
              path="/profile/"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload-medical-report/"
              element={
                <ProtectedRoute>
                  <UploadMedicalReport />
                </ProtectedRoute>
              }
            />
            <Route
              path="/emergency-qr/"
              element={
                <ProtectedRoute>
                  <EmergencyQR />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
   
  );
}

export default App;
