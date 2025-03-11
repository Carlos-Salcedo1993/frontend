import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://backend-epy9.onrender.com/api/',
})