import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../../services/userService';
import { useLocation } from 'react-router-dom';
import '../../css/Login.css';
import InfoModal from '../../utils/InfoModal';

const Login = ({ setLoggedIn, loadFavourites }) => {
    const location = useLocation();
    const { successfulRegistration } = location.state || { successfulRegistration: { message: '', display: false } };
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState({ message: ``, display: false });
    const [loggedIn, setLoggedInState] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        const response = await loginUser(formData);
        if (response instanceof Error) {
            console.log(response);
            setError({
                message: "Login Failed. " + (response.response?.data?.message || response.message || "An unknown error occurred."),
                display: true,
            });
        } else {
            console.log(response);
            localStorage.setItem('token', response.token); // Store the token in local storage
            setLoggedIn(true);
            loadFavourites();
            setLoggedInState(true);
        }
    };

    return (
        <div className="loginPage">
            <div className="loginContainer">
                <h2>Login</h2>
                <FontAwesomeIcon icon={faUser} className="loginIcon" />
                {error.display && <div className="userErrorAlert">{error.message}</div>}
                {successfulRegistration.display && <div className="userSuccessAlert">{successfulRegistration.message}</div>}
                {loggedIn && <InfoModal closeModal={() => navigate('/')} message={"User has Logged in successfully."} />}
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

