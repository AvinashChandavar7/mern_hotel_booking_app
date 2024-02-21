/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ThemeContextProps {
  mode: string;
  setMode: (newMode: string) => void;
}

export const ThemeContext = createContext<ThemeContextProps | null>(null);

interface ThemeContextProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<string>(
    () => localStorage.getItem('theme') || 'light'
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark');
  }, [mode]);

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme', newMode);
  };

  const value: ThemeContextProps = {
    mode: mode,
    setMode: toggleMode
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
