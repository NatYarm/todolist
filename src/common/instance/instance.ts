import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: { 'API-KEY': '3366c5e6-1cfe-418f-97d8-a19e39d7b27d' },
});
