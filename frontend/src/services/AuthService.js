// /services/authService.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const refreshAccessToken = async () => {
  try {
    const response = await api.post('/refresh-token-endpoint');
    return response.data.accessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error; // Propagate the error to handle it in the AuthProvider
  }
};
