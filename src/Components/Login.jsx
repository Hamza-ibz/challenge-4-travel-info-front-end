import React from 'react'
import "./LoginPage.css"
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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
                <p>Don't have an account? <a href="/" className="loginLink">Register here</a></p>
            </div>
        </div>
    )
}

export default Login
