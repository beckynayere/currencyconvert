
// import { useState, useMemo } from 'react';
// import { useAppContext } from '../../hooks/useAppContext';
// import { useCurrencies } from '../../hooks/useCurrencies';
// import { convertCurrency } from '../../services/api';
// import CurrencyAutocomplete from '../CurrencyAutocomplete/CurrencyAutocomplete';
// import CurrencyFlag from '../CurrencyFlag/CurrencyFlag';
// import './CurrencyConverter.css';

// const popularCurrencyCodes = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'KES', 'AUD', 'CNY', 'CHF'];

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

//   const handlePopularCurrencySelect = (currency) => {
//     setToCurrency(currency);
//     if (amount && fromCurrency) handleConvert();
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
//                 <div className="currency-flag"><CurrencyFlag currency={code} /></div>
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



// // import { useState, useEffect, useRef } from 'react';
// // import { useAppContext } from '../../hooks/useAppContext'; 
// // import { useCurrencies } from '../../hooks/useCurrencies';
// // import { convertCurrency } from '../../services/api';
// // import CurrencyAutocomplete from '../CurrencyAutocomplete/CurrencyAutocomplete';
// // import CurrencyFlag from '../CurrencyFlag/CurrencyFlag';
// // import './CurrencyConverter.css';

// // const popularCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'KES', 'AUD', 'CNY', 'CHF'];

// // const CurrencyConverter = () => {
// //   const { 
// //     amount, setAmount,
// //     fromCurrency, setFromCurrency,
// //     toCurrency, setToCurrency,
// //     conversionResult, setConversionResult,
// //     error, setError,
// //     swapCurrencies
// //   } = useAppContext();

// //   const { currencies, loading, error: currenciesError } = useCurrencies();
// //   const [isConverting, setIsConverting] = useState(false);

// //   const containerRef = useRef(null);
// //   const currencyCardRefs = useRef({});
// //   const [scrollPosition, setScrollPosition] = useState(0);
// //   const [animationPaused, setAnimationPaused] = useState(false);

// //   useEffect(() => {
// //     if (!containerRef.current) return;

// //     const containerWidth = containerRef.current.offsetWidth;
// //     const cardWidth = currencyCardRefs.current[popularCurrencies[0]]?.offsetWidth || 110;
// //     const gap = 12;
// //     const visibleCards = Math.floor(containerWidth / (cardWidth + gap));

// //     const scrollInterval = setInterval(() => {
// //       if (!animationPaused) {
// //         setScrollPosition(prev => {
// //           const maxScroll = (popularCurrencies.length - visibleCards) * (cardWidth + gap);
// //           return prev >= maxScroll ? 0 : prev + (cardWidth + gap);
// //         });
// //       }
// //     }, 3000);

// //     return () => clearInterval(scrollInterval);
// //   }, [animationPaused, popularCurrencies.length]);

// //   const handleConvert = async () => {
// //     if (!fromCurrency || !toCurrency || !amount) return;

// //     try {
// //       setIsConverting(true);
// //       setError(null);
// //       const result = await convertCurrency(fromCurrency, toCurrency, amount);
// //       setConversionResult(result);
// //     } catch (err) {
// //       setError(err.message || 'Conversion failed.');
// //     } finally {
// //       setIsConverting(false);
// //     }
// //   };

// //   const handlePopularCurrencySelect = (currency) => {
// //     setToCurrency(currency);
// //     if (amount && fromCurrency) handleConvert();
// //   };

// //   if (loading) return <div className="loading-spinner">Loading currencies...</div>;
// //   if (currenciesError) return <div className="error-message">Error: {currenciesError}</div>;

// //   return (
// //     <div className="converter-app">
// //       <div className="converter-card">
// //         <div className="app-header">
// //           <h1 className="app-title">Currency Converter</h1>
// //           <p className="app-subtitle">Real-time exchange rates</p>
// //         </div>

