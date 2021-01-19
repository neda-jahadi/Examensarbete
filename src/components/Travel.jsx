import React, {useState, useEffect} from 'react';
import './Travel.css';
import {useHistory} from 'react-router-dom';

const Travel = () => {

    const [cities, setCities] = useState([]);
    const [addCity, setAddCity] = useState(false);
    const [city, setCity] = useState('');
    const [searchedCity, setSearchedCity] = useState('');

    const history = useHistory();

    const sendTo = (link) =>{
        history.push(link);
    }
    

    async function updateCities() {
        const response = await fetch(`http://localhost:2294/api/cities/?searchword=${searchedCity}`);
        const updatedCities = await response.json();
        setCities(updatedCities);
        
    }
        
    useEffect( () => {
        updateCities()
       
      },[searchedCity]);   
      
   

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
            updateCities();
      }

    let jsxCities = null;
    if(cities.length === 0){
        updateCities();
    }
    
    if(cities.length > 0) {
      jsxCities = cities.map((city, index) => <div key={city._id} className="city-list" >
                                                            
                                                             <span className="cityName" onClick={()=>sendTo(`/travel/${city._id}`)} >{city.name}</span>
                                                      </div>)
    }

    return(
        <div className='travel-container'>
            <div className="greeting">
                <h2>Hej Neda!</h2> 
            </div>
            <div className="choose-alternative" >Choose your favorite destination</div>
            
            <div className="search-input-h">

                <input className="search-input" type='text'
                      placeholder="Search city you want..."
                      onChange={(e) => setSearchedCity(e.target.value) } />

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