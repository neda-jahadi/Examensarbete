import React from 'react';
import './Travel.css';
import {useHistory} from 'react-router-dom';

const Travel = ({cities}) => {

    

    const history = useHistory();

    const sendTo = (link) =>{
        history.push(link);
    }

    const jsxCities = cities.map((city, index) => <div key={index} className="city-list" onClick={()=>sendTo(`/travel/${index}`)}>
                                                      {city}
                                                  </div>)
    return(
        <div className='travel-container'>
            <div>Choose your favorite destination</div>
            
            <div>

                <input type='text' placeholder="Search what you want..." />

            </div>

            <div className="cities">
                {jsxCities}
            </div>
            <div className="addBtn-container">
                <button className="addBtn">Add your destination</button>
            </div>
            
        </div>
    )
}

export default Travel;