// //         <div className="converter-input-card">
// //           <label className="input-label">Amount</label>
// //           <input
// //             type="number"
// //             className="amount-input"
// //             value={amount}
// //             onChange={(e) => setAmount(e.target.value)}
// //             placeholder="Enter amount"
// //             min="0"
// //           />

// //           <div className="currency-selectors">
// //             <div className="autocomplete-container">
// //               <CurrencyAutocomplete
// //                 value={fromCurrency}
// //                 onChange={setFromCurrency}
// //                 currencies={currencies}
// //                 label="From"
// //               />
// //             </div>

// //             <button className="swap-btn" onClick={swapCurrencies} aria-label="Swap currencies">
// //               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
// //                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                 <polyline points="17 1 21 5 17 9" />
// //                 <path d="M3 11V9a4 4 0 014-4h14" />
// //                 <polyline points="7 23 3 19 7 15" />
// //                 <path d="M21 13v2a4 4 0 01-4 4H3" />
// //               </svg>
// //             </button>

// //             <div className="autocomplete-container">
// //               <CurrencyAutocomplete
// //                 value={toCurrency}
// //                 onChange={setToCurrency}
// //                 currencies={currencies}
// //                 label="To"
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         <div className="convert-btn-container">
// //           <button
// //             className={`convert-btn ${isConverting ? 'converting' : ''}`}
// //             onClick={handleConvert}
// //             disabled={isConverting || !fromCurrency || !toCurrency || !amount}
// //           >
// //             {isConverting ? (
// //               <>
// //                 <span className="spinner" /> Converting...
// //               </>
// //             ) : (
// //               'Convert'
// //             )}
// //           </button>
// //         </div>

// //         {error && <div className="error-message">{error}</div>}

// //         {conversionResult && (
// //           <div className="result-card">
// //             <div className="result-main">
// //               <span className="amount-original">{amount} {fromCurrency}</span>
// //               <span className="equals-sign">=</span>
// //               <span className="amount-converted">{conversionResult.converted} {toCurrency}</span>
// //             </div>
// //             <div className="exchange-rate">
// //               1 {fromCurrency} = {conversionResult.rate} {toCurrency}
// //             </div>
// //             <div className="last-updated">Rates update daily (open-source API)</div>
// //           </div>
// //         )}

// //         <div className="popular-currencies-card">
// //           <h3 className="popular-currencies-title">Popular Currencies</h3>
// //           <div
// //             className="currency-cards-grid"
// //             ref={containerRef}
// //             onMouseEnter={() => setAnimationPaused(true)}
// //             onMouseLeave={() => setAnimationPaused(false)}
// //           >
// //             <div
// //               className="currency-cards-track"
// //               style={{ transform: `translateX(-${scrollPosition}px)` }}
// //             >
// //               {popularCurrencies.map((currency) => (
// //                 <div
// //                   key={currency}
// //                   className={`currency-card ${toCurrency === currency ? 'active' : ''}`}
// //                   onClick={() => handlePopularCurrencySelect(currency)}
// //                   ref={el => currencyCardRefs.current[currency] = el}
// //                 >
// //                   <div className="currency-flag"><CurrencyFlag currency={currency} /></div>
// //                   <div className="currency-info">
// //                     <span className="currency-code">{currency}</span>
// //                     <span className="currency-name">{currencies[currency]}</span>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CurrencyConverter;



// // current

// // import { useState, useEffect, useRef } from 'react';
// // import { useAppContext } from '../../hooks/useAppContext'; 
// // import { useCurrencies } from '../../hooks/useCurrencies';
// // import { convertCurrency } from '../../services/api';
// // import CurrencyAutocomplete from '../CurrencyAutocomplete/CurrencyAutocomplete';
// // import CurrencyFlag from '../CurrencyFlag/CurrencyFlag';
// // import './CurrencyConverter.css';

// // const popularCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'KES', 'AUD', 'CNY', 'CHF'];

// // const CurrencyConverter = () => {
// //   const { 
// //     amount, 
// //     setAmount,
// //     fromCurrency,
// //     setFromCurrency,
// //     toCurrency,
// //     setToCurrency,
// //     conversionResult,
// //     setConversionResult,
// //     error,
// //     setError,
// //     swapCurrencies
// //   } = useAppContext();

