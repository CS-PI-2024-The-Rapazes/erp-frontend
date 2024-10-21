import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const URL_CONTROLLER_FORGOT = "v1/forgot-password/"
const URL_CONTROLLER_AUTH = "v1/auth/"

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export async function authenticate(data) {
    try {
        const response = await axios.post(`${API_URL}/${URL_CONTROLLER_AUTH}authenticate`, data);
        return response.data;
    } catch (error) {
        throw error; 
    }
}

export async function verifyMail(data) {
    try {
        const response = await axios.post(`${API_URL}/${URL_CONTROLLER_FORGOT}verify-mail`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function changePassword(data) {
    try {
        const response = await axios.post(`${API_URL}/${URL_CONTROLLER_FORGOT}change-password`, data);
        return response.data;
    } catch (error) {   
        throw error;
    }
}

export async function cadastre(data) {
    try {
        const response = await axios.post(`${API_URL}/${URL_CONTROLLER_AUTH}register`, data);
        return response.data;
    } catch (error) {   
        throw error;
    }
}
