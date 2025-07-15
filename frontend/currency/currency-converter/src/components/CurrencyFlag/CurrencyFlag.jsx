


// import React from 'react';
// import ReactCountryFlag from 'react-country-flag';

// const currencyToCountry = {
//   USD: 'US',
//   EUR: 'EU', // Note: EU is special for Euro
//   GBP: 'GB',
//   JPY: 'JP',
//   CAD: 'CA',
//   KES: 'KE',
//   AUD: 'AU', 
//   CHF: 'CH', 
//   CNY: 'CN',
//   INR: 'IN',  
//   ZAR: 'ZA',  
//   BRL: 'BR'
//   // Add more as needed
// };

// const CurrencyFlag = ({ currency }) => {
//   const countryCode = currencyToCountry[currency];
  
//   return countryCode ? (
//     <ReactCountryFlag
//       countryCode={countryCode}
//       svg
//       style={{
//         width: '32px',
//         height: '32px',
//         borderRadius: '50%',
//         objectFit: 'cover',
//         boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
//       }}
//       title={currency}
//     />
//   ) : (
//     <div className="currency-flag-ww">{currency}</div>
//   );
// };
// const CurrencyFlag = ({ currency, onClick }) => {
//   const countryCode = currencyToCountry[currency];
  
//   return countryCode ? (
//     <div onClick={onClick}>
//       <ReactCountryFlag
//         countryCode={countryCode}
//         svg
//         style={{
//           width: '32px',
//           height: '32px',
//           borderRadius: '50%',
//           objectFit: 'cover',
//           boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
//         }}
//         title={currency}
//       />
//     </div>
//   ) : (
//     <div className="currency-flag-ww" onClick={onClick}>{currency}</div>
//   );
// };

// export default CurrencyFlag;




// CurrencyFlag.js
// import React from 'react';
// import ReactCountryFlag from 'react-country-flag';

// const currencyToCountry = {
//   USD: 'US',
//   EUR: 'EU',
//   GBP: 'GB',
//   JPY: 'JP',
//   CAD: 'CA',
//   KES: 'KE',
//   AUD: 'AU',
//   CHF: 'CH',
//   CNY: 'CN',
//   INR: 'IN',
//   ZAR: 'ZA',
//   BRL: 'BR'
// };

// const CurrencyFlag = ({ currency }) => {
//   const countryCode = currencyToCountry[currency];
  
//   if (!countryCode) {
//     return (
//       <div className="currency-flag-fallback">
//         {currency}
//       </div>
//     );
//   }

//   return (
//     <ReactCountryFlag
//       countryCode={countryCode}
//       svg
//       style={{
//         width: '32px',
//         height: '32px',
//         borderRadius: '50%',
//         objectFit: 'cover',
//         boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
//       }}
//       title={currency}
//     />
//   );
// };

// export default CurrencyFlag;


import React from 'react';
import ReactCountryFlag from 'react-country-flag';

const currencyToCountry = {
  USD: 'US',
  EUR: 'EU',  // European Union flag
  GBP: 'GB',
  JPY: 'JP',
  CAD: 'CA',
  KES: 'KE',
  AUD: 'AU',
  CHF: 'CH',
  CNY: 'CN',
  INR: 'IN',
  ZAR: 'ZA',
  BRL: 'BR'
};

const CurrencyFlag = ({ currency }) => {
  const countryCode = currencyToCountry[currency];
  
  if (!countryCode) {
    return (
      <div className="currency-flag-fallback">
        {currency}
      </div>
    );
  }

  return (
    <div className="currency-flag-wrapper">
      <ReactCountryFlag
        countryCode={countryCode}
        svg
        // cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/1x1/"
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          objectFit: 'cover'
        }}
        title={currency}
      />
    </div>
  );
};

export default CurrencyFlag;