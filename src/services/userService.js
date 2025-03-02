import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:3000';

export const updatePassword = async (formData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${BASE_URL}/update-password`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return new Error(error.response?.data?.message || 'An error occurred while updating the password.');
    }
};

export const registerUser = async (formData) => {
    // console.log(formData);
    try {
        const response = await axios.post(`${BASE_URL}/register`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
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
        return response.data;
    } catch (error) {
        // throw new Error(error.response?.data?.message || error.message);
        return error;
    }
};

// Fetch favourite locations
export const getFavouriteLocations = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return new Error('No token found, please login');
        }

        const response = await axios.get(`${BASE_URL}/favouriteLocations`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.log('Error fetching favourite locations:', error);
        return new Error(error.response?.data?.message || 'An error occurred while fetching favourite locations.');
    }
};


// Add a favourite location
export const addFavouriteLocation = async (location) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return new Error('No token found, please login');
        }

        const response = await axios.post(
            `${BASE_URL}/favouriteLocations`,
            { location },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log('Error adding favourite location:', error);
        return error;
    }
};

export const removeFavouriteLocation = async (location) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return new Error('No token found, please login');
        }

        const response = await axios.delete(
            `${BASE_URL}/favouriteLocations`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: { location } // Use `data` to send the body in a DELETE request
            }
        );
        return response.data;
    } catch (error) {
        console.log('Error removing favourite location:', error);
        return error;
    }
};
