// API Helper Functions for Drink My Drink App

const API_BASE = window.location.hostname === 'localhost' 
  ? 'http://localhost:8888/.netlify/functions/api'
  : '/.netlify/functions/api';

// Helper function to make API calls
async function apiCall(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE}/${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// User API functions
const UserAPI = {
  async register(username, password) {
    return await apiCall('register', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
  },
  
  async login(username, password) {
    return await apiCall('login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
  }
};

// Coffee API functions
const CoffeeAPI = {
  async getUserCoffees(userId) {
    const data = await apiCall(`coffees/user/${userId}`, { method: 'GET' });
    return data.coffees || [];
  },
  
  async create(userId, coffee) {
    return await apiCall('coffees', {
      method: 'POST',
      body: JSON.stringify({ userId, ...coffee })
    });
  },
  
  async update(coffeeId, coffee) {
    return await apiCall(`coffees/${coffeeId}`, {
      method: 'PUT',
      body: JSON.stringify(coffee)
    });
  },
  
  async delete(coffeeId) {
    return await apiCall(`coffees/${coffeeId}`, { method: 'DELETE' });
  }
};

// Rating API functions
const RatingAPI = {
  async getUserRatings(userId) {
    const data = await apiCall(`ratings/user/${userId}`, { method: 'GET' });
    return data.ratings || {};
  },
  
  async submit(userId, coffeeId, rating, hashtags) {
    return await apiCall('ratings', {
      method: 'POST',
      body: JSON.stringify({ userId, coffeeId, rating, hashtags })
    });
  }
};
