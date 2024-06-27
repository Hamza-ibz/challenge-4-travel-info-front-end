import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import {
    updatePassword,
    registerUser,
    loginUser,
    getFavouriteLocations,
    addFavouriteLocation,
    removeFavouriteLocation
} from '../../src/services/userService';

// Mock axios
vi.mock('axios');

const BASE_URL = 'http://127.0.0.1:3000';

describe('userService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    describe('updatePassword', () => {
        it('should update the password successfully', async () => {
            const formData = { password: 'newPassword' };
            const responseData = { message: 'Password updated successfully' };
            axios.post.mockResolvedValue({ data: responseData });

            localStorage.setItem('token', 'test-token');
            const result = await updatePassword(formData);

            expect(result).toEqual(responseData);
            expect(axios.post).toHaveBeenCalledWith(
                `${BASE_URL}/update-password`,
                formData,
                { headers: { 'Authorization': `Bearer test-token` } }
            );
        });

        it('should return an error when update fails', async () => {
            const formData = { password: 'newPassword' };
            const errorMessage = 'An error occurred while updating the password';
            axios.post.mockRejectedValue({ response: { data: { message: errorMessage } } });

            localStorage.setItem('token', 'test-token');
            const result = await updatePassword(formData);

            expect(result).toBeInstanceOf(Error);
            expect(result.message).toBe(errorMessage);
        });
    });

    describe('registerUser', () => {
        it('should register the user successfully', async () => {
            const formData = { username: 'testuser', password: 'testpassword' };
            const responseData = { message: 'User registered successfully' };
            axios.post.mockResolvedValue({ data: responseData });

            const result = await registerUser(formData);

            expect(result).toEqual(responseData);
            expect(axios.post).toHaveBeenCalledWith(
                `${BASE_URL}/register`,
                formData,
                { headers: { 'Content-Type': 'application/json' } }
            );
        });

    });

    describe('loginUser', () => {
        it('should login the user successfully', async () => {
            const formData = { username: 'testuser', password: 'testpassword' };
            const responseData = { token: 'test-token' };
            axios.post.mockResolvedValue({ data: responseData });

            const result = await loginUser(formData);

            expect(result).toEqual(responseData);
            expect(axios.post).toHaveBeenCalledWith(
                `${BASE_URL}/login`,
                formData,
                { headers: { 'Content-Type': 'application/json' } }
            );
        });


    });

    describe('getFavouriteLocations', () => {
        it('should fetch favourite locations successfully', async () => {
            const responseData = [{ location: 'New York' }];
            axios.get.mockResolvedValue({ data: responseData });

            localStorage.setItem('token', 'test-token');
            const result = await getFavouriteLocations();

            expect(result).toEqual(responseData);
            expect(axios.get).toHaveBeenCalledWith(
                `${BASE_URL}/favouriteLocations`,
                { headers: { 'Authorization': `Bearer test-token` } }
            );
        });

        it('should return an error when fetching favourite locations fails', async () => {
            const errorMessage = 'An error occurred while fetching favourite locations';
            axios.get.mockRejectedValue({ response: { data: { message: errorMessage } } });

            localStorage.setItem('token', 'test-token');
            const result = await getFavouriteLocations();

            expect(result).toBeInstanceOf(Error);
            expect(result.message).toBe(errorMessage);
        });

        it('should return an error when no token is found', async () => {
            const result = await getFavouriteLocations();

            expect(result).toBeInstanceOf(Error);
            expect(result.message).toBe('No token found, please login');
        });
    });

    describe('addFavouriteLocation', () => {
        it('should add a favourite location successfully', async () => {
            const location = 'New York';
            const responseData = { message: 'Location added successfully' };
            axios.post.mockResolvedValue({ data: responseData });

            localStorage.setItem('token', 'test-token');
            const result = await addFavouriteLocation(location);

            expect(result).toEqual(responseData);
            expect(axios.post).toHaveBeenCalledWith(
                `${BASE_URL}/favouriteLocations`,
                { location },
                {
                    headers: {
                        'Authorization': `Bearer test-token`,
                        'Content-Type': 'application/json'
                    }
                }
            );
        });


        it('should return an error when no token is found', async () => {
            const location = 'New York';
            const result = await addFavouriteLocation(location);

            expect(result).toBeInstanceOf(Error);
            expect(result.message).toBe('No token found, please login');
        });
    });

    describe('removeFavouriteLocation', () => {
        it('should remove a favourite location successfully', async () => {
            const location = 'New York';
            const responseData = { message: 'Location removed successfully' };
            axios.delete.mockResolvedValue({ data: responseData });

            localStorage.setItem('token', 'test-token');
            const result = await removeFavouriteLocation(location);

            expect(result).toEqual(responseData);
            expect(axios.delete).toHaveBeenCalledWith(
                `${BASE_URL}/favouriteLocations`,
                {
                    headers: {
                        'Authorization': `Bearer test-token`,
                        'Content-Type': 'application/json'
                    },
                    data: { location }
                }
            );
        });

        it('should return an error when no token is found', async () => {
            const location = 'New York';
            const result = await removeFavouriteLocation(location);

            expect(result).toBeInstanceOf(Error);
            expect(result.message).toBe('No token found, please login');
        });
    });
});
