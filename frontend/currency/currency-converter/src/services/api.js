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
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// /**
//  * Fetch all available currencies
//  * @returns {Promise<Object>} - { USD: "US Dollar", EUR: "Euro", ... }
//  */
// export const fetchCurrencies = async () => {
//   try {
//     const response = await fetch(`${API_URL}/currencies`);
    
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
    
//     // Ensure the response matches your component's expectations
//     if (!data.currencies && typeof data === 'object') {
//       return data; // Backend returns { USD: "Dollar", ... } directly
//     }
    
//     return data.currencies || {}; // For { currencies: { USD: "Dollar" } } format
//   } catch (error) {
//     console.error('Failed to fetch currencies:', error);
//     throw new Error(error.message || 'Currency fetch failed');
//   }
// };

// /**
//  * Convert between currencies
//  * @param {string} from - Currency code (e.g., "USD")
//  * @param {string} to - Currency code (e.g., "EUR")
//  * @param {number|string} amount - Amount to convert
//  * @returns {Promise<{converted: number, rate: number}>}
//  */
// export const convertCurrency = async (from, to, amount) => {
//   try {
//     const numericAmount = parseFloat(amount);
//     if (isNaN(numericAmount)) {
//       throw new Error('Invalid amount');
//     }

//     const response = await fetch(`${API_URL}/convert`, {
//       method: 'POST',
//       headers: { 
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         from_currency: from,
//         to_currency: to,
//         amount: numericAmount,
//       }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => ({}));
//       throw new Error(errorData.message || `Conversion failed (HTTP ${response.status})`);
//     }

//     const result = await response.json();

//     // Transform response to match your component's expectations
//     return {
//       converted: result.converted_amount || result.converted, // Handles different API response formats
//       rate: result.rate,
//     };
//   } catch (error) {
//     console.error('Conversion error:', error);
//     throw new Error(error.message || 'Currency conversion failed');
//   }
// };


// const API_URL = import.meta.env.VITE_API_URL || 'https://currencyconvert-brme.onrender.com';

// /**
//  * Fetch all available currencies
//  * @returns {Promise<Object>} - { USD: "US Dollar", EUR: "Euro", ... }
//  */
// export const fetchCurrencies = async () => {
//   try {
//     const response = await fetch(`${API_URL}/currencies`, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//       },
//       credentials: 'include'
//     });
    
//     if (!response.ok) {
//       const error = await response.json().catch(() => ({}));
//       throw new Error(error.detail || `HTTP error! status: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Failed to fetch currencies:', error);
//     throw new Error(error.message || 'Currency fetch failed');
//   }
// };

// /**
//  * Convert between currencies
//  * @param {string} from - Currency code (e.g., "USD")
//  * @param {string} to - Currency code (e.g., "EUR")
//  * @param {number|string} amount - Amount to convert
//  * @returns {Promise<{converted_amount: number, rate: number}>}
//  */
// export const convertCurrency = async (from, to, amount) => {
//   try {
//     const numericAmount = parseFloat(amount);
//     if (isNaN(numericAmount)) {
//       throw new Error('Invalid amount');
//     }

//     const response = await fetch(`${API_URL}/convert`, {
//       method: 'POST',
//       headers: { 
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//       },
//       credentials: 'include',
//       body: JSON.stringify({
//         from_currency: from,
//         to_currency: to,
//         amount: numericAmount,
//       }),
//     });

//     if (!response.ok) {
//       const error = await response.json().catch(() => ({}));
//       throw new Error(error.detail || `Conversion failed (HTTP ${response.status})`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Conversion error:', error);
//     throw new Error(error.message || 'Currency conversion failed');
//   }
// };


// src/api.js


// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// const handleApiError = (error) => {
//   console.error("API Error:", error);
//   throw new Error(error.message || "Network request failed");
// };

// export const fetchCurrencies = async () => {
//   try {
//     const response = await fetch(`${API_URL}/currencies`, {
//       mode: "cors",
//       credentials: "include",
//       headers: {
//         "Accept": "application/json",
//         "Content-Type": "application/json"
//       }
//     });

//     if (!response.ok) {
//       const error = await response.json().catch(() => ({}));
//       throw new Error(error.message || `HTTP ${response.status}`);
//     }

//     const data = await response.json();
//     return data.currencies || data;
//   } catch (err) {
//     return handleApiError(err);
//   }
// };

// export const convertCurrency = async (from, to, amount) => {
//   const numericAmount = parseFloat(amount);
//   if (Number.isNaN(numericAmount)) {
//     throw new Error("Amount must be a number");
//   }

//   try {
//     const response = await fetch(`${API_URL}/convert`, {
//       method: "POST",
//       mode: "cors",
//       credentials: "include",
//       headers: { 
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//       },
//       body: JSON.stringify({
//         from_currency: from,
//         to_currency: to,
//         amount: numericAmount
//       })
//     });

//     if (!response.ok) {
//       const error = await response.json().catch(() => ({}));
//       throw new Error(error.message || `HTTP ${response.status}`);
//     }

//     const result = await response.json();
//     return {
//       converted: result.converted_amount ?? result.converted,
//       rate: result.rate
//     };
//   } catch (err) {
//     return handleApiError(err);
//   }
// };


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

/**
 * GET /currencies
 * @returns {Promise<Record<string,string>>}  e.g. { USD: "United States Dollar", ... }
 */
export const fetchCurrencies = async () => {
  try {
    const response = await fetch(`${API_URL}/currencies`, { mode: "cors" });

    if (!response.ok) {
      throw new Error(`Currency fetch failed (HTTP ${response.status})`);
    }

    const data = await response.json();

    // Backward compatibility for two possible payload shapes
    if (!data.currencies && typeof data === "object") {
      return data;
    }
    return data.currencies || {};
  } catch (err) {
    console.error("fetchCurrencies →", err);
    throw new Error(`Currency fetch failed: ${err.message}`);
  }
};

/**
 * POST /convert
 * @param {string} from  Code (e.g. "USD")
 * @param {string} to    Code (e.g. "KES")
 * @param {number|string} amount
 * @returns {Promise<{converted:number, rate:number}>}
 */
export const convertCurrency = async (from, to, amount) => {
  const numericAmount = parseFloat(amount);
  if (Number.isNaN(numericAmount)) {
    throw new Error("Amount must be a number");
  }

  try {
    const response = await fetch(`${API_URL}/convert`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        from_currency: from,
        to_currency: to,
        amount: numericAmount,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || `Conversion failed (HTTP ${response.status})`
      );
    }

    const result = await response.json();
    return {
      converted: result.converted_amount || result.converted,
      rate: result.rate,
    };
  } catch (err) {
    console.error("convertCurrency →", err);
    throw new Error(`Currency conversion failed: ${err.message}`);
  }
};