// //   const { currencies, loading, error: currenciesError } = useCurrencies();
// //   const [isConverting, setIsConverting] = useState(false);
  
// //   // Scrolling animation state and refs
// //   const containerRef = useRef(null);
// //   const currencyCardRefs = useRef({});
// //   const [scrollPosition, setScrollPosition] = useState(0);
// //   const [animationPaused, setAnimationPaused] = useState(false);

// //   // Scrolling effect
// //   useEffect(() => {
// //     if (!containerRef.current) return;
    
// //     const containerWidth = containerRef.current.offsetWidth;
// //     const cardWidth = currencyCardRefs.current[popularCurrencies[0]]?.offsetWidth || 110;
// //     const gap = 12;
// //     const visibleCards = Math.floor(containerWidth / (cardWidth + gap));
    
// //     const scrollInterval = setInterval(() => {
// //       if (!animationPaused) {
// //         setScrollPosition(prev => {
// //           const maxScroll = (popularCurrencies.length - visibleCards) * (cardWidth + gap);
// //           return prev >= maxScroll ? 0 : prev + (cardWidth + gap);
// //         });
// //       }
// //     }, 3000);

// //     return () => clearInterval(scrollInterval);
// //   }, [animationPaused, popularCurrencies.length]);

// //   const handleConvert = async () => {
// //     if (!fromCurrency || !toCurrency) return;
    
// //     try {
// //       setIsConverting(true);
// //       setError(null);
// //       const result = await convertCurrency(fromCurrency, toCurrency, amount);
// //       setConversionResult(result);
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setIsConverting(false);
// //     }
// //   };

// //   const handlePopularCurrencySelect = (currency) => {
// //     setToCurrency(currency);
// //     if (amount && fromCurrency) {
// //       handleConvert();
// //     }
// //   };

// //   if (loading) return <div className="loading-spinner">Loading currencies...</div>;
// //   if (currenciesError) return <div className="error-message">Error: {currenciesError}</div>;

// //   return (
// //     <div className="converter-app">
// //       <div className="converter-card">
// //         <div className="app-header">
// //           <h1 className="app-title">Currency Converter</h1>
// //           <p className="app-subtitle">Real-time exchange rates</p>
// //         </div>
        
// //         <div className="converter-input-card">
// //           <div className="amount-section">
// //             <label className="input-label">Amount</label>
// //             <div className="amount-input-container">
// //               <input
// //                 type="number"
// //                 className="amount-input"
// //                 value={amount}
// //                 onChange={(e) => setAmount(e.target.value)}
// //                 min="0"
// //                 step="0.01"
// //                 placeholder="0.00"
// //               />
// //               {fromCurrency && (
// //                 <span className="currency-symbol">{fromCurrency}</span>
// //               )}
// //             </div>
// //           </div>
          
// //           <div className="currency-selectors">
// //             <div className="autocomplete-container">
// //               <CurrencyAutocomplete
// //                 value={fromCurrency}
// //                 onChange={setFromCurrency}
// //                 currencies={currencies}
// //                 label="From"
// //               />
// //             </div>
            
// //             <button className="swap-btn" onClick={swapCurrencies} aria-label="Swap currencies">
// //               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                 <polyline points="17 1 21 5 17 9"></polyline>
// //                 <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
// //                 <polyline points="7 23 3 19 7 15"></polyline>
// //                 <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
// //               </svg>
// //             </button>
            
// //             <div className="autocomplete-container">
// //               <CurrencyAutocomplete
// //                 value={toCurrency}
// //                 onChange={setToCurrency}
// //                 currencies={currencies}
// //                 label="To"
// //               />
// //             </div>
// //           </div>
// //         </div>
        
