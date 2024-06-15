import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { loginUser } from '../services/userService';
import { useLocation } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const location = useLocation();
    const { successfulRegistration } = location.state || { successfulRegistration: { message: '', display: false } };
    console.log(successfulRegistration);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(formData);
            alert('Login successful!'); // Replace with desired action after successful login
            // Redirect or any other action after successful login
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Login failed.'); // Handle error state
        }
    };

    return (
        <div className="loginPage">
            <div className="loginContainer">
                <h2>Login</h2>
                <FontAwesomeIcon icon={faUser} className="loginIcon" />
                {successfulRegistration.display && <div className="userSuccessful">{successfulRegistration.message}</div>}
                <form onSubmit={handleSubmit}>
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
                    <button type="submit" className="loginBtnPrimary">
                        Login
                    </button>
                </form>
                <p className="register">
                    Don't have an account?{' '}
                    <Nav.Link as={Link} to="/register" className="loginLink">
                        <span className="loginLink"> Register here </span>
                    </Nav.Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
