




// AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [doctor,setDoctor] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.userId;
        const doctorId = decoded.doctorId;
        const role = decoded.role || 'User';
        setUser({ userId, role, token });


      } catch (err) {
        console.error('Invalid token');
        setUser(null);
      }
    }
  }, []);

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
    const token = data.token;
    const role = data.role;
    const id = data.id;

    localStorage.setItem('token', token);

    setUser({ userId: id, role, token });
    // setDoctor({doctorId: id, role, token});

    

    return { userId: id, role };
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout  }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
