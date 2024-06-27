import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import {
    updatePassword,
    registerUser,
    loginUser,
    getFavouriteLocations,
    addFavouriteLocation,
    removeFavouriteLocation
} from "../../src/services/userService";
import testUsers from "../data/testUser.js";
const { newUser, invalidUser } = testUsers;

vi.mock("axios");

describe("User Services Tests", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("Register User Tests", () => {
        const mockRegisterResponse = { _id: "60d0fe4f5311236168a109cc", email: "newuser@example.com" };

        it("should make the correct API call to register a user", async () => {
            // Arrange
            axios.post.mockResolvedValueOnce({ data: mockRegisterResponse });
            // Act
            await registerUser(newUser);
            // Assert
            expect(axios.post).toHaveBeenCalledWith(
                "http://127.0.0.1:3000/register",
                newUser,
                { headers: { 'Content-Type': 'application/json' } }
            );
        });

        it("should return the registered user data", async () => {
            // Arrange
            axios.post.mockResolvedValueOnce({ data: mockRegisterResponse });
            // Act
            const result = await registerUser(newUser);
            // Assert
            expect(result).toEqual(mockRegisterResponse);
        });

        it("should return an error if registration request fails", async () => {
            // Arrange
            const error = { response: { data: { message: "Error" } } };
            axios.post.mockRejectedValueOnce(error);
            // Act
            const result = await registerUser(newUser);
            // Assert
            expect(result).toEqual(error);
        });

        it("should return an error if the password is too short", async () => {
            // Arrange
            const error = { response: { data: { message: "Password must be at least 8 characters long." } } };
            axios.post.mockRejectedValueOnce(error);
            // Act
            const result = await registerUser(invalidUser);
            // Assert
            expect(result.response.data.message).toEqual("Password must be at least 8 characters long.");
        });
    });

    describe("Login User Tests", () => {
        const mockLoginResponse = { token: "testtoken" };
        const validLoginData = { email: "testuser1@example.com", password: "Password123!" };

        it("should make the correct API call to login a user", async () => {
            // Arrange
            axios.post.mockResolvedValueOnce({ data: mockLoginResponse });
            // Act
            await loginUser(validLoginData);
            // Assert
            expect(axios.post).toHaveBeenCalledWith(
                "http://127.0.0.1:3000/login",
                validLoginData,
                { headers: { 'Content-Type': 'application/json' } }
            );
        });

        it("should return the login token", async () => {
            // Arrange
            axios.post.mockResolvedValueOnce({ data: mockLoginResponse });
            // Act
            const result = await loginUser(validLoginData);
            // Assert
            expect(result).toEqual(mockLoginResponse);
        });

        it("should return an error if login request fails", async () => {
            // Arrange
            const error = { response: { data: { message: "Error" } } };
            axios.post.mockRejectedValueOnce(error);
            // Act
            const result = await loginUser(validLoginData);
            // Assert
            expect(result).toEqual(error);
        });

        it("should return an error if email is missing", async () => {
            // Arrange
            const error = { response: { data: { message: "Email is required." } } };
            axios.post.mockRejectedValueOnce(error);
            // Act
            const result = await loginUser({ password: "Password123!" });
            // Assert
            expect(result.response.data.message).toEqual("Email is required.");
        });

        it("should return an error if password is missing", async () => {
            // Arrange
            const error = { response: { data: { message: "Password is required." } } };
            axios.post.mockRejectedValueOnce(error);
            // Act
            const result = await loginUser({ email: "testuser1@example.com" });
            // Assert
            expect(result.response.data.message).toEqual("Password is required.");
        });
    });
});