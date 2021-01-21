import React,{useState} from 'react';
import  './Login.css';
import {useHistory} from 'react-router-dom';


const Login = () => {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);
    
    const onLogin = () => {
        let url = `http://localhost:2294/api/login/?username=${username}&password=${password}`;
        // console.log(url);
        fetch(url )
        .then(response => response.json())
        .then(res => {
                setShowError(false);
                history.push(`/home/${res._id}`);
            }
                )
        .catch(error => setShowError(true))
    }

    return(
        <div className="login-container">
            <div className="user-info">
                <input type="text" placeholder="Username..." onChange={(e) => {
                        setUsername(e.target.value)
                        setShowError(false)}} />
                <input type="text" placeholder="Password..." onChange={(e) => setPassword(e.target.value)} />

            </div>

            <div className="loginbtn-holder">
                <button className="login-btn" onClick={() => onLogin()}>Login</button>
            </div>

            <div className="errormsg" >
                <div style={{ display: showError ? 'block' : 'none' }}>
                    Wrong username or password
                </div>
            </div>

            <div className="create-account">
                <span onClick={() => history.push('/account') }>Create an account!</span>
            </div>
            
        </div>
    )
}

export default Login;