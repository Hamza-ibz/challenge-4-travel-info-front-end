import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Header from '../src/Components/Header';
// import { getWeatherService } from '../src/services/weatherService';
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
        setup();
        expect(screen.getByText(/WeatherWhenever/i)).toBeTruthy();
        expect(screen.getByText(/Home/i)).toBeTruthy();
        expect(screen.getByText(/Login/i)).toBeTruthy();
    });
    it('logs in and logs out correctly', async () => {
        // Setting token in localStorage to simulate logged in state
        localStorage.setItem('token', 'test-token');
        setup();
        await waitFor(() => {
            expect(screen.getByText(/Logout/i)).toBeTruthy();
        });
        fireEvent.click(screen.getByText(/Logout/i));
        await waitFor(() => {
            expect(screen.getByText(/Login/i)).toBeTruthy();
        });
        // Check that localStorage token has been removed
        expect(localStorage.getItem('token')).toBe(null);
    });
    it('navigates to update password page when link is clicked', async () => {
        // Setting token in localStorage to simulate logged in state
        localStorage.setItem('token', 'test-token');
        setup();
        fireEvent.click(screen.getByText(/Update Password/i));
        await waitFor(() => {
            expect(screen.getByText(/Update Password Page/i)).toBeTruthy();
        });
    });

});