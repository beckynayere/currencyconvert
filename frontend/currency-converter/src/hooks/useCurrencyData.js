import { useEffect, useState } from 'react';
import { fetchExchangeRates } from '../services/api';

export const useCurrencyData = (baseCurrency = 'USD') => {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchExchangeRates(baseCurrency);
        setRates(data.rates);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, [baseCurrency]);

  return { rates, loading, error };
};