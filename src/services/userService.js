import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:3000'; // Replace with your actual backend API base URL

const workingWithResponse = async (response) => {
    if (response.ok) {
        return await response.json();
    } else {
        const error = await response.json();
        throw new Error(error.message);
    }
};

export const registerUser = async (formData) => {
    console.log(formData);
    try {
        const response = await axios.post(`${BASE_URL}/register`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data; // Assuming you want to work with response data
    } catch (error) {
        // throw new Error(error.response?.data?.message || error.message);
        return error;
    }
};

export const loginUser = async (formData) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data; // Assuming you want to work with response data
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};