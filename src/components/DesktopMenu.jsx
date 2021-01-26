import React from 'react';
import  './DesktopMenu.css';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';

const DesktopMenu = () => {

    let activePath = '';
   
     const {userid,cityid} = useParams();
     
   
     let pathUrl = window.location.pathname;
     
     if (pathUrl.includes('/home/')) {  
           activePath = 'home';
       }
       
     if(pathUrl.includes('/city/')) {
           activePath = 'city';
         
     }
   
     if(pathUrl.includes('/add')) {
           activePath = 'add';
     }
   

    return(
        <div className="desktop-content">
            <div className="desktop-links">
                <Link to="/" >
                    <div className="signout" role="link">Sign out</div>
                </Link>
                <Link to= {`/home/${userid}`} style={{display: activePath === 'home' ? 'none' : 'block'}}>
                    <div className="home" role="link">Home</div>
                </Link>
                <Link to= {`/city/${userid}/${cityid}`} style={{display: activePath === 'add' ? 'block' : 'none'}}>
                    <div className="city" role="link">My city</div>
                </Link>
            </div>
            <div>
                <div className="appname-desktop">Travel Advisor</div>
            </div>
        </div>
    )
}
export default DesktopMenu;