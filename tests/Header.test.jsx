import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Header from '../src/Components/Header';

vi.mock('../src/services/weatherService');
vi.mock('../src/Components/utils/InfoModal', () => {
    return { default: () => <div>Mocked InfoModal</div> };
});

describe('Header Component', () => {
    const mockFavouritePlace = [];
    const mockResetFavourites = vi.fn();

    const setup = (initialEntries = ['/']) => {
        render(
            <MemoryRouter initialEntries={initialEntries}>
                <Routes>
                    <Route path="/" element={<Header favouritePlace={mockFavouritePlace} resetFavourites={mockResetFavourites} />} />
                    <Route path="/login" element={<div>Login Page</div>} />
                    <Route path="/register" element={<div>Register Page</div>} />
                    <Route path="/all-favourites" element={<div>All Favourite Places</div>} />
                    <Route path="/update-password" element={<div>Update Password Page</div>} />
                    <Route path="/weather/:location" element={<div>Weather Page</div>} />
                </Routes>
            </MemoryRouter>
        );
    };

    it('renders Header component and checks for basic elements', () => {
        // Arrange: Set up the Header component
        setup();

        // Assert: Check for the presence of basic elements
        expect(screen.getByText(/WeatherWhenever/i)).toBeTruthy();
        expect(screen.getByText(/Home/i)).toBeTruthy();
        expect(screen.getByText(/Login/i)).toBeTruthy();
    });

    it('logs in and logs out correctly', async () => {
        // Arrange: Set token in localStorage to simulate logged in state and set up the Header component
        localStorage.setItem('token', 'test-token');
        setup();

        // Assert: Check that the Logout link is present
        await waitFor(() => {
            expect(screen.getByText(/Logout/i)).toBeTruthy();
        });

        // Act: Click the Logout link
        fireEvent.click(screen.getByText(/Logout/i));

        // Assert: Check that the Login link is present and the token has been removed from localStorage
        await waitFor(() => {
            expect(screen.getByText(/Login/i)).toBeTruthy();
        });
        expect(localStorage.getItem('token')).toBe(null);
    });

    it('navigates to update password page when link is clicked', async () => {
        // Arrange: Set token in localStorage to simulate logged in state and set up the Header component
        localStorage.setItem('token', 'test-token');
        setup();

        // Act: Click the Update Password link
        fireEvent.click(screen.getByText(/Update Password/i));

        // Assert: Check that the Update Password Page is displayed
        await waitFor(() => {
            expect(screen.getByText(/Update Password Page/i)).toBeTruthy();
        });
    });
});