// //         <div className="convert-btn-container">
// //           <button 
// //             className={`convert-btn ${isConverting ? 'converting' : ''}`}
// //             onClick={handleConvert}
// //             disabled={isConverting || !fromCurrency || !toCurrency || !amount}
// //           >
// //             {isConverting ? (
// //               <>
// //                 <span className="spinner"></span>
// //                 Converting...
// //               </>
// //             ) : (
// //               'Convert'
// //             )}
// //           </button>
// //         </div>
        
// //         {error && <div className="error-message">{error}</div>}

// //         {conversionResult && (
// //           <div className="result-card">
// //             <div className="result-main">
// //               <span className="amount-original">{amount} {fromCurrency}</span>
// //               <span className="equals-sign">=</span>
// //               <span className="amount-converted">{conversionResult.converted} {toCurrency}</span>
// //             </div>
// //             <div className="exchange-rate">
// //               1 {fromCurrency} = {conversionResult.rate} {toCurrency}
// //             </div>
// //             <div className="last-updated">Rates update every minute</div>
// //           </div>
// //         )}
        
// //         <div className="popular-currencies-card">
// //           <h3 className="popular-currencies-title">Popular Currencies</h3>
// //           <div 
// //             className="currency-cards-grid"
// //             ref={containerRef}
// //             onMouseEnter={() => setAnimationPaused(true)}
// //             onMouseLeave={() => setAnimationPaused(false)}
// //           >
// //             <div 
// //               className="currency-cards-track"
// //               style={{ transform: `translateX(-${scrollPosition}px)` }}
// //             >
// //               {popularCurrencies.map((currency) => (
// //                 <div 
// //                   key={currency}
// //                   className={`currency-card ${toCurrency === currency ? 'active' : ''}`}
// //                   onClick={() => handlePopularCurrencySelect(currency)}
// //                   ref={el => currencyCardRefs.current[currency] = el}
// //                 >
// //                   <div className="currency-flag">
// //                     <CurrencyFlag currency={currency} />
// //                   </div>
// //                   <div className="currency-info">
// //                     <span className="currency-code">{currency}</span>
// //                     <span className="currency-name">{currencies[currency]}</span>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CurrencyConverter;


// // import { useState, useEffect, useRef } from 'react';
// // import { useAppContext } from '../../hooks/useAppContext'; 
// // import { useCurrencies } from '../../hooks/useCurrencies';
// // import { convertCurrency } from '../../services/api';
// // import CurrencyAutocomplete from '../CurrencyAutocomplete/CurrencyAutocomplete';
// // import CurrencyFlag from '../CurrencyFlag/CurrencyFlag';
// // import './CurrencyConverter.css';

// // const popularCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'KES', 'AUD', 'CNY', 'CHF'];

// // const CurrencyConverter = () => {
// //   const { 
// //     amount, 
// //     setAmount,
// //     fromCurrency,
// //     setFromCurrency,
// //     toCurrency,
// //     setToCurrency,
// //     conversionResult,
// //     setConversionResult,
// //     error,
// //     setError,
// //     swapCurrencies
// //   } = useAppContext();

// //   const { currencies, loading, error: currenciesError } = useCurrencies();
// //   const [isConverting, setIsConverting] = useState(false);
  
// //   // Scrolling animation refs
// //   const containerRef = useRef(null);
// //   const currencyCardRefs = useRef({});

// //   const handleConvert = async () => {
// //     // Clear previous results and errors
// //     setConversionResult(null);
// //     setError(null);

// //     // Validate inputs
// //     if (!fromCurrency || !toCurrency) {
// //       setError('Please select both currencies');
// //       return;
// //     }

// //     const numericAmount = parseFloat(amount);
// //     if (isNaN(numericAmount)) {
// //       setError('Please enter a valid number');
// //       return;
// //     }

// //     if (numericAmount <= 0) {
// //       setError('Amount must be greater than 0');
// //       return;
// //     }

// //     try {
// //       setIsConverting(true);
      
// //       const result = await convertCurrency(
// //         fromCurrency,
// //         toCurrency,
// //         numericAmount
// //       );

// //       console.log('Conversion result:', result); // Debug log

