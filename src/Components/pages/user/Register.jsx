import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../../services/userService';
import '../../css/Login.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState({ message: ``, display: false });
    const navigate = useNavigate();


    const [successfulRegistration, setSuccessfulRegistration] = useState({ message: ``, display: false });

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
        if (!passwordRegex.test(formData.password)) {
            setError({
                message: "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.",
                display: true,
            });
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError({
                message: "Passwords do not match.",
                display: true,
            });
            return;
        }

        // Set default favouriteLocations
        const userData = {
            email: formData.email,
            password: formData.password,
            favouriteLocations: [], // Default location value
        };

        const response = await registerUser(userData);
        const noResponseMessageStart = `Registration failed. `;
        if (response instanceof Error) {
            setError({
                message: noResponseMessageStart + " " + response.response.data.errors[0].msg,
                display: true,
            });
        } else {
            setSuccessfulRegistration({
                message: "You have Registered successfully",
                display: true
            });
            setFormData({
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
            });
            navigate('/login', { state: { successfulRegistration: { message: "You have Registered successfully", display: true } } });
        }
    };

    return (
        <div className="loginPage">
            <div className="loginContainer">
                <h2>Register</h2>
                <FontAwesomeIcon icon={faUserPlus} className="loginIcon" />
                {error.display && <div className="userErrorAlert">{error.message}</div>}
                {successfulRegistration.display && <div className="userSuccessful">{successfulRegistration.message}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="loginFormLabel">
                            Username
                        </label>
                        <input
                            type="text"
                            className="loginFormControl"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="loginFormLabel">
                            Email
                        </label>
                        <input
                            type="email"
                            className="loginFormControl"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="loginFormLabel">
                            Password
                        </label>
                        <input
                            type="password"
                            className="loginFormControl"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="loginFormLabel">
                            Confirm Password
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
                        Register
                    </button>
                </form>
                <p className="register">
                    Already have an account?{' '}
                    <Nav.Link as={Link} to="/login" className="loginLink">
                        <span className="loginLink"> Login here </span>
                    </Nav.Link>
                </p>
            </div>
        </div>
    );
};

export default Register;