import React from 'react';
import  './Login.css';

const Login = () => {

    return(
        <div className="login-container">
            <div className="user-info">
                <input type="text" placeholder="Username..." />
                <input type="text" placeholder="Password..." />

            </div>
            <div className="loginbtn-holder">
                <button className="login-btn">Login</button>
            </div>
            <div className="create-account">
                <span>Create an account!</span>
            </div>
            
        </div>
    )
}

export default Login;