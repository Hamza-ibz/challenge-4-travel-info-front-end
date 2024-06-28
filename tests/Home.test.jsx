import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../src/Components/pages/home/Home';
import { vi } from 'vitest';

// Mock the Search component
vi.mock('../src/Components/pages/home/Search', () => {
    return {
        __esModule: true,
        default: () => <div data-testid="search-component">Mocked Search Component</div>,
    };
});

describe('Home Component', () => {
    it('renders Home component and includes Search component', () => {
        // Arrange: Wrap Home component with BrowserRouter and render it
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );

        // Assert: Check for the heading text
        expect(screen.getByText(/Tell Me About/i)).toBeInTheDocument();

        // Assert: Check if the mocked Search component is rendered
        expect(screen.getByTestId('search-component')).toBeInTheDocument();
    });
});
