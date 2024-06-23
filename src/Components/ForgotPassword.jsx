import React, { useState } from 'react';
// import { sendPasswordResetEmail } from '../services/userService';
// import './ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState({ content: '', type: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await sendPasswordResetEmail(email);
        if (response instanceof Error) {
            setMessage({ content: 'Failed to send password reset email. Please try again.', type: 'error' });
        } else {
            setMessage({ content: 'Password reset email sent successfully!', type: 'success' });
        }
    };

    return (
        <div className="forgotPasswordPage">
            <div className="forgotPasswordContainer">
                <h2>Forgot Password</h2>
                {message.content && <div className={`message ${message.type}`}>{message.content}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="forgotPasswordFormLabel">
                            Email
                        </label>
                        <input
                            type="email"
                            className="forgotPasswordFormControl"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="forgotPasswordBtnPrimary">
                        Send Password Reset Email
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
