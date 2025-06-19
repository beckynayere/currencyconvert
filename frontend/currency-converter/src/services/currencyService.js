import axios from 'axios';

const API_URL = 'https://api.exchangerate.host';

export async function getExchangeRate(base, target) {
  const response = await axios.get(`${API_URL}/latest?base=${base}&symbols=${target}`);
  return response.data.rates[target];
}