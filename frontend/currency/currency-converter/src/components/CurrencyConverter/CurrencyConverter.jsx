
// import { useState, useMemo } from 'react';
// import { useAppContext } from '../../hooks/useAppContext';
// import { useCurrencies } from '../../hooks/useCurrencies';
// import { convertCurrency } from '../../services/api';
// import CurrencyAutocomplete from '../CurrencyAutocomplete/CurrencyAutocomplete';
// import CurrencyFlag from '../CurrencyFlag/CurrencyFlag';
// import './CurrencyConverter.css';

// const popularCurrencyCodes = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'KES', 'AUD', 'CNY', 'CHF', 'INR', 'ZAR', 'BRL'];

// const CurrencyConverter = () => {
//   const {
//     amount, setAmount,
//     fromCurrency, setFromCurrency,
//     toCurrency, setToCurrency,
//     conversionResult, setConversionResult,
//     error, setError,
//     swapCurrencies
//   } = useAppContext();

//   const { currencies, loading, error: currenciesError } = useCurrencies();
//   const [isConverting, setIsConverting] = useState(false);

//   const handleConvert = async () => {
//     if (!fromCurrency || !toCurrency || !amount || isNaN(amount)) return;
//     try {
//       setIsConverting(true);
//       setError(null);
//       const result = await convertCurrency(fromCurrency, toCurrency, parseFloat(amount));
//       setConversionResult(result);
//     } catch (err) {
//       setError(err.message || 'Conversion failed.');
//     } finally {
//       setIsConverting(false);
//     }
//   };

//   // Improved handlePopularCurrencySelect with auto-conversion
//   const handlePopularCurrencySelect = (currency) => {
//     setToCurrency(currency);
//     // If amount is entered and from currency is selected, auto-convert
//     if (amount && fromCurrency && !isConverting) {
//       handleConvert();
//     }
//   };

//   // Memoize popular currencies filtered from backend list
//   const popularCurrencies = useMemo(() => {
//     if (!currencies) return [];
//     return popularCurrencyCodes
//       .filter(code => currencies[code])
//       .map(code => ({
//         code,
//         name: currencies[code]
//       }));
//   }, [currencies]);

//   if (loading) return <div className="loading-spinner">Loading currencies...</div>;
//   if (currenciesError) return <div className="error-message">Error: {currenciesError}</div>;

//   return (
//     <div className="converter-app">
//       <div className="converter-card">
//         <h1 className="app-title">Currency Converter</h1>

//         <div className="converter-form">
//           <label className="input-label">Amount</label>
//           <input
//             type="number"
//             className="amount-input"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             placeholder="Enter amount"
//             min="0"
//             step="0.01"
//           />

//           <div className="currency-selectors">
//             <CurrencyAutocomplete
//               value={fromCurrency}
//               onChange={setFromCurrency}
//               currencies={currencies}
//               label="From"
//             />

//             <button className="swap-btn" onClick={swapCurrencies} aria-label="Swap currencies">
//               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
//                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <polyline points="17 1 21 5 17 9" />
//                 <path d="M3 11V9a4 4 0 014-4h14" />
//                 <polyline points="7 23 3 19 7 15" />
//                 <path d="M21 13v2a4 4 0 01-4 4H3" />
//               </svg>
//             </button>

//             <CurrencyAutocomplete
//               value={toCurrency}
//               onChange={setToCurrency}
//               currencies={currencies}
//               label="To"
//             />
//           </div>

//           <button
//             className={`convert-btn ${isConverting ? 'converting' : ''}`}
//             onClick={handleConvert}
//             disabled={isConverting || !fromCurrency || !toCurrency || !amount}
//           >
//             {isConverting ? 'Converting...' : 'Convert'}
//           </button>
//         </div>

//         {error && <div className="error-message">{error}</div>}

//         {conversionResult && (
//           <div className="result-card">
//             <div className="result-main">
//               <span className="amount-original">{amount} {fromCurrency}</span>
//               <span className="equals-sign">=</span>
//               <span className="amount-converted">{conversionResult.converted} {toCurrency}</span>
//             </div>
//             <div className="exchange-rate">
//               1 {fromCurrency} = {conversionResult.rate} {toCurrency}
//             </div>
//             <div className="last-updated">Updated daily (open-source API)</div>
//           </div>
//         )}

//         <div className="popular-currencies-card">
//           <h3 className="popular-currencies-title">Popular Currencies</h3>
//           <div className="currency-cards-grid">
//             {popularCurrencies.map(({ code, name }) => (
//               <div
//                 key={code}
//                 className={`currency-card ${toCurrency === code ? 'active' : ''}`}
//                 onClick={() => handlePopularCurrencySelect(code)}
//               >
//                 <div className="currency-flag">
//                   <CurrencyFlag currency={code} onClick={() => handlePopularCurrencySelect(code)} />
//                 </div>
//                 <div className="currency-info">
//                   <span className="currency-code">{code}</span>
//                   <span className="currency-name">{name}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CurrencyConverter;



