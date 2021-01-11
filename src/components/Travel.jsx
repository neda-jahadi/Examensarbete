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

    const jsxCities = cities.map((city, index) => <div key={index} className="city-list" >
                                                      <span className="cityName" onClick={()=>sendTo(`/travel/${index}`)} >{city}</span>
                                                  </div>)
    return(
        <div className='travel-container'>
            <div className="greeting">
                <h2>Hej Neda!</h2>
            </div>
            <div className="choose-alternative" >Choose your favorite destination</div>
            
            <div className="search-input-h">

                <input className="search-input" type='text' placeholder="Search what you want..." />

            </div>

            <div className="cities">
                {jsxCities}
            </div>
            <div className="addBtn-container">
                {!addCity 
                    ? <button className="addBtn" onClick={() => setAddCity(true)}>Add your destination</button>
                    : <div className="input-add-holder" onBlur={ () => setAddCity(false)} >
                        <input className="input-addCity" type="text" placeholder="City..." onChange={(e) => setCity(e.target.value)} />
                        <button className="add-myCity" onClick={() => {setAddCity(false); addNewCity(city)}}>Add</button>
                      </div>}
                
            </div>
            
        </div>
    )
}

export default Travel;