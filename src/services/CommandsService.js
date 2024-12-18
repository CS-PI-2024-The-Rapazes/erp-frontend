import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const URL_COMMAND = "v1/comanda"

export async function save(data) {
    try {
        console.log(data);
        const response = await axios.post(`${API_URL}/${URL_COMMAND}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getAllCommands(page = 0, size = 10) {
    try {
        const response = await axios.get(`${API_URL}/${URL_COMMAND}/all`, {
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