// //       setConversionResult({
// //         converted: result.converted.toFixed(2),
// //         rate: result.rate.toFixed(6),
// //         isSameCurrency: result.isSameCurrency
// //       });

// //     } catch (err) {
// //       console.error('Conversion error:', err);
// //       setError(err.message);
// //     } finally {
// //       setIsConverting(false);
// //     }
// //   };

// //   const handlePopularCurrencySelect = (currency) => {
// //     setToCurrency(currency);
// //     if (amount && fromCurrency) {
// //       handleConvert();
// //     }
// //   };

// //   if (loading) return <div className="loading-spinner">Loading currencies...</div>;
// //   if (currenciesError) return <div className="error-message">Error: {currenciesError}</div>;

// //   return (
// //     <div className="converter-app">
// //       <div className="converter-card">
// //         <div className="app-header">
// //           <h1 className="app-title">Currency Converter</h1>
// //           <p className="app-subtitle">Real-time exchange rates</p>
// //         </div>
        
// //         <div className="converter-input-card">
// //           <div className="amount-section">
// //             <label className="input-label">Amount</label>
// //             <div className="amount-input-container">
// //               <input
// //                 type="number"
// //                 className="amount-input"
// //                 value={amount}
// //                 onChange={(e) => {
// //                   const value = e.target.value;
// //                   if (value === '' || (!isNaN(value) && parseFloat(value) >= 0)) {
// //                     setAmount(value);
// //                   }
// //                 }}
// //                 min="0"
// //                 step="0.01"
// //                 placeholder="0.00"
// //               />
// //               {fromCurrency && (
// //                 <span className="currency-symbol">{fromCurrency}</span>
// //               )}
// //             </div>
// //           </div>
          
// //           <div className="currency-selectors">
// //             <div className="autocomplete-container">
// //               <CurrencyAutocomplete
// //                 value={fromCurrency}
// //                 onChange={setFromCurrency}
// //                 currencies={currencies}
// //                 label="From"
// //               />
// //             </div>
            
// //             <button className="swap-btn" onClick={swapCurrencies} aria-label="Swap currencies">
// //               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                 <polyline points="17 1 21 5 17 9"></polyline>
// //                 <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
// //                 <polyline points="7 23 3 19 7 15"></polyline>
// //                 <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
// //               </svg>
// //             </button>
            
// //             <div className="autocomplete-container">
// //               <CurrencyAutocomplete
// //                 value={toCurrency}
// //                 onChange={setToCurrency}
// //                 currencies={currencies}
// //                 label="To"
// //               />
// //             </div>
// //           </div>
// //         </div>
        
// //         <div className="convert-btn-container">
// //           <button 
// //             className={`convert-btn ${isConverting ? 'converting' : ''}`}
// //             onClick={handleConvert}
// //             disabled={isConverting || !fromCurrency || !toCurrency || !amount}
// //           >
// //             {isConverting ? (
// //               <>
// //                 <span className="spinner"></span>
// //                 Converting...
// //               </>
// //             ) : (
// //               'Convert'
// //             )}
// //           </button>
// //         </div>
        
// //         {error && <div className="error-message">{error}</div>}

// //         {conversionResult && (
// //           <div className="result-card">
// //             <div className="result-main">
// //               <span className="amount-original">{amount} {fromCurrency}</span>
// //               <span className="equals-sign">=</span>
// //               <span className="amount-converted">
// //                 {conversionResult.converted} {toCurrency}
// //               </span>
// //             </div>
// //             {!conversionResult.isSameCurrency && (
// //               <>
// //                 <div className="exchange-rate">
// //                   1 {fromCurrency} = {conversionResult.rate} {toCurrency}
// //                 </div>
// //                 <div className="last-updated">
// //                   Rates update every minute | {new Date().toLocaleTimeString()}
// //                 </div>
// //               </>
// //             )}
// //           </div>
// //         )}
        
