import React,{useState} from 'react';
import  './CreateAccount.css';
import {useHistory} from 'react-router-dom';


const CreateAccount = () => {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [availibilityColor, setAvailibilityColor] = useState('gray');
    const [availibilityMsg, setAvailibilityMsg] = useState('Check availibility!');

    const history = useHistory();
    
    const sendTo = (link) =>{
        history.push(link);
    }

    const usernameAvailibility = () => {
        let url = `http://localhost:2294/api/useravailibility/?username=${username}`;
        console.log(url);
        fetch(url )
        .then(response => response.json())
        .then(res => {
            setAvailibilityColor('red');
            setAvailibilityMsg('Not Available');
                   
            }
                )
        .catch(error => {
            setAvailibilityColor('green');
            setAvailibilityMsg('Available');
            
        })
    }

    async function onSubmitUser() {
        let user = {name: name , username: username, password: password }

        const response = await fetch(`http://localhost:2294/api/adduser`, {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(user)
         })
     const text = await response.text();
     console.log(text);
         sendTo('/');

 }

    return(
        <div className="account-container">
            <div className="greeting">
                <h3>Create an account</h3>
                
            </div>

            <div className="form">
                
                    <div>
                        <div className="label">First name:</div>
                        <input type="text" onChange={(e) => setName(e.target.value)} />
                    </div>
            
                

                <div>
                    <div className="label">Desired User Name:</div>
                    <input type="text" onChange={(e) => {
                            setUsername(e.target.value)
                            setAvailibilityMsg('Check availibility!')
                            setAvailibilityColor('gray') }} />
                    <div>
                        <button className="availibility" 
                            style={{background: `${availibilityColor}`, color: 'white'}}
                            onClick={() => usernameAvailibility()} >
                            {availibilityMsg}
                        </button>
                    </div>
                </div>
                
                
                
                <div>
                     <div className="label">Choose a password:</div>
                    <input type="text" onChange={(e) => setPassword(e.target.value)} />
                </div>
                
            </div>
            
            
            <div className="submit-holder">
                <button className="submit-btn" onClick={() => onSubmitUser()} >Submit</button>
                
            </div>
           
            
        </div>
    )
}

export default CreateAccount;