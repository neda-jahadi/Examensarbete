import React from 'react';
import './Header.css';
import {useHistory} from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';

const Header = () => {
    
    const history = useHistory();
    const sendTo = (link) =>{
        history.push(link);
    }

    return(
        <div className="header-holder">
            
             <HamburgerMenu />
            
        </div>
    )
}

export default Header;