import { useEffect, useState } from 'react';
import { fetchCurrencies } from '../services/api';

export const useCurrencies = () => {
  const [currencies, setCurrencies] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        const data = await fetchCurrencies();
        setCurrencies(data);
        // setCurrencies(data.currencies);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadCurrencies();
  }, []);

  return { currencies, loading, error };
};