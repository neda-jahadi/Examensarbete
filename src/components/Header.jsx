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
        <div>
             <img src={home} alt="home" onClick={()=> sendTo("/travel")} className="home-icon" />
        </div>
    )
}

export default Header;