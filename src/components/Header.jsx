import React from 'react';
import './Header.css';
// import {useHistory} from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';
import DesktopMenu from './DesktopMenu';

const Header = () => {
    
    // const history = useHistory();
    // const sendTo = (link) =>{
    //     history.push(link);
    // }

    return(
        <div className="header-holder">
            <div className="mobile">
                <HamburgerMenu />
                <div className="app-name">Travel Advisor</div>
            </div>
            <div className="desktop">
                <DesktopMenu />
                {/* <div className="app-name">Travel Advisor</div> */}
            </div>
             
        </div>
    )
}

export default Header;