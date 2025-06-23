// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8000';


// export const convertCurrency = async (from, to, amount) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/convert`, {
//       amount,
//       from_currency: from,
//       to_currency: to
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Conversion error:', error.response?.data || error.message);
//     throw error;
//   }
// };

// // Fetch supported currencies from backend
// export const fetchCurrencies = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/currencies`);
//     return response.data.currencies; // ✅ Only return the "currencies" dictionary
//   } catch (error) {
//     console.error('Fetch currencies error:', error.response?.data || error.message);
//     throw error;
//   }
// };


// api.js
// src/services/api.js

// src/services/api.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Fetch all available currencies
 * @returns {Promise<Object>} - { USD: "US Dollar", EUR: "Euro", ... }
 */
export const fetchCurrencies = async () => {
  try {
    const response = await fetch(`${API_URL}/currencies`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Ensure the response matches your component's expectations
    if (!data.currencies && typeof data === 'object') {
      return data; // Backend returns { USD: "Dollar", ... } directly
    }
    
    return data.currencies || {}; // For { currencies: { USD: "Dollar" } } format
  } catch (error) {
    console.error('Failed to fetch currencies:', error);
    throw new Error(error.message || 'Currency fetch failed');
  }
};

/**
 * Convert between currencies
 * @param {string} from - Currency code (e.g., "USD")
 * @param {string} to - Currency code (e.g., "EUR")
 * @param {number|string} amount - Amount to convert
 * @returns {Promise<{converted: number, rate: number}>}
 */
export const convertCurrency = async (from, to, amount) => {
  try {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) {
      throw new Error('Invalid amount');
    }

    const response = await fetch(`${API_URL}/convert`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from_currency: from,
        to_currency: to,
        amount: numericAmount,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Conversion failed (HTTP ${response.status})`);
    }

    const result = await response.json();

    // Transform response to match your component's expectations
    return {
      converted: result.converted_amount || result.converted, // Handles different API response formats
      rate: result.rate,
    };
  } catch (error) {
    console.error('Conversion error:', error);
    throw new Error(error.message || 'Currency conversion failed');
  }
};