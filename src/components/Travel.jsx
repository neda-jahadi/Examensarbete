import React, {useState, useEffect} from 'react';
import './Travel.css';
import {useHistory} from 'react-router-dom';
import {useParams} from 'react-router-dom';


const Travel = () => {

    const [cities, setCities] = useState([]);
    const [addCity, setAddCity] = useState(false);
    const [city, setCity] = useState('');
    const [searchedCity, setSearchedCity] = useState('');
    const [greetingName, setGreetingName] = useState('');
    const [citynameValid, setCitynameValid] = useState(true);
    const [classCityMessage, setClassCityMessage] = useState('no-error-msg');

    const {userid} = useParams();

    let addMycityBtnClass = 'disabled', infoMessage = "(a-z A-Z, Min 1- Max 50)" , classInfoMessage = 'no-error-msg';

    if( citynameValid && city !== '' ){
        addMycityBtnClass = 'add-myCity';
        // classInfoMessage = 'no-error-msg';
        
    }else {
        addMycityBtnClass = 'disabled';  
        // classInfoMessage = 'error-msg';
    }

    if(!citynameValid){
        classInfoMessage = 'error-msg'
    }

    const history = useHistory();

    const sendTo = (link) =>{
        history.push(link);
    }

    
    const getUser = () => {
        fetch(`http://localhost:2294/api/user/?userid=${userid}` )
        .then(response => response.json())
        .then(res => {
                setGreetingName(res.name)
            }
                )
        .catch(error => console.log(error))
    }

    if(greetingName ===''){
        getUser();
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
            if(text === 'Already exists'){
                setClassCityMessage('error-msg')
            }else {
                setAddCity(false);
                updateCities();
            }
      }

    let jsxCities = null;
    if(cities.length === 0){
        updateCities();
    }
    
    if(cities.length > 0) {
      jsxCities = cities.map((city, index) => <div key={city._id} className="city-list" >
                                                            
                                                             <span className="cityName" onClick={()=>sendTo(`/city/${userid}/${city._id}`)} >{city.name}</span>
                                                      </div>)
    }

    return(
        <div className='travel-container'>
            <div className="greeting">
                <span>Hello {greetingName}! </span>
            </div>
            <div className="choose-input">
                <div className="choose-alternative" >Choose your destination</div>
                
                <div className="search-input-h">

                    <input className="search-input" type='text'
                        placeholder="Search city you want..."
                        onChange={(e) => setSearchedCity(e.target.value) } />

                </div>

            </div>
            
            <div className="cities">
                {jsxCities}
            </div>
            <div className="addBtn-container">
                {!addCity 
                    ? <button className="addBtn" onClick={() => {setAddCity(true); setClassCityMessage('no-error-msg')}}>Add your destination</button>
                    : <div className="input-add-holder" >
                        <div>
                            <input className="input-addCity" type="text" placeholder="City..."
                                pattern="[a-zA-Z\s]{1,50}"
                                onChange={(e) => {setClassCityMessage('no-error-msg')
                                                  setCity(e.target.value);
                                                  setCitynameValid(e.target.validity.valid)}
                                }/>
                                    
                        </div>
                        
                        <button className={addMycityBtnClass} onClick={() => {
                                addNewCity(city) }}>Add
                        </button>
                        
                      </div>}

            </div>
            
            <div className={classInfoMessage} >
                <span>{infoMessage}</span>
            </div>

            <div className={classCityMessage} >
                <span>This city Already exists</span>
            </div>

            
            
            
        </div>
    )
}

export default Travel;