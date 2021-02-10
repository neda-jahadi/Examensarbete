import React from 'react';
import './Header.css';
import HamburgerMenu from './HamburgerMenu';
import DesktopMenu from './DesktopMenu';

const Header = () => {
    
   
    return(
        <div className="header-holder">
            <div className="mobile">
                <HamburgerMenu />
                <div className="app-name">Travel Advisor</div>
            </div>
            <div className="desktop">
                <DesktopMenu />
            </div>
             
        </div>
    )
}

export default Header;