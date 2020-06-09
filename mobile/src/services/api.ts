import axios from 'axios';
import config from '../config/configuration';

const api = axios.create({
    baseURL: config.urlService
});

export default api;