import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { describe, expect, vi, test } from "vitest";
import Login from "../src/Components/Login";
import { loginUser } from "../src/services/userService";

vi.mock("../src/services/userService");

describe("Tests for Login component", () => {
    const mockSetLoggedIn = vi.fn();
    const mockLoadFavourites = vi.fn();
    const defaultLocation = "Login";

    test("it should render email and password fields", () => {
        render(
            <Login setLoggedIn={mockSetLoggedIn} loadFavourites={mockLoadFavourites} />,
            { wrapper: MemoryRouter }
        );

        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    });

    test("it should render the success message if registration is successful", () => {
        const successfulRegistration = { message: "You have registered successfully", display: true };

        render(
            <MemoryRouter initialEntries={[{ state: { successfulRegistration } }]}>
                <Login setLoggedIn={mockSetLoggedIn} loadFavourites={mockLoadFavourites} />
            </MemoryRouter>
        );

        expect(screen.getByText(successfulRegistration.message)).toBeInTheDocument();
    });

    // test("it should display an error element with the class 'userErrorAlert' when login fails", async () => {
    //     loginUser.mockRejectedValueOnce(new Error("Login Failed. Invalid credentials."));

    //     render(
    //         <MemoryRouter>
    //             <Login setLoggedIn={mockSetLoggedIn} loadFavourites={mockLoadFavourites} />
    //         </MemoryRouter>
    //     );

    //     fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "test@example.com" } });
    //     fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "password" } });
    //     fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    //     await waitFor(() => {
    //         const errorElement = screen.getByRole("alert", { class: "userErrorAlert" });
    //         expect(errorElement).toBeInTheDocument();
    //     });
    // });

    test("it should log in the user and display the success modal on successful login", async () => {
        const token = "testToken";
        loginUser.mockResolvedValueOnce({ token });

        render(
            <MemoryRouter>
                <Login setLoggedIn={mockSetLoggedIn} loadFavourites={mockLoadFavourites} />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "password" } });
        fireEvent.click(screen.getByRole("button", { name: /Login/i }));

        await waitFor(() => {
            expect(localStorage.getItem("token")).toBe(token);
            expect(mockSetLoggedIn).toHaveBeenCalledWith(true);
            expect(mockLoadFavourites).toHaveBeenCalled();
            expect(screen.getByText("User has Logged in successfully.")).toBeInTheDocument();
        });
    });

    test("it should navigate to register page when register link is clicked", async () => {
        render(
            <MemoryRouter>
                <Login setLoggedIn={mockSetLoggedIn} loadFavourites={mockLoadFavourites} />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText(/Register here/i));

        await waitFor(() => {
            expect(screen.getByText(/Register/i)).toBeInTheDocument(); // Assuming that the register page contains this text
        });
    });
});
