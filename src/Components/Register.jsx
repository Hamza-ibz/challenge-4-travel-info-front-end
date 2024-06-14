import React from 'react'
import "./Login.css"
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className="loginPage">
            <div className="loginContainer">
                <h2>Register</h2>
                <FontAwesomeIcon icon={faUserPlus} className="loginIcon" />
                <form>
                    <div className="mb-3">
                        <label htmlFor="username" className="loginFormLabel">Username</label>
                        <input type="text" className="loginFormControl" id="username" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="loginFormLabel">Email</label>
                        <input type="email" className="loginFormControl" id="email" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="loginFormLabel">Password</label>
                        <input type="password" className="loginFormControl" id="password" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="loginFormLabel">Confirm Password</label>
                        <input type="password" className="loginFormControl" id="confirmPassword" required />
                    </div>
                    <button type="submit" className="loginBtnPrimary">Register</button>
                </form>

                <p className="register">
                    Already have an account?
                    <Nav.Link as={Link} to="/login" className="loginLink">
                        <span className="loginLink"> Login here </span>
                    </Nav.Link>
                </p>
            </div>
        </div>
    )
}

export default Register