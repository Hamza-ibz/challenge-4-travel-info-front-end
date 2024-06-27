import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { vi } from 'vitest';
import Search from '../src/Components/pages/home/Search';
import { getWeatherService } from '../src/services/weatherService';

// Mock the weather service
vi.mock('../src/services/weatherService');

// Mock react-router-dom with actual implementation and navigate mock
vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

describe('Search Component', () => {
    const mockNavigate = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        useNavigate.mockReturnValue(mockNavigate);
    });

    test('renders Search component correctly', () => {
        render(
            <MemoryRouter>
                <Search />
            </MemoryRouter>
        );

        expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
    });

    test('displays error message when location is not found', async () => {
        getWeatherService.mockResolvedValueOnce(new Error('Location not found'));

        render(
            <MemoryRouter>
                <Search />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText(/Search/i), { target: { value: 'InvalidLocation' } });
        fireEvent.click(screen.getByRole('button', { name: /Search/i }));

        await waitFor(() => {
            const errorElements = screen.getAllByText(/Location not found, please check input/i);
            expect(errorElements).toHaveLength(2); // Ensuring both the paragraph and modal messages are rendered
            expect(errorElements[0]).toBeInTheDocument();
        });
    });

    test('navigates to weather page on successful search', async () => {
        getWeatherService.mockResolvedValueOnce({ name: 'ValidLocation' });

        render(
            <MemoryRouter>
                <Search />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText(/Search/i), { target: { value: 'ValidLocation' } });
        fireEvent.click(screen.getByRole('button', { name: /Search/i }));

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/weather/ValidLocation');
        });
    });
});
