import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, vi, test } from "vitest";
import Register from "../src/Components/pages/user/Register";
import { registerUser } from "../src/services/userService";
vi.mock("../src/services/userService");
describe("Tests for Register component", () => {
    test("it should render all input fields", () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );
        expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
        expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    });


    test("it should navigate to login page with success message on successful registration", async () => {
        registerUser.mockResolvedValueOnce({});
        const { container } = render(
            <MemoryRouter initialEntries={["/register"]}>
                <Register />
            </MemoryRouter>
        );
        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: "testuser" } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByLabelText("Password"), { target: { value: "Password123!" } });
        fireEvent.change(screen.getByLabelText("Confirm Password"), { target: { value: "Password123!" } });
        fireEvent.click(screen.getByRole("button", { name: /Register/i }));
        await waitFor(() => {
            expect(screen.getByText(/You have Registered successfully/i)).toBeInTheDocument();
        });
        expect(container.querySelector("h2").textContent).toBe("Register");
    });
});