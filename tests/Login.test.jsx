import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, vi, test } from "vitest";
import Login from "../src/Components/pages/user/Login";
import { loginUser } from "../src/services/userService";

vi.mock("../src/services/userService");

describe("Tests for Login component", () => {
    const mockSetLoggedIn = vi.fn();
    const mockLoadFavourites = vi.fn();

    test("it should render email and password fields", () => {
        // Arrange: Render the Login component
        render(
            <Login setLoggedIn={mockSetLoggedIn} loadFavourites={mockLoadFavourites} />,
            { wrapper: MemoryRouter }
        );

        // Assert: Check that the email and password input fields are in the document
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    });

    test("it should render the success message if registration is successful", () => {
        // Arrange: Mock a successful registration state
        const successfulRegistration = { message: "You have registered successfully", display: true };

        // Act: Render the Login component with the successful registration state
        render(
            <MemoryRouter initialEntries={[{ state: { successfulRegistration } }]}>
                <Login setLoggedIn={mockSetLoggedIn} loadFavourites={mockLoadFavourites} />
            </MemoryRouter>
        );

        // Assert: Check that the success message is displayed
        expect(screen.getByText(successfulRegistration.message)).toBeInTheDocument();
    });

    test("it should log in the user and display the success modal on successful login", async () => {
        // Arrange: Mock the loginUser service to resolve with a token
        const token = "testToken";
        loginUser.mockResolvedValueOnce({ token });

        // Act: Render the Login component
        render(
            <MemoryRouter>
                <Login setLoggedIn={mockSetLoggedIn} loadFavourites={mockLoadFavourites} />
            </MemoryRouter>
        );

        // Act: Simulate user input and login button click
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "password" } });
        fireEvent.click(screen.getByRole("button", { name: /Login/i }));

        // Assert: Check that the token is stored, setLoggedIn and loadFavourites are called, and the success message is displayed
        await waitFor(() => {
            expect(localStorage.getItem("token")).toBe(token);
            expect(mockSetLoggedIn).toHaveBeenCalledWith(true);
            expect(mockLoadFavourites).toHaveBeenCalled();
            expect(screen.getByText("User has Logged in successfully.")).toBeInTheDocument();
        });
    });

    test("it should navigate to register page when register link is clicked", async () => {
        // Arrange: Render the Login component
        render(
            <MemoryRouter>
                <Login setLoggedIn={mockSetLoggedIn} loadFavourites={mockLoadFavourites} />
            </MemoryRouter>
        );

        // Act: Simulate clicking the register link
        fireEvent.click(screen.getByText(/Register here/i));

        // Assert: Check that the register page is displayed
        await waitFor(() => {
            expect(screen.getByText(/Register/i)).toBeInTheDocument(); // Assuming that the register page contains this text
        });
    });
});
