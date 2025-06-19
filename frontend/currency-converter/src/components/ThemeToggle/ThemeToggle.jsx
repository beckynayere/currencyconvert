import { useAppContext } from '../../context/AppContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useAppContext();

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;