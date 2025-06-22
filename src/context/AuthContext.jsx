import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? { token } : null;
  });

  const login = async (email, password) => {
    const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    setUser({ token: res.data.token }); // ✅ wrap in object
  };

  const signup = async (name, email, password) => {
    const res = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
    localStorage.setItem('token', res.data.token);
    setUser({ token: res.data.token }); // ✅ wrap in object
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
