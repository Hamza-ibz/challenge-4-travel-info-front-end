import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../src/Components/Home';
import Search from '../src/Components/Search';
import { vi } from 'vitest';

vi.mock('../src/Components/Search', () => {
    return {
        __esModule: true,
        default: () => <div data-testid="search-component">Mocked Search Component</div>,
    };
});

describe('Home Component', () => {
    it('renders Home component and includes Search component', () => {
        render(<Home />);

        // Check for the heading text
        expect(screen.getByText(/Tell Me About/i)).toBeInTheDocument();

        // Check if the mocked Search component is rendered
        expect(screen.getByTestId('search-component')).toBeInTheDocument();
    });
});
