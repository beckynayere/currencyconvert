import { useAppContext } from '../../context/AppContext';
import { useEffect, useState } from 'react';
import { fetchExchangeRates } from '../../services/api';
import './CurrencyCard.css';

const CurrencyCard = ({ currency }) => {
  const { baseCurrency, amount, favorites, toggleFavorite } = useAppContext();
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trend, setTrend] = useState('neutral');

  useEffect(() => {
    const getRate = async () => {
      try {
        setLoading(true);
        const data = await fetchExchangeRates(baseCurrency);
        const newRate = data.rates[currency];
        
        // Determine trend
        if (rate) {
          if (newRate > rate) setTrend('up');
          else if (newRate < rate) setTrend('down');
          else setTrend('neutral');
        }
        
        setRate(newRate);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getRate();
    const interval = setInterval(getRate, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, [baseCurrency, currency]);

  const isFavorite = favorites.includes(currency);
  const convertedAmount = rate ? (amount * rate).toFixed(2) : '...';

  return (
    <div className={`currency-card ${isFavorite ? 'favorite' : ''}`}>
      <div className="currency-header">
        <span className="currency-code">{currency}</span>
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={() => toggleFavorite(currency)}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>
      
      <div className="currency-rate">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <>
            <div className="rate-value">
              1 {baseCurrency} = {rate.toFixed(6)} {currency}
            </div>
            <div className="converted-value">
              {amount} {baseCurrency} = {convertedAmount} {currency}
            </div>
            <div className={`trend ${trend}`}>
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CurrencyCard;