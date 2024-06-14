import React from 'react'
import "./Login.css"
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="loginPage">
            <div className="loginContainer">
                <h2>Login</h2>
                <FontAwesomeIcon icon={faUser} className="loginIcon" />
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="loginFormLabel">Email</label>
                        <input type="email" className="loginFormControl" id="email" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="loginFormLabel">Password</label>
                        <input type="password" className="loginFormControl" id="password" required />
                    </div>

                    <button type="submit" className="loginBtnPrimary">Login</button>
                </form>


                <p className="register">
                    Don't have an account?
                    <Nav.Link as={Link} to="/register" className="loginLink">
                        <span className="loginLink"> Register here </span>
                    </Nav.Link>
                </p>

            </div>
        </div>
    )
}

export default Login
