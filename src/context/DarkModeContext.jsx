import React from 'react';
import { useContext } from 'react';
import { useState, createContext } from 'react';

const DarkModeContext = createContext();
document.documentElement.classList.add('dark');

export function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export const useDarkMode = () => useContext(DarkModeContext);
