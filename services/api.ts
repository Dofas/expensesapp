import { REACT_APP_FIREBASE_ENDPOINT } from '@env';
import axios from 'axios';

const api = axios.create({
  baseURL: REACT_APP_FIREBASE_ENDPOINT
});

export default api;