// //         <div className="popular-currencies-card">
// //           <h3 className="popular-currencies-title">Popular Currencies</h3>
// //           <div 
// //             className="currency-cards-grid"
// //             ref={containerRef}
// //             onMouseEnter={() => setAnimationPaused(true)}
// //             onMouseLeave={() => setAnimationPaused(false)}
// //           >
// //             <div 
// //               className="currency-cards-track"
// //               style={{ transform: `translateX(-${scrollPosition}px)` }}
// //             >
// //               {popularCurrencies.map((currency) => (
// //                 <div 
// //                   key={currency}
// //                   className={`currency-card ${toCurrency === currency ? 'active' : ''}`}
// //                   onClick={() => handlePopularCurrencySelect(currency)}
// //                   ref={el => currencyCardRefs.current[currency] = el}
// //                 >
// //                   <div className="currency-flag">
// //                     <CurrencyFlag currency={currency} />
// //                   </div>
// //                   <div className="currency-info">
// //                     <span className="currency-code">{currency}</span>
// //                     <span className="currency-name">{currencies[currency]}</span>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CurrencyConverter;
// // CURRENT BOX CUURENCIES 
// // import { useState, useEffect, useRef } from 'react';
// // import { useAppContext } from '../../hooks/useAppContext'; 
// // import { useCurrencies } from '../../hooks/useCurrencies';
// // import { convertCurrency } from '../../services/api';
// // import CurrencyAutocomplete from '../CurrencyAutocomplete/CurrencyAutocomplete';
// // import CurrencyFlag from '../CurrencyFlag/CurrencyFlag';
// // import './CurrencyConverter.css';

// // const popularCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'KES', 'AUD', 'CNY', 'CHF', 'TZS'];

// // const CurrencyConverter = () => {
// //   const { 
// //     amount, 
// //     setAmount,
// //     fromCurrency = 'USD', // Default to USD if undefined
// //     setFromCurrency,
// //     toCurrency = 'EUR',   // Default to EUR if undefined
// //     setToCurrency,
// //     conversionResult,
// //     setConversionResult,
// //     error,
// //     setError,
// //     swapCurrencies
// //   } = useAppContext();

// //   const { currencies, loading, error: currenciesError } = useCurrencies();
// //   const [isConverting, setIsConverting] = useState(false);
  
// //   // Scrolling animation ref
// //   const containerRef = useRef(null);
// //   const currencyCardRefs = useRef({});

// //   const handleConvert = async () => {
// //     if (!fromCurrency || !toCurrency) return;
    
// //     try {
// //       setIsConverting(true);
// //       setError(null);
      
// //       const result = await convertCurrency(fromCurrency, toCurrency, amount);
      
// //       if (!result) {
// //         throw new Error('No conversion result returned');
// //       }
      
// //       setConversionResult(result);
// //     } catch (err) {
// //       console.error('Conversion error:', err);
// //       setError(err.message || 'Failed to convert currencies');
// //     } finally {
// //       setIsConverting(false);
// //     }
// //   };

// //   // Fixed click handler for popular currencies
// //   const handlePopularCurrencySelect = (currency) => {
// //     console.log('Selected currency:', currency); // Debug log
// //     setToCurrency(currency);
// //     // Auto-convert if amount is set
// //     if (amount) {
// //       handleConvert();
// //     }
// //   };

// //   if (loading) return <div className="loading-spinner">Loading currencies...</div>;
// //   if (currenciesError) return <div className="error-message">Error: {currenciesError}</div>;

// //   return (
// //     <div className="converter-app">
// //       <div className="converter-card">
// //         <div className="app-header">
// //           <h1 className="app-title">Currency Converter</h1>
// //           <p className="app-subtitle">Real-time exchange rates</p>
// //         </div>
        
// //         <div className="converter-input-card">
// //           <div className="amount-section">
// //             <label className="input-label">Amount</label>
// //             <div className="amount-input-container">
// //               <input
// //                 type="number"
// //                 className="amount-input"
// //                 value={amount}
// //                 onChange={(e) => setAmount(e.target.value)}
// //                 min="0"
// //                 step="0.01"
// //                 placeholder="0.00"
// //               />
// //               {fromCurrency && (
// //                 <span className="currency-symbol">{fromCurrency}</span>
// //               )}
// //             </div>
// //           </div>
          
