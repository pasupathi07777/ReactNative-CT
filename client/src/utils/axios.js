import axios from 'axios';

export const axiosInstance = axios.create({
  // baseURL: 'http://192.168.1.41:5000/api',
  baseURL: 'http://192.168.0.244:5000/api',
  withCredentials: true,
});
