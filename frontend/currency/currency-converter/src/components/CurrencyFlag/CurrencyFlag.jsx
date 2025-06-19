// // components/CurrencyFlag.jsx
// import React from 'react';

// const CurrencyFlag = ({ currency }) => {
//   const flagMap = {
//     USD: '🇺🇸',
//     EUR: '🇪🇺',
//     GBP: '🇬🇧',
//     JPY: '🇯🇵',
//     AUD: '🇦🇺',
//     CAD: '🇨🇦',
//     CHF: '🇨🇭',
//     CNY: '🇨🇳',
//     // Add more currency-flag mappings as needed
//   };

//   return (
//     <span className="currency-flag" style={{ fontSize: '20px' }}>
//       {flagMap[currency] || currency}
//     </span>
//   );
// };

// export default CurrencyFlag;
// components/CurrencyFlag.jsx
// import React from 'react';
// import './CurrencyFlag.css'; // We'll create this CSS file

// const currencyToCountry = {
//   USD: 'US', // United States Dollar
//   EUR: 'EU', // Euro (European Union)
//   GBP: 'GB', // British Pound
//   JPY: 'JP', // Japanese Yen
//   CAD: 'CA', // Canadian Dollar
//   KES: 'KE', // Kenyan Shilling
//   AUD: 'AU', // Australian Dollar
//   CHF: 'CH', // Swiss Franc
//   CNY: 'CN', // Chinese Yuan
//   // Add more mappings as needed
// };

// const CurrencyFlag = ({ currency }) => {
//   const countryCode = currencyToCountry[currency] || 'WW'; // 'WW' as fallback
  
//   return (
//     <div className={`currency-flag currency-flag-${countryCode.toLowerCase()}`}>
//       {countryCode}
//     </div>
//   );
// };

// export default CurrencyFlag;


import React from 'react';
import ReactCountryFlag from 'react-country-flag';

const currencyToCountry = {
  USD: 'US',
  EUR: 'EU', // Note: EU is special for Euro
  GBP: 'GB',
  JPY: 'JP',
  CAD: 'CA',
  KES: 'KE',
  AUD: 'AU', 
  CHF: 'CH', 
  CNY: 'CN'
  // Add more as needed
};

const CurrencyFlag = ({ currency }) => {
  const countryCode = currencyToCountry[currency];
  
  return countryCode ? (
    <ReactCountryFlag
      countryCode={countryCode}
      svg
      style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        objectFit: 'cover',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}
      title={currency}
    />
  ) : (
    <div className="currency-flag-ww">{currency}</div>
  );
};

export default CurrencyFlag;