// //           <div className="currency-selectors">
// //             <div className="autocomplete-container">
// //               <CurrencyAutocomplete
// //                 value={fromCurrency}
// //                 onChange={setFromCurrency}
// //                 currencies={currencies}
// //                 label="From"
// //               />
// //             </div>
            
// //             <button className="swap-btn" onClick={swapCurrencies} aria-label="Swap currencies">
// //               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                 <polyline points="17 1 21 5 17 9"></polyline>
// //                 <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
// //                 <polyline points="7 23 3 19 7 15"></polyline>
// //                 <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
// //               </svg>
// //             </button>
            
// //             <div className="autocomplete-container">
// //               <CurrencyAutocomplete
// //                 value={toCurrency}
// //                 onChange={setToCurrency}
// //                 currencies={currencies}
// //                 label="To"
// //               />
// //             </div>
// //           </div>
// //         </div>
        
// //         <div className="convert-btn-container">
// //           <button 
// //             className={`convert-btn ${isConverting ? 'converting' : ''}`}
// //             onClick={handleConvert}
// //             disabled={isConverting || !fromCurrency || !toCurrency || !amount}
// //           >
// //             {isConverting ? (
// //               <>
// //                 <span className="spinner"></span>
// //                 Converting...
// //               </>
// //             ) : (
// //               'Convert'
// //             )}
// //           </button>
// //         </div>
        
// //         {error && <div className="error-message">{error}</div>}

// //         {conversionResult && (
// //           <div className="result-card">
// //             <div className="result-main">
// //               <span className="amount-original">{amount} {fromCurrency}</span>
// //               <span className="equals-sign">=</span>
// //               <span className="amount-converted">{conversionResult.converted} {toCurrency}</span>
// //             </div>
// //             <div className="exchange-rate">
// //               1 {fromCurrency} = {conversionResult.rate} {toCurrency}
// //             </div>
// //             <div className="last-updated">Rates update every minute</div>
// //           </div>
// //         )}
        
// //         <div className="popular-currencies-card">
// //           <h3 className="popular-currencies-title">Popular Currencies</h3>
// //           <div className="currency-cards-grid">
// //             {popularCurrencies.map((currency) => (
// //               <div 
// //                 key={currency}
// //                 className={`currency-card ${toCurrency === currency ? 'active' : ''}`}
// //                 onClick={() => handlePopularCurrencySelect(currency)}
// //               >
// //                 <div className="currency-flag">
// //                   <CurrencyFlag currency={currency} />
// //                 </div>
// //                 <div className="currency-info">
// //                   <span className="currency-code">{currency}</span>
// //                   <span className="currency-name">{currencies[currency]}</span>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //           <p className="all-currencies-note">
// //             You can convert to any currency using the search above
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CurrencyConverter;



import { useState, useMemo } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { useCurrencies } from '../../hooks/useCurrencies';
import { convertCurrency } from '../../services/api';
import CurrencyAutocomplete from '../CurrencyAutocomplete/CurrencyAutocomplete';
import CurrencyFlag from '../CurrencyFlag/CurrencyFlag';
import './CurrencyConverter.css';

const popularCurrencyCodes = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'KES', 'AUD', 'CNY', 'CHF'];

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

  // Improved handlePopularCurrencySelect with auto-conversion
  const handlePopularCurrencySelect = (currency) => {
    setToCurrency(currency);
    // If amount is entered and from currency is selected, auto-convert
    if (amount && fromCurrency && !isConverting) {
      handleConvert();
    }
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
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min="0"
            step="0.01"
          />

          <div className="currency-selectors">
            <CurrencyAutocomplete
              value={fromCurrency}
              onChange={setFromCurrency}
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
                <div className="currency-flag">
                  <CurrencyFlag currency={code} onClick={() => handlePopularCurrencySelect(code)} />
                </div>
                <div className="currency-info">
                  <span className="currency-code">{code}</span>
                  <span className="currency-name">{name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;