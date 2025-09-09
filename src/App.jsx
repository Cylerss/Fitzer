import React from 'react';
import Home from './Home';
import Exercise from './Exercise';
import AIAssistantPage from './AIAssistantPage';
import Diet from './Diet';
import Login from './Login';
import Profile from './Profile';
import { ThemeProvider } from './ThemeContext';
import './App.css';

function App() {
  const [route, setRoute] = useHashRoute();

  return (
    <ThemeProvider>
      {route === '/exercise' ? (
        <Exercise />
      ) : route === '/assistant' ? (
        <AIAssistantPage />
      ) : route === '/diet' ? (
        <Diet />
      ) : route === '/login' ? (
        <Login />
      ) : route === '/profile' ? (
        <Profile />
      ) : (
        <Home />
      )}
    </ThemeProvider>
  );
}

export default App

function useHashRoute() {
  const [route, setRoute] = React.useState(getHashRoute());

  React.useEffect(() => {
    const handler = () => setRoute(getHashRoute());
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  return [route, setRoute];
}

function getHashRoute() {
  const hash = window.location.hash || '#/';
  return hash.replace('#', '') || '/';
}
