import axios from 'axios';
const BASE_URL = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_BASE_URL
  : process.env.REACT_APP_LOCAL_API_BASE_URL;


export default axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // Timeout after 5 seconds
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

