import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import Weather from '../src/Components/Weather';
import { getWeatherService, getForecastService } from '../src/services/weatherService';
import { addFavouriteLocation, removeFavouriteLocation } from '../src/services/userService';

vi.mock('../src/services/weatherService');
vi.mock('../src/services/userService');

const mockFavouritePlace = [{ location: 'London' }];
const mockSetLoadFavourite = vi.fn();

describe('Weather Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('renders Weather component and displays loading text', async () => {
        getWeatherService.mockResolvedValueOnce({ name: 'London', main: { temp: 300 }, weather: [{ description: 'Clear sky', icon: '01d' }] });
        getForecastService.mockResolvedValueOnce({ city: { name: 'London' }, list: [] });

        render(
            <MemoryRouter initialEntries={['/weather/London']}>
                <Routes>
                    <Route path="/weather/:location" element={<Weather favouritePlace={mockFavouritePlace} setLoadFavourite={mockSetLoadFavourite} />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText(/Telling you about../i)).toBeInTheDocument();
        expect(screen.getAllByText(/Loading.../i)).toHaveLength(3);
    });

    test('adds a location to favourites', async () => {
        getWeatherService.mockResolvedValueOnce({ name: 'London', main: { temp: 300 }, weather: [{ description: 'Clear sky', icon: '01d' }] });
        getForecastService.mockResolvedValueOnce({ city: { name: 'London' }, list: [] });
        addFavouriteLocation.mockResolvedValueOnce({ message: 'Favourite location added successfully.' });

        render(
            <MemoryRouter initialEntries={['/weather/London']}>
                <Routes>
                    <Route path="/weather/:location" element={<Weather favouritePlace={mockFavouritePlace} setLoadFavourite={mockSetLoadFavourite} />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getAllByText(/London/i)[0]).toBeInTheDocument());

        fireEvent.click(screen.getByText(/Click icon to add to favourites/i));

        await waitFor(() => {
            expect(screen.getByText(/Click icon to remove from favourites/i)).toBeInTheDocument();
        });
    });



});
