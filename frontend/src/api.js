import axios from 'axios';

// Using hardcoded URL for production to ensure reliability on Vercel
export const API_URL = 'https://shagunfab.onrender.com';

const instance = axios.create({
    baseURL: API_URL,
});

export default instance;
