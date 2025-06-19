import { useState, useEffect, useRef } from 'react';

const CurrencyAutocomplete = ({ value, onChange, currencies, label }) => {
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
      const filtered = Object.keys(currencies).filter((code) => 
        code.includes(value) || currencies[code].toUpperCase().includes(value)
      ).slice(0, 5); // Limit to 5 suggestions
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

  return (
    <div className="autocomplete-container" ref={wrapperRef}>
      <label className="autocomplete-label">{label}</label>
      <div className="autocomplete-input-container">
        <input
          type="text"
          className="autocomplete-input"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search currency..."
        />
        <svg className="dropdown-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((currency) => (
            <li 
              key={currency} 
              className="suggestion-item"
              onClick={() => handleSuggestionClick(currency)}
            >
              <span className="currency-code">{currency}</span>
              <span className="currency-name">{currencies[currency]}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CurrencyAutocomplete;



// import { useState, useEffect, useRef } from 'react';

// const CurrencyAutocomplete = ({ value, onChange, currencies, label }) => {
//   const [inputValue, setInputValue] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const wrapperRef = useRef(null);

//   // Reset input when value changes externally
//   useEffect(() => {
//     if (value && currencies[value]) {
//       setInputValue(value);
//     } else {
//       setInputValue('');
//     }
//   }, [value, currencies]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
//         setShowSuggestions(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleInputChange = (e) => {
//     const value = e.target.value.toUpperCase();
//     setInputValue(value);

//     if (value.length > 0) {
//       const filtered = Object.keys(currencies).filter((code) => 
//         code.includes(value) || currencies[code].toUpperCase().includes(value)
//       ).slice(0, 5); // Limit to 5 suggestions
//       setSuggestions(filtered);
//       setShowSuggestions(true);
//     } else {
//       setSuggestions([]);
//       setShowSuggestions(false);
//     }
//   };

//   const handleSuggestionClick = (currency) => {
//     onChange(currency); // Update parent component's state
//     setShowSuggestions(false);
//   };

//   return (
//     <div className="autocomplete-container" ref={wrapperRef}>
//       <label className="autocomplete-label">{label}</label>
//       <div className="autocomplete-input-container">
//         <input
//           type="text"
//           className="autocomplete-input"
//           value={inputValue}
//           onChange={handleInputChange}
//           onFocus={() => {
//             setShowSuggestions(true);
//             setInputValue('');
//           }}
//           placeholder="Search currency..."
//         />
//         <svg className="dropdown-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//           <polyline points="6 9 12 15 18 9"></polyline>
//         </svg>
//       </div>
//       {showSuggestions && suggestions.length > 0 && (
//         <ul className="suggestions-list">
//           {suggestions.map((currency) => (
//             <li 
//               key={currency} 
//               className="suggestion-item"
//               onClick={() => handleSuggestionClick(currency)}
//             >
//               <span className="currency-code">{currency}</span>
//               <span className="currency-name">{currencies[currency]}</span>
//             </li>
//           ))}
//         </ul>
//       )}
//       {showSuggestions && suggestions.length === 0 && (
//         <div className="no-results">No currencies found</div>
//       )}
//     </div>
//   );
// };

// export default CurrencyAutocomplete;