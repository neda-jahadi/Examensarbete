import React from 'react';
import  './CreateAccount.css';

const CreateAccount = () => {

    return(
        <div className="account-container">
            <div className="greeting">
                <h3>Create an account</h3>
            </div>
            <form className="form">
                
                    <div>
                        <div className="label">First name:</div>
                        <input type="text"  />
                    </div>
            
                

                <div>
                    <div className="label">Desired User Name:</div>
                    <input type="text"  />
                    <div>
                        <button className="availibility">Check availibility!</button>
                    </div>
                </div>
                
                
                
                <div>
                     <div className="label">Choose a password:</div>
                    <input type="text"  />
                </div>
                
            </form>
            
            
            <div className="submit-holder">
                <button className="submit-btn">Submit</button>
            </div>
           
            
        </div>
    )
}

export default CreateAccount;