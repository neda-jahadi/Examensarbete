import React,{useState} from 'react';
import  './Login.css';
import {useHistory} from 'react-router-dom';
import hidePassIcon from '../assets/hide-pass.png';
import showPassIcon from '../assets/show-pass.jpg';
import userIcon from '../assets/user.png';


const Login = () => {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [passInputType, setPassInputType] = useState('password');
    
    const onLogin = () => {
        let url = `https://trip-adviser.herokuapp.com/api/login/?username=${username}&password=${password}`;
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

            <div className="applogin-name">
                <h1>Travel Advisor</h1>
            </div>

            <div className="userinfo-holder">

                <div className="user-info">
                    <div className="user-pass-container">
                        <input type="text" placeholder="Username..." onChange={(e) => {
                            setUsername(e.target.value)
                            setShowError(false)}} />
                        <img src={userIcon} alt="user"  />

                    </div>
                    
                    <div className="user-pass-container">
                        <input type={passInputType} placeholder="Password..." onChange={(e) =>
                            setPassword(e.target.value)} />
                        {!showPass 
                            ? <img src={hidePassIcon} alt="hide-password" onClick= {() => {
                                setPassInputType('text');
                                setShowPass(true); }} />

                            : <img src={showPassIcon} alt="show-password" onClick= {() => {
                                setPassInputType('password');
                                setShowPass(false); }} />
                        }
                        

                    </div>
                   
                </div>

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