import React,{useState} from 'react';
import  './CreateAccount.css';
import {useHistory} from 'react-router-dom';
import backIcon from '../assets/backIcon.png';


const CreateAccount = () => {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [availibilityColor, setAvailibilityColor] = useState('gray');
    const [availibilityMsg, setAvailibilityMsg] = useState('Check availibility!');
    const [submit, setSubmit] = useState(false);
    const [firstnameValid, setFirstnameValid] = useState(false);
    const [usernameValid, setUsernameValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [available, setAvailable] = useState(false);

    const history = useHistory();
    let submitBtnStatus = 'disabled';
    
    if(firstnameValid && usernameValid && passwordValid && available){
        submitBtnStatus = 'submit-btn';
    }else{
        submitBtnStatus ='disabled';
    }

    const usernameAvailibility = () => {
        let url = `http://localhost:2294/api/useravailibility/?username=${username}`;
        console.log(url);
        fetch(url )
        .then(response => response.json())
        .then(res => {
            setAvailibilityColor('red');
            setAvailibilityMsg('Not Available');
            setAvailable(false);  
            }
                )
        .catch(error => {
            setAvailibilityColor('green');
            setAvailibilityMsg('Available');
            setAvailable(true);
        })
    }

    async function onSubmitUser() {
        let user = {name: name , username: username, password: password  }

        const response = await fetch(`http://localhost:2294/api/adduser`, {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(user)
         })
     const text = await response.text();
     console.log(text);
     setSubmit(true);
         

 }



    return(
        <div className="account-container">

            <div className="header">
                <img src={backIcon} alt="back" className="back-icon" onClick={() => history.push('/') } />
                <div className="app-name">Travel Advisor</div>

            </div>

            <div className="greeting">
                <h3>Create an account</h3>
                
            </div>

            <div className="form">
                
                    <div>
                        <div className="label">First name:</div>
                        <div className="input-and-message"> 
                            <input type="text" id="firstname" placeholder="Just letters(3-13)"
                                    pattern="[A-Za-z]{3,13}"
                                    onChange={(e) => {
                                    setSubmit(false)
                                    setName(e.target.value)
                                    setFirstnameValid(e.target.validity.valid) }} />
                            <div className={"firstname-error"}>Just Letters, Min 3,Max 13 characters </div>
                        </div>
                        
                    </div>
            
                

                <div>
                    <div className="label">Desired User Name:</div>
                    <div className="input-and-message">
                        <input type="text" placeholder="Numbers and letters(3-13)"
                                pattern="[A-Za-z0-9]{3,13}"
                                onChange={(e) => {
                                setUsername(e.target.value)
                                setAvailibilityMsg('Check availibility!')
                                setAvailibilityColor('gray')
                                setSubmit(false)
                                setAvailable(false)
                                setUsernameValid(e.target.validity.valid) }} />
                        <div className={"username-error"}>Min 3,Max 13 characters, Just Numbers/Letters</div>
                    </div>
                    

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
                     <div className="input-and-message">
                        <input type="text" placeholder="Numbers and letters(3-13)"
                                pattern="[A-Za-z0-9]{3,13}"
                                onChange={(e) => {
                                setPassword(e.target.value); 
                                setSubmit(false)
                                setPasswordValid(e.target.validity.valid)}} />
                        <div className={"password-error"}>Min3,Max 13 characters, Just Numbers/letters</div>
                     </div>
                    

                </div>
                
            </div>
            
            
            <div className="submit-holder">
                <div>
                    <button className={submitBtnStatus} 
                        onClick={() => onSubmitUser()} >
                            Submit
                    </button>
                </div>
                
                    <div>
                        <span style={{display: submit ? 'block' : 'none'}}>
                            Congratulations!
                        </span>
                    </div>
                    <div>
                        <span className="login"
                             style={{display: submit ? 'block' : 'none'}}
                             onClick={() => history.push('/')}>
                            Log in!
                        </span>
                    </div>

            </div>
           
            
        </div>
    )
}

export default CreateAccount;