// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import Header from './components/Header/Header';
// import Footer from './components/Footer/Footer';
// import Home from './pages/Home/Home';
// import Login from './pages/Login/Login';
// import Register from './pages/Register/Register';
// import RegisterDoc from './pages/Register/RegisterDoc';
// import Dashboard from './pages/Dashboard/Dashboard';
// import Profile from './pages/Profile/Profile';
// import UploadMedicalReport from './pages/UploadMedicalReport/UploadMedicalReport';
// import EmergencyQR from './pages/EmergencyQR/EmergencyQR';
// import AdminAddHospital from './pages/AdminAddHospital/AdminAddHospital';
// import About from './pages/About/About';
// import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
// import './App.css';
// import DocLogin from './pages/Login/DocLogin';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const userId = localStorage.getItem('token');
//     setIsLoggedIn(!!userId);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setIsLoggedIn(false);
//   };

//   return (

    
//     <Router>
//       <div className="app-container">
//         <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
//         <main className="main-content">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/home" element={<Home />} />
//             <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/DocLogin" element={<DocLogin/>} />
//             <Route path="/registerDoc" element={<RegisterDoc />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/admin/add-hospital" element={<AdminAddHospital />} />
            
//             <Route
//               path="/dashboard/:userId"
//               element={
//                <ProtectedRoute isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
//       <Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
//     </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/profile/:userId"
//               element={
//                 <ProtectedRoute>
//                   <Profile />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/upload-medical-report/:userId"
//               element={
//                 <ProtectedRoute>
//                   <UploadMedicalReport />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/emergency-qr/:userId"
//               element={
//                 <ProtectedRoute>
//                   <EmergencyQR />
//                 </ProtectedRoute>
//               }
//             />
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;




import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; // 

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

function App() {
  const { user, logout } = useAuth(); // ✅ from context

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
            <Route path="/registerDoc" element={<RegisterDoc />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin/add-hospital" element={<AdminAddHospital />} />

            {/* Optional: Short route to auto-redirect using userId */}
            <Route
              path="/dashboard"
              element={
                user?.userId ? (
                  <Navigate to={`/dashboard/${user.userId}`} replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* ✅ Protected Routes */}
            <Route
              path="/dashboard/:userId"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:userId"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload-medical-report/:userId"
              element={
                <ProtectedRoute>
                  <UploadMedicalReport />
                </ProtectedRoute>
              }
            />
            <Route
              path="/emergency-qr/:userId"
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
