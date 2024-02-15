import axios from 'axios';
import Cookies from 'js-cookie';
const BASE_URL = 'https://codingwebapp-api.onrender.com'; //https://codingwebapp-api.onrender.com http://127.0.0.1:8080



export default axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

