import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { updatePassword } from '../../../services/userService';
import '../../css/Login.css'; // Reuse the Login.css for styling

const UpdatePassword = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [error, setError] = useState({ message: ``, display: false });
    const [message, setMessage] = useState({ content: '', type: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({
            message: "",
            display: false,
        });

        // Validate password strength
        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(formData.newPassword)) {
            setError({
                message: "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.",
                display: true,
            });
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setError({
                message: "Passwords do not match.",
                display: true,
            });
            return;
        }

        const response = await updatePassword(formData);
        if (response instanceof Error) {
            setMessage({ content: 'Failed to update password. ' + response.message + ' Please try again.', type: 'error' });
        } else {
            setMessage({ content: 'Password updated successfully!', type: 'success' });
            setFormData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
        }
    };

    return (
        <div className="loginPage">
            <div className="loginContainer">
                <h2>Update Password</h2>
                <FontAwesomeIcon icon={faKey} className="loginIcon" />
                {error.display && <div className="userErrorAlert">{error.message}</div>}
                {message.content && <div className={`user${message.type.charAt(0).toUpperCase() + message.type.slice(1)}Alert`}>{message.content}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="currentPassword" className="loginFormLabel">
                            Current Password
                        </label>
                        <input
                            type="password"
                            className="loginFormControl"
                            id="currentPassword"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="newPassword" className="loginFormLabel">
                            New Password
                        </label>
                        <input
                            type="password"
                            className="loginFormControl"
                            id="newPassword"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="loginFormLabel">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            className="loginFormControl"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="loginBtnPrimary">
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;
