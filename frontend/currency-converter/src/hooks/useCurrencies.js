// src/hooks/useCurrencies.js
import { useState, useEffect } from 'react';
import { fetchCurrencies } from '../services/api';

export const useCurrencies = () => {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        setLoading(true);
        const data = await fetchCurrencies();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        // Convert the currency object to an array of currency codes
        const currencyCodes = Object.keys(data);
        setCurrencies(currencyCodes);
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