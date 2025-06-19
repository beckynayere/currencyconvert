// src/components/CurrencyConverter.jsx
import { useState } from 'react';
import { useCurrencies } from '../hooks/useCurrencies';
import { convertCurrency } from '../services/api';
import CurrencyAutocomplete from './CurrencyAutocomplete';

const CurrencyConverter = () => {
  const { currencies, loading, error } = useCurrencies();
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [conversionResult, setConversionResult] = useState(null);
  const [converting, setConverting] = useState(false);
  const [conversionError, setConversionError] = useState(null);

  const handleConvert = async () => {
    if (!fromCurrency || !toCurrency || amount <= 0) return;
    
    try {
      setConverting(true);
      setConversionError(null);
      const result = await convertCurrency(fromCurrency, toCurrency, amount);
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      setConversionResult(result);
    } catch (err) {
      setConversionError(err.message);
    } finally {
      setConverting(false);
    }
  };

  if (loading) return <div>Loading currencies...</div>;
  if (error) return <div>Error loading currencies: {error}</div>;

  return (
    <div className="converter-container">
      <h2>Currency Converter</h2>
      
      <div className="input-group">
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
          min="0"
          step="0.01"
        />
      </div>

      <div className="input-group">
        <label>From Currency</label>
        <CurrencyAutocomplete
          value={fromCurrency}
          onChange={setFromCurrency}
          currencies={currencies}
          placeholder="Select source currency"
        />
      </div>

      <div className="input-group">
        <label>To Currency</label>
        <CurrencyAutocomplete
          value={toCurrency}
          onChange={setToCurrency}
          currencies={currencies}
          placeholder="Select target currency"
        />
      </div>

      <button 
        onClick={handleConvert}
        disabled={converting || !fromCurrency || !toCurrency || amount <= 0}
      >
        {converting ? 'Converting...' : 'Convert'}
      </button>

      {conversionError && (
        <div className="error-message">{conversionError}</div>
      )}

      {conversionResult && !conversionError && (
        <div className="result">
          <h3>Conversion Result</h3>
          <p>{conversionResult.query.amount} {conversionResult.query.from} =</p>
          <p className="converted-amount">{conversionResult.converted} {conversionResult.query.to}</p>
          <p className="rate">Rate: 1 {conversionResult.query.from} = {conversionResult.rate} {conversionResult.query.to}</p>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;