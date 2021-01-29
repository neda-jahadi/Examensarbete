import React,{ useState} from 'react';
import './ChosedCity.css';
import {useHistory} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import addIcon from '../assets/add.png';
import DataList from './DataList';

const ChosedCity = () => {
    let activities = null;
    let restaurants = null;

    const [city, setCity] = useState({});
    const [showActivitySearch, setShowActivitySearch] = useState(false);
    const [showRestaurantSearch, setShowRestaurantSearch] = useState(false);
    // const [searchActivity, setSearchActivity] = useState('');
    // const [searchRestaurant, setSearchRestaurant] = useState('');

    const {userid,cityid} = useParams();
    const history = useHistory();
    

    const getCity = () => {
        fetch(`http://localhost:2294/api/city/?id=${cityid}` )
        .then(response => response.json())
        .then(res => {
                setCity(res);
                decideShowSearch(res);
            }
                )
        .catch(error => console.log(error))
        
    }

    // useEffect( () => {
    //     getCity()
       
    //   },[searchActivity]);   
    
     if(!city.name) {
         getCity();   
     }
     

    const sendTo = (link) =>{
        history.push(link);
    }

    const decideShowSearch = (cityResponse) => {

        if(cityResponse.activities.length > 0){
            setShowActivitySearch(true)
        }else{
            setShowActivitySearch(false)
        }
        if(cityResponse.restaurants.length > 0){
            
            setShowRestaurantSearch(true)
        }else {
            setShowRestaurantSearch(false)
        }
    }

   
    if(city.activities) activities = <DataList
                                         data={city.activities}
                                         source ='activity'
                                         id1={cityid}
                                         userid={userid}
                                         updateCity={getCity} />
    if(city.restaurants) restaurants = <DataList 
                                         data={city.restaurants}
                                         source ='restaurant'
                                         id1={cityid}
                                         userid={userid}
                                         updateCity={getCity} />
   
    
    
    return(
        <div className="chosed-city">
            <div className="city-name">
                {city.name}
            </div>
            <div className="city-info">
                <div className="info-title">
                    <div className="activity">Activities</div>
                    <input type="text" placeholder="Search what you want..." 
                        style={{ display: showActivitySearch ? "block" : "none" }}
                        // onChange={(e) => setSearchActivity(e.target.value)}
                         />
                </div>
                
                <div className="activities-scroll">
                    <div className="activities-holder">
                        {activities}
                    </div>
                    
                </div>
                <div className="addIcon-holder">
                    <div>Add yours</div>
                    <img src={addIcon} alt="add-activity" className="add-icon" onClick={()=> sendTo(`/add/activity/${userid}/${cityid}`)} />
                </div>

            </div>

            <div className="city-info">
                <div className="info-title">
                    <div className="restaurant">Restaurants</div>
                    <input type="text" placeholder="Search what you want..." 
                        style={{ display: showRestaurantSearch ? "block" : "none" }} />
                </div>
                
                <div className="activities-scroll">
                    <div className="activities-holder">
                        {restaurants}
                    </div>
                    
                </div>
                <div className="addIcon-holder">
                    <div>Add yours</div>
                    <img src={addIcon} alt="add-restaurant" className="add-icon"  onClick={()=> sendTo(`/add/restaurant/${userid}/${cityid}`)}/>
                </div>

            </div>

           
        </div>
    )
}

export default ChosedCity;