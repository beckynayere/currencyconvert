const CACHE_NAME = 'currency-converter-v1';
const API_CACHE_NAME = 'currency-api-cache';

// Cache important static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/favicon.ico',
        // Add other important assets
      ]))
  );
});

// Network-first strategy for API calls
const fetchWithCache = async (url) => {
  const cache = await caches.open(API_CACHE_NAME);
  try {
    const response = await fetch(url);
    if (response.ok) {
      await cache.put(url, response.clone());
      return response;
    }
    throw new Error('Network response was not ok');
  } catch (error) {
    const cachedResponse = await cache.match(url);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
};

// Update the api.js service to use caching
export const fetchExchangeRates = async (baseCurrency = 'USD') => {
  const url = `https://open.er-api.com/v6/latest/${baseCurrency}`;
  const response = await fetchWithCache(url);
  return response.json();
};