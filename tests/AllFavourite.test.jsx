import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { vi } from 'vitest';
import AllFavouritePlaces from '../src/Components/pages/favourites/AllFavouritePlaces';
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
        // Arrange: Render the component with mock data
        render(
            <Router>
                <AllFavouritePlaces favouritePlace={mockFavouritePlace} setLoadFavourite={mockSetLoadFavourite} />
            </Router>
        );

        // Assert: Check if the component renders correctly with given data
        expect(screen.getByText('All Favourite Places')).not.toBeNull();
        expect(screen.getByText('New York')).not.toBeNull();
        expect(screen.getByText('Los Angeles')).not.toBeNull();
    });

    it('displays a message when no favourite places are added', () => {
        // Arrange: Render the component with no favourite places
        render(
            <Router>
                <AllFavouritePlaces favouritePlace={[]} setLoadFavourite={mockSetLoadFavourite} />
            </Router>
        );

        // Assert: Check if the no favourite places message is displayed
        expect(screen.getByText('No favourite places added yet.')).not.toBeNull();
    });

    it('calls handleRemove when the remove button is clicked', async () => {
        // Arrange: Mock the removeFavouriteLocation function to resolve
        removeFavouriteLocation.mockResolvedValue({});

        // Act: Render the component and simulate a click on the remove button
        render(
            <Router>
                <AllFavouritePlaces favouritePlace={mockFavouritePlace} setLoadFavourite={mockSetLoadFavourite} />
            </Router>
        );

        const removeButtons = screen.getAllByText('Remove');
        fireEvent.click(removeButtons[0]);

        // Assert: Check if removeFavouriteLocation was called with the correct argument
        expect(removeFavouriteLocation).toHaveBeenCalledWith('New York');
    });
});
