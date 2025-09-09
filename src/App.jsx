import Home from './Home';
import { ThemeProvider } from './ThemeContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
}

export default App
