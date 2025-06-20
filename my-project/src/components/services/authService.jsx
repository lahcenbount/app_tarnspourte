// src/contexts/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';

// Crée le contexte
const AuthContext = createContext();

// Fournisseur de contexte
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Exemple de récupération utilisateur depuis le localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  // Méthodes de login / logout
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useAuth = () => useContext(AuthContext);
