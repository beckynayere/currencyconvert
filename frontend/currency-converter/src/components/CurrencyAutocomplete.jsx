// src/components/CurrencyAutocomplete.jsx
import { useState, useEffect, useRef } from 'react';

const CurrencyAutocomplete = ({ 
  value, 
  onChange, 
  currencies = [], 
  placeholder = 'Select currency',
  disabled = false
}) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (value) setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase();
    setInputValue(value);

    if (value.length > 0) {
      const filtered = currencies.filter(currency => 
        currency.includes(value)
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (currency) => {
    setInputValue(currency);
    onChange(currency);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && suggestions.length > 0) {
      handleSuggestionClick(suggestions[0]);
    }
  };

  return (
    <div className="autocomplete" ref={wrapperRef}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="currency-input"
        disabled={disabled}
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((currency) => (
            <li 
              key={currency}
              onClick={() => handleSuggestionClick(currency)}
              className={currency === value ? 'selected' : ''}
            >
              {currency}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CurrencyAutocomplete;




// 