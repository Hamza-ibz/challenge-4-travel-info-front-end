import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { vi } from 'vitest';
import AllFavouritePlaces from '../src/Components/AllFavouritePlaces';
import { removeFavouriteLocation } from '../src/services/userService';

// Mock the removeFavouriteLocation function
vi.mock('../src/services/userService', () => ({
    removeFavouriteLocation: vi.fn(),
}));

const mockSetLoadFavourite = vi.fn();

const mockFavouritePlace = [
    { location: 'New York' },
    { location: 'Los Angeles' },
];

describe('AllFavouritePlaces Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the component correctly', () => {
        render(
            <Router>
                <AllFavouritePlaces favouritePlace={mockFavouritePlace} setLoadFavourite={mockSetLoadFavourite} />
            </Router>
        );

        expect(screen.getByText('All Favourite Places')).not.toBeNull();
        expect(screen.getByText('New York')).not.toBeNull();
        expect(screen.getByText('Los Angeles')).not.toBeNull();
    });

    it('displays a message when no favourite places are added', () => {
        render(
            <Router>
                <AllFavouritePlaces favouritePlace={[]} setLoadFavourite={mockSetLoadFavourite} />
            </Router>
        );

        expect(screen.getByText('No favourite places added yet.')).not.toBeNull();
    });

    it('calls handleRemove when the remove button is clicked', async () => {
        removeFavouriteLocation.mockResolvedValue({});

        render(
            <Router>
                <AllFavouritePlaces favouritePlace={mockFavouritePlace} setLoadFavourite={mockSetLoadFavourite} />
            </Router>
        );

        const removeButtons = screen.getAllByText('Remove');
        fireEvent.click(removeButtons[0]);

        expect(removeFavouriteLocation).toHaveBeenCalledWith('New York');
    });


});
