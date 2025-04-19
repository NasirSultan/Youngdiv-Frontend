// components/Sitting.js
import React, { createContext, useContext, useEffect, useState } from 'react';

// Create context
const ThemeContext = createContext();

export const Sitting = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light';
    setTheme(saved);
    document.documentElement.setAttribute('data-bs-theme', saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use in any component
export const useTheme = () => useContext(ThemeContext);

// Optional UI for toggle (can be used separately)
export const SittingToggleUI = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="container py-4">
      <h3>Toggle Theme</h3>
      <button className="btn btn-primary" onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
};
