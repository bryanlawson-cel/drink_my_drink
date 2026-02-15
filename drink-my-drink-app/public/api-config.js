// API Configuration
// For local development: http://localhost:8888/api
// For production: Will use the deployed Netlify URL automatically
const API_BASE = window.location.hostname === 'localhost' 
  ? 'http://localhost:8888/.netlify/functions/api'
  : '/.netlify/functions/api';
