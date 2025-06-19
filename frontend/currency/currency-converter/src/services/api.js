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


