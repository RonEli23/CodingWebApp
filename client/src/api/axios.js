import axios from 'axios';
const BASE_URL = 'https://codingwebapp-api.onrender.com';

export default axios.create({
    baseURL: BASE_URL
});