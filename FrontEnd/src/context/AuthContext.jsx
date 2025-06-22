




// AuthContext.js
import { Navigate } from 'react-router-dom';
import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(()=>{



    const token = localStorage.getItem('token');
     if (!token  ) {
    return <Navigate to="/login" replace />;
  }

   
      const decoded = jwtDecode(token);
      return {
        id : decoded['id'],
        role : decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
        token: token
      }
  }
  );
 

  const login = async (credentials) => {
    const res = await fetch('http://localhost:5088/api/Auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || 'Login failed');
    }


    const data = await res.json(); // { token, role, id }
    console.log("Raw login response from backend:", data);
    

    const{token,id,role}= data;

    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    setAuthData({
       id : decoded['id'],
       role :decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
        token: token
     });
   

    

    return {  id, role };
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthData(null);
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout  }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
