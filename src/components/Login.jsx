import React from 'react';
import  './Login.css';

const Login = () => {

    return(
        <div className="login-container">
            <div className="user-info">
                <input type="text" placeholder="Username..." />
                <input type="text" placeholder="Password..." />

            </div>
            <div>
                <button>Login</button>
            </div>
            <div className="create-account">
                Create an account!
            </div>
            
        </div>
    )
}

export default Login;