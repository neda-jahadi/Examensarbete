import React, {useState, useEffect} from 'react';
import './Travel.css';
import {useHistory} from 'react-router-dom';

const Travel = () => {

    const [dataCities, setDataCities] = useState([]);
    const [addCity, setAddCity] = useState(false);
    const [city, setCity] = useState('');
    const history = useHistory();

    const sendTo = (link) =>{
        history.push(link);
    }

    useEffect(async () => {
        const response = await fetch('http://localhost:2294/api/cities' );
        const cities = await response.json();
        setDataCities(cities);
        
        
      }, [dataCities]);
   

     async function addNewCity(addedCity) {
        
        let name = addedCity;
        let activities = [];
        let restaurants = [];
        let data = { name , activities, restaurants};
        
        const response = await fetch('http://localhost:2294/api/addcity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const text = await response.text();
            console.log('response is:',text);
      }

    const jsxCities = dataCities.map((city, index) => <div key={city._id} className="city-list" >
                                                            
                                                             <span className="cityName" onClick={()=>sendTo(`/travel/${city._id}`)} >{city.name}</span>
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
                    : <div className="input-add-holder" >
                        <input className="input-addCity" type="text" placeholder="City..." onChange={(e) => setCity(e.target.value)} />
                        <button className="add-myCity" onClick={() => {setAddCity(false); addNewCity(city)}}>Add</button>
                      </div>}
                
            </div>
            
        </div>
    )
}

export default Travel;