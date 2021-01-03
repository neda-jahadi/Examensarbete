import React, {useState} from 'react';
import './Travel.css';
import {useHistory} from 'react-router-dom';

const Travel = ({cities, addNewCity}) => {

    
    const [addCity, setAddCity] = useState(false);
    const [city, setCity] = useState('');
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
                {!addCity 
                    ? <button className="addBtn" onClick={() => setAddCity(true)}>Add your destination</button>
                    : <div>
                        <input type="text" placeholder="City..." onChange={(e) => setCity(e.target.value)} />
                        <button onClick={() => {setAddCity(false); addNewCity(city)}}>Add</button>
                      </div>}
                
            </div>
            
        </div>
    )
}

export default Travel;