import { useState, useMemo, useEffect } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { useCurrencies } from '../../hooks/useCurrencies';
import { convertCurrency } from '../../services/api';
import CurrencyAutocomplete from '../CurrencyAutocomplete/CurrencyAutocomplete';
import CurrencyFlag from '../CurrencyFlag/CurrencyFlag';
import './CurrencyConverter.css';

const popularCurrencyCodes = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'KES', 'AUD', 'CNY', 'CHF', 'INR', 'ZAR', 'BRL'];

const CurrencyConverter = () => {
  const {
    amount, setAmount,
    fromCurrency, setFromCurrency,
    toCurrency, setToCurrency,
    conversionResult, setConversionResult,
    error, setError,
    swapCurrencies
  } = useAppContext();

  const { currencies, loading, error: currenciesError } = useCurrencies();
  const [isConverting, setIsConverting] = useState(false);

  // Auto-convert when relevant values change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (amount && fromCurrency && toCurrency && !isConverting) {
        handleConvert();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [amount, fromCurrency, toCurrency]);

  const handleConvert = async () => {
    if (!fromCurrency || !toCurrency || !amount || isNaN(amount)) return;
    
    try {
      setIsConverting(true);
      setError(null);
      const result = await convertCurrency(fromCurrency, toCurrency, parseFloat(amount));
      setConversionResult(result);
    } catch (err) {
      setError(err.message || 'Conversion failed.');
    } finally {
      setIsConverting(false);
    }
  };

  const handlePopularCurrencySelect = (currency) => {
    setToCurrency(currency);
    // Conversion will be handled by the useEffect
  };

  const handleFromCurrencyChange = (currency) => {
    setFromCurrency(currency);
  };

  const handleAmountChange = (value) => {
    setAmount(value);
  };

  // Memoize popular currencies filtered from backend list
  const popularCurrencies = useMemo(() => {
    if (!currencies) return [];
    return popularCurrencyCodes
      .filter(code => currencies[code])
      .map(code => ({
        code,
        name: currencies[code]
      }));
  }, [currencies]);

  if (loading) return <div className="loading-spinner">Loading currencies...</div>;
  if (currenciesError) return <div className="error-message">Error: {currenciesError}</div>;

  return (
    <div className="converter-app">
      <div className="converter-card">
        <h1 className="app-title">Currency Converter</h1>

        <div className="converter-form">
          <label className="input-label">Amount</label>
          <input
            type="number"
            className="amount-input"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            placeholder="Enter amount"
            min="0"
            step="0.01"
          />

          <div className="currency-selectors">
            <CurrencyAutocomplete
              value={fromCurrency}
              onChange={handleFromCurrencyChange}
              currencies={currencies}
              label="From"
            />

            <button className="swap-btn" onClick={swapCurrencies} aria-label="Swap currencies">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                   stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="17 1 21 5 17 9" />
                <path d="M3 11V9a4 4 0 014-4h14" />
                <polyline points="7 23 3 19 7 15" />
                <path d="M21 13v2a4 4 0 01-4 4H3" />
              </svg>
            </button>

            <CurrencyAutocomplete
              value={toCurrency}
              onChange={setToCurrency}
              currencies={currencies}
              label="To"
            />
          </div>

          <button
            className={`convert-btn ${isConverting ? 'converting' : ''}`}
            onClick={handleConvert}
            disabled={isConverting || !fromCurrency || !toCurrency || !amount}
          >
            {isConverting ? 'Converting...' : 'Convert'}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {conversionResult && (
          <div className="result-card">
            <div className="result-main">
              <span className="amount-original">{amount} {fromCurrency}</span>
              <span className="equals-sign">=</span>
              <span className="amount-converted">{conversionResult.converted} {toCurrency}</span>
            </div>
            <div className="exchange-rate">
              1 {fromCurrency} = {conversionResult.rate} {toCurrency}
            </div>
            <div className="last-updated">Updated daily (open-source API)</div>
          </div>
        )}

        <div className="popular-currencies-card">
          <h3 className="popular-currencies-title">Popular Currencies</h3>
          <div className="currency-cards-grid">
            {popularCurrencies.map(({ code, name }) => (
              <div
                key={code}
                className={`currency-card ${toCurrency === code ? 'active' : ''}`}
                onClick={() => handlePopularCurrencySelect(code)}
              >
                {isConverting && toCurrency === code ? (
                  <div className="mini-spinner"></div>
                ) : (
                  <>
                    <div className="currency-flag">
                      <CurrencyFlag currency={code} />
                    </div>
                    <div className="currency-info">
                      <span className="currency-code">{code}</span>
                      <span className="currency-name">{name}</span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;