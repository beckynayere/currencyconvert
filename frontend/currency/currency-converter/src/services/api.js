import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const convertCurrency = async (from, to, amount) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/convert`, {
      amount,
      from_currency: from,
      to_currency: to
    });
    return response.data;
  } catch (error) {
    console.error('Conversion error:', error.response?.data || error.message);
    throw error;
  }
};

export const fetchCurrencies = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/currencies`);
    return response.data;
  } catch (error) {
    console.error('Fetch currencies error:', error.response?.data || error.message);
    throw error;
  }
};


// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8000';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 10000, // 10 second timeout
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// export const convertCurrency = async (from, to, amount) => {
//   try {
//     // Input validation
//     const fromCurrency = String(from).toUpperCase().trim();
//     const toCurrency = String(to).toUpperCase().trim();
//     const numericAmount = parseFloat(amount);

//     if (!fromCurrency || !toCurrency || isNaN(numericAmount) || numericAmount <= 0) {
//       throw new Error('Invalid input parameters');
//     }

//     // Same currency shortcut
//     if (fromCurrency === toCurrency) {
//       return {
//         converted: numericAmount,
//         rate: 1,
//         isSameCurrency: true
//       };
//     }

//     const response = await api.post('/convert', {
//       amount: numericAmount,
//       from_currency: fromCurrency,
//       to_currency: toCurrency
//     });

//     // Validate response structure
//     if (!response.data || 
//         typeof response.data.convertedAmount === 'undefined' || 
//         typeof response.data.exchangeRate === 'undefined') {
//       throw new Error('Invalid API response structure');
//     }

//     // Convert and validate numbers
//     const rate = parseFloat(response.data.exchangeRate);
//     const converted = parseFloat(response.data.convertedAmount);

//     if (isNaN(rate)) throw new Error('Invalid exchange rate');
//     if (isNaN(converted)) throw new Error('Invalid converted amount');

//     // Verify the math
//     const expected = numericAmount * rate;
//     if (Math.abs(converted - expected) > 0.01) {
//       console.warn(`Math discrepancy: Expected ${expected} but got ${converted}`);
//     }

//     return {
//       converted,
//       rate,
//       isSameCurrency: false
//     };

//   } catch (error) {
//     console.error('Conversion error:', {
//       error: error.response?.data || error.message,
//       request: { from, to, amount }
//     });
//     throw new Error(error.response?.data?.message || 'Conversion failed. Please try again.');
//   }
// };

// export const fetchCurrencies = async () => {
//   try {
//     const response = await api.get('/currencies');
//     return response.data;
//   } catch (error) {
//     console.error('Failed to fetch currencies:', error);
//     throw new Error('Failed to load available currencies');
//   }
// };

// // services/api.js
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8000'; // Or your actual API URL

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 10000, // 10 second timeout
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// export const convertCurrency = async (from, to, amount) => {
//   try {
//     // Input validation
//     const numericAmount = parseFloat(amount);
//     if (isNaN(numericAmount) || numericAmount <= 0) {
//       throw new Error('Please enter a valid positive amount');
//     }

//     const response = await api.post('/convert', {
//       from_currency: from.toUpperCase(),
//       to_currency: to.toUpperCase(),
//       amount: numericAmount
//     });

//     // Validate response structure
//     if (!response.data?.convertedAmount || !response.data?.exchangeRate) {
//       throw new Error('Invalid API response format');
//     }

//     return {
//       converted: response.data.convertedAmount,
//       rate: response.data.exchangeRate,
//       isSameCurrency: from.toUpperCase() === to.toUpperCase()
//     };
//   } catch (error) {
//     console.error('Conversion error:', error);
//     throw new Error(error.response?.data?.message || 'Conversion failed. Please try again.');
//   }
// };

// export const fetchCurrencies = async () => {
//   try {
//     const response = await api.get('/currencies');
//     return response.data;
//   } catch (error) {
//     console.error('Failed to fetch currencies:', error);
//     throw new Error('Failed to load available currencies');
//   }
// };


// services/api.js
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8000'; // Or your actual API URL

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 10000, // 10 second timeout
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// export const convertCurrency = async (from, to, amount) => {
//   try {
//     // Input validation
//     const numericAmount = parseFloat(amount);
//     if (isNaN(numericAmount) || numericAmount <= 0) {
//       throw new Error('Please enter a valid positive amount');
//     }

//     const response = await api.post('/convert', {
//       from_currency: from.toUpperCase(),
//       to_currency: to.toUpperCase(),
//       amount: numericAmount
//     });

//     // Validate response structure
//     if (!response.data?.convertedAmount || !response.data?.exchangeRate) {
//       throw new Error('Invalid API response format');
//     }

//     return {
//       converted: response.data.convertedAmount,
//       rate: response.data.exchangeRate,
//       isSameCurrency: from.toUpperCase() === to.toUpperCase()
//     };
//   } catch (error) {
//     console.error('Conversion error:', error);
//     throw new Error(error.response?.data?.message || 'Conversion failed. Please try again.');
//   }
// };

// export const fetchCurrencies = async () => {
//   try {
//     const response = await api.get('/currencies');
//     return response.data;
//   } catch (error) {
//     console.error('Failed to fetch currencies:', error);
//     throw new Error('Failed to load available currencies');
//   }
// };