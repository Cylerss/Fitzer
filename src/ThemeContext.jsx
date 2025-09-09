import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem('theme');
    if (saved) {
      return saved === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: {
      // Dark theme colors
      dark: {
        bg: 'bg-gray-950',
        bgSecondary: 'bg-gray-900',
        bgTertiary: 'bg-gray-800',
        text: 'text-gray-100',
        textSecondary: 'text-gray-300',
        textMuted: 'text-gray-400',
        border: 'border-white/10',
        borderSecondary: 'border-white/8',
        cardBg: 'bg-white/5',
        cardBgSecondary: 'bg-white/3',
        cardBgHover: 'bg-white/8',
        backdrop: 'bg-gray-950/80',
        selection: 'selection:bg-emerald-300/30',
        accent: 'text-emerald-300',
        accentBg: 'bg-emerald-500/20',
        accentRing: 'ring-emerald-400/30',
        accentHover: 'hover:bg-emerald-500/25',
        accentShadow: 'rgba(16, 185, 129, 0.4)',
        accentShadowStrong: 'rgba(16, 185, 129, 0.6)',
        accentShadowLight: 'rgba(16, 185, 129, 0.3)',
        accentTextShadow: 'rgba(16, 185, 129, 0.5)',
      },
      // Light theme colors
      light: {
        bg: 'bg-gray-50',
        bgSecondary: 'bg-white',
        bgTertiary: 'bg-gray-100',
        text: 'text-gray-900',
        textSecondary: 'text-gray-700',
        textMuted: 'text-gray-500',
        border: 'border-gray-200',
        borderSecondary: 'border-gray-300',
        cardBg: 'bg-gray-100/50',
        cardBgSecondary: 'bg-gray-200/30',
        cardBgHover: 'bg-gray-200/70',
        backdrop: 'bg-white/80',
        selection: 'selection:bg-orange-400/30',
        accent: 'text-orange-500',
        accentBg: 'bg-orange-400/20',
        accentRing: 'ring-orange-400/30',
        accentHover: 'hover:bg-orange-400/25',
        accentShadow: 'rgba(251, 146, 60, 0.3)',
        accentShadowStrong: 'rgba(251, 146, 60, 0.5)',
        accentShadowLight: 'rgba(251, 146, 60, 0.2)',
        accentTextShadow: 'rgba(251, 146, 60, 0.4)',
      }
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
