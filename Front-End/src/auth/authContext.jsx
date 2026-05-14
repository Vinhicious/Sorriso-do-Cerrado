import React, { createContext, useState, useContext, useEffect } from 'react';

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = parseJwt(token);
      setUser(decodedUser);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const decodedUser = parseJwt(token);
    setUser(decodedUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.papel === 'admin'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  
  
}

export function useAuth() {
  return useContext(AuthContext);
}
