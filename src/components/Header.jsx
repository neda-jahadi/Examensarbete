import React from 'react';
import './Header.css';
import {useHistory} from 'react-router-dom';
import home from '../assets/home.png';

const Header = () => {
    
    const history = useHistory();
    const sendTo = (link) =>{
        history.push(link);
    }

    return(
        <div className="header-holder">
             <img src={home} alt="home" onClick={()=> sendTo("/travel/:id")} className="home-icon" />
             <div className="sign-out" onClick={()=> sendTo("/")}>Sign out!</div>
            
        </div>
    )
}

export default Header;