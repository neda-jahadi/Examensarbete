import React, { useState } from 'react';
import './HamburgerMenu.css';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';


const HamburgerMenu = () => {
  const [myclass, setMyClass] = useState(true);
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

		
		<div className="hamburger-menu">
            
			<div id="nav-icon1" className={(!myclass) ? 'open' : ''} onClick={()=>setMyClass(!myclass)}>
				<span></span>
				<span></span>
				<span></span>
			</div>
		
			<div className = { (!myclass) ? 'visible-content' : 'invisible-content'}>
				<nav role="navigation" className="hamburger-content">
					<Link to="/" >
						<h2 id="Signout" role="link">Sign out</h2>
					</Link>
					<Link to= {`/home/${userid}`} style={{display: activePath === 'home' ? 'none' : 'block'}}>
						<h2 id="home" role="link">Home</h2>
					</Link>
					<Link to= {`/city/${userid}/${cityid}`} style={{display: activePath === 'add' ? 'block' : 'none'}}>
						<h2 id="city" role="link">My city</h2>
					</Link>
					
				</nav>
			</div>
			
		</div>
	)
}

export default HamburgerMenu;