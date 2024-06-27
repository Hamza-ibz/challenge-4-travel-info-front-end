import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import UpdatePassword from '../src/Components/UpdatePassword';
import { updatePassword } from '../src/services/userService';

// Mock the updatePassword service
vi.mock('../src/services/userService');

describe('UpdatePassword Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('renders UpdatePassword component correctly', () => {
        render(<UpdatePassword />);
        expect(screen.getByRole('heading', { name: /Update Password/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/Current Password/i)).toBeInTheDocument();
        expect(screen.getAllByLabelText(/New Password/i)[0]).toBeInTheDocument();
        expect(screen.getAllByLabelText(/Confirm New Password/i)[0]).toBeInTheDocument();
    });

    test('displays error message when passwords do not match', async () => {
        render(<UpdatePassword />);

        fireEvent.change(screen.getByLabelText(/Current Password/i), { target: { value: 'currentPassword123' } });
        fireEvent.change(screen.getAllByLabelText(/New Password/i)[0], { target: { value: 'NewPassword123!' } });
        fireEvent.change(screen.getAllByLabelText(/Confirm New Password/i)[0], { target: { value: 'DifferentPassword123!' } });
        fireEvent.click(screen.getByRole('button', { name: /Update Password/i }));

        await waitFor(() => {
            expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
        });
    });

    test('displays error message when password does not meet criteria', async () => {
        render(<UpdatePassword />);

        fireEvent.change(screen.getByLabelText(/Current Password/i), { target: { value: 'currentPassword123' } });
        fireEvent.change(screen.getAllByLabelText(/New Password/i)[0], { target: { value: 'short' } });
        fireEvent.change(screen.getAllByLabelText(/Confirm New Password/i)[0], { target: { value: 'short' } });
        fireEvent.click(screen.getByRole('button', { name: /Update Password/i }));

        await waitFor(() => {
            expect(screen.getByText(/Password must contain at least 8 characters/i)).toBeInTheDocument();
        });
    });

    test('displays success message when password is updated successfully', async () => {
        updatePassword.mockResolvedValueOnce({});
        render(<UpdatePassword />);

        fireEvent.change(screen.getByLabelText(/Current Password/i), { target: { value: 'currentPassword123' } });
        fireEvent.change(screen.getAllByLabelText(/New Password/i)[0], { target: { value: 'NewPassword123!' } });
        fireEvent.change(screen.getAllByLabelText(/Confirm New Password/i)[0], { target: { value: 'NewPassword123!' } });
        fireEvent.click(screen.getByRole('button', { name: /Update Password/i }));

        await waitFor(() => {
            expect(screen.getByText(/Password updated successfully!/i)).toBeInTheDocument();
        });
    });

});
