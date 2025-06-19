// src/services/api.js
const API_BASE_URL = 'http://localhost:8000'; 

export const convertCurrency = async (from, to, amount) => {
  try {
    const response = await fetch(`${API_BASE_URL}/convert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        from_currency: from,
        to_currency: to
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Conversion result:', data);
    return data;
  } catch (error) {
    console.error('Conversion failed:', error);
    throw error;
  }
};

export const fetchCurrencies = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/currencies`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Currencies fetched:', data);
    return data;
  } catch (error) {
    console.error('Failed to fetch currencies:', error);
    throw error;
  }
};