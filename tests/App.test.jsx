import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../src/App";
import * as services from "../src/services/userService";
import { vi } from 'vitest';

vi.mock("../src/services/userService");

describe("App Component Tests", () => {
    beforeEach(() => {
        services.getFavouriteLocations.mockResolvedValue([]);
    });

    it('should render "Home" component on initial render', () => {
        // Arrange & Act
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );

        // Assert
        expect(screen.getByText(/Tell Me About.../i)).toBeInTheDocument();
    });

    it('should render "Login" component on /login route', () => {
        // Arrange & Act
        render(
            <MemoryRouter initialEntries={['/login']}>
                <App />
            </MemoryRouter>
        );

        // Assert
        expect(screen.getByRole('heading', { name: /Login/i })).toBeInTheDocument();
    });

    it('should render "Register" component on /register route', () => {
        // Arrange & Act
        render(
            <MemoryRouter initialEntries={['/register']}>
                <App />
            </MemoryRouter>
        );

        // Assert
        expect(screen.getByRole('heading', { name: /Register/i })).toBeInTheDocument();
    });

    it('should render "UpdatePassword" component on /update-password route', () => {
        // Arrange & Act
        render(
            <MemoryRouter initialEntries={['/update-password']}>
                <App />
            </MemoryRouter>
        );

        // Assert
        expect(screen.getByRole('heading', { name: /Update Password/i })).toBeInTheDocument();
    });

    it('should render "AllFavouritePlaces" component on /all-favourites route', () => {
        // Arrange & Act
        render(
            <MemoryRouter initialEntries={['/all-favourites']}>
                <App />
            </MemoryRouter>
        );

        // Assert
        expect(screen.getByRole('heading', { name: /All Favourite Places/i })).toBeInTheDocument();
    });
});
