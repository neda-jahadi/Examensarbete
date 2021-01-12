import React,{useEffect, useState} from 'react';
import './ChosedCity.css';
import {useHistory} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import addIcon from '../assets/add.png';
import DataList from './DataList';

const ChosedCity = () => {
    let activities = null;
    let restaurants = null;
    
    const [city, setCity] = useState({});
    
    const {id} = useParams();
    const history = useHistory();
    

    const getCity = () => {
        fetch(`http://localhost:2294/api/city/?id=${id}` )
        .then(response => response.json())
        .then(res => {setCity(res); console.log('activity',res.activities); console.log('restaurant', res.restaurants)})
        .catch(error => console.log(error))
        
    }
        
      
    
   
     if(!city.name) {
         getCity();
         
     }
     

    const sendTo = (link) =>{
        history.push(link);
    }

    // let data = [{name: 'jssj', address: 'msncjsnjs', comment:'ssds', likes:1 },
    //                     {name: 'jnzsjk', address: 'Fredåsgatan 18B 31276 Göteborg', comment:'ssds', likes:1 },
    //                     {name: 'sklcishi', address: 'knc jszk', comment:'ssds', likes:1 },
    //                     {name: 'sllsos', address: 'skcnsjs', comment:'ssds', likes:1 },
    //                     {name: 'sxkcnsis', address: 'l.los', comment:'ssds', likes:1 },
    //                     {name: 'szkiidid', address: 'ksmksi', comment:'ssds', likes:1 },
    //                     {name: 'xmncjksj', address: 'ucsknsj', comment:'ssds', likes:1 },
    //                     {name: 'jnzsjk', address: 'Fredåsgatan 18B 31276 Göteborg', comment:'ssds', likes:1 },
    //                     {name: 'sklcishi', address: 'knc jszk', comment:'ssds', likes:1 },
    //                     {name: 'sllsos', address: 'skcnsjs', comment:'ssds', likes:1 },
    //                     {name: 'sxkcnsis', address: 'l.los', comment:'ssds', likes:1 },
    //                     {name: 'szkiidid', address: 'ksmksi', comment:'ssds', likes:1 },
    //                     {name: 'xmncjksj', address: 'ucsknsj', comment:'ssds', likes:1 },
    //                  ]
   
    if(city.activities) activities = <DataList data={city.activities} />
    if(city.restaurants) restaurants = <DataList data={city.restaurants} />
   
    
    
    return(
        <div className="chosed-city">
            <div className="city-name">
                {city.name}
            </div>
            <div className="city-info">
                <div className="info-title">
                    <div>Activities</div>
                    <input type="text" placeholder="Search what you want..." style={{marginLeft: 20}} />
                </div>
                
                <div className="activities-scroll">
                    <div className="activities-holder">
                        {activities}
                    </div>
                    
                </div>
                <div className="addIcon-holder">
                    <div>Add yours</div>
                    <img src={addIcon} alt="add-activity" className="add-icon" onClick={()=> sendTo(`/add-activity-restaurant/${id}`)} />
                </div>

            </div>

            <div className="city-info">
                <div className="info-title">
                    <div>Restaurants</div>
                    <input type="text" placeholder="Search what you want..." style={{marginLeft: 20}} />
                </div>
                
                <div className="activities-scroll">
                    <div className="activities-holder">
                        {restaurants}
                    </div>
                    
                </div>
                <div className="addIcon-holder">
                    <div>Add yours</div>
                    <img src={addIcon} alt="add-activity" className="add-icon"  onClick={()=> sendTo(`/add-activity-restaurant/${id}`)}/>
                </div>

            </div>

           
        </div>
    )
}

export default ChosedCity;