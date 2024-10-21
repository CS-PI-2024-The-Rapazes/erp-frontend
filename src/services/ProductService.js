import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const URL_CONTROLLER_PRODUCT = "v1/produto";

export async function getProductById(id) {
    try {
        const response = await axios.get(`${API_URL}/${URL_CONTROLLER_PRODUCT}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getAllProducts(page = 0, size = 10) {
    try {
        const response = await axios.get(`${API_URL}/${URL_CONTROLLER_PRODUCT}/all`, {
            params: {
                page: page,
                size: size
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}


export async function save(data) {
    try {
        const response = await axios.post(`${API_URL}/${URL_CONTROLLER_PRODUCT}/edit`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function edit(data) {
    try {
        const response = await axios.put(`${API_URL}/${URL_CONTROLLER_PRODUCT}/edit`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function deleteProduct(id) {
    try {
        const response = await axios.delete(`${API_URL}/${URL_CONTROLLER_PRODUCT}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
