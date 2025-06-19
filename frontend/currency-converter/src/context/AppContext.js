import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [favorites, setFavorites] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [amount, setAmount] = useState(1);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('currencyAppTheme');
    if (savedTheme) setTheme(savedTheme);
    
    const savedFavorites = localStorage.getItem('currencyAppFavorites');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    
    const savedBaseCurrency = localStorage.getItem('currencyAppBaseCurrency');
    if (savedBaseCurrency) setBaseCurrency(savedBaseCurrency);
  }, []);

  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem('currencyAppTheme', theme);
    localStorage.setItem('currencyAppFavorites', JSON.stringify(favorites));
    localStorage.setItem('currencyAppBaseCurrency', baseCurrency);
  }, [theme, favorites, baseCurrency]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleFavorite = (currency) => {
    setFavorites(prev => 
      prev.includes(currency)
        ? prev.filter(c => c !== currency)
        : [...prev, currency]
    );
  };

  return (
    <
        AppContext.Provider
      value={{
        theme,
        toggleTheme,
        favorites,
        toggleFavorite,
        baseCurrency,
        setBaseCurrency,
        amount,
        setAmount,
        lastUpdated,
        setLastUpdated
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);