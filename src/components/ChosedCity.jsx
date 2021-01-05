import React from 'react';
import './ChosedCity.css';
import {useHistory} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import addIcon from '../assets/add.png';
import DataList from './DataList';

const ChosedCity = ({cities}) => {
    
    const {id} = useParams();
    const history = useHistory();
    
    const sendTo = (link) =>{
        history.push(link);
    }

    let data = [{name: 'jssj', address: 'msncjsnjs', comment:'ssds', likes:1 },
                        {name: 'jnzsjk', address: 'Fredåsgatan 18B 31276 Göteborg', comment:'ssds', likes:1 },
                        {name: 'sklcishi', address: 'knc jszk', comment:'ssds', likes:1 },
                        {name: 'sllsos', address: 'skcnsjs', comment:'ssds', likes:1 },
                        {name: 'sxkcnsis', address: 'l.los', comment:'ssds', likes:1 },
                        {name: 'szkiidid', address: 'ksmksi', comment:'ssds', likes:1 },
                        {name: 'xmncjksj', address: 'ucsknsj', comment:'ssds', likes:1 },
                        {name: 'jnzsjk', address: 'Fredåsgatan 18B 31276 Göteborg', comment:'ssds', likes:1 },
                        {name: 'sklcishi', address: 'knc jszk', comment:'ssds', likes:1 },
                        {name: 'sllsos', address: 'skcnsjs', comment:'ssds', likes:1 },
                        {name: 'sxkcnsis', address: 'l.los', comment:'ssds', likes:1 },
                        {name: 'szkiidid', address: 'ksmksi', comment:'ssds', likes:1 },
                        {name: 'xmncjksj', address: 'ucsknsj', comment:'ssds', likes:1 },
                     ]
     
    let dataList = <DataList data={data} />
    
    return(
        <div className="chosed-city">
            <div className="city-name">{cities[id]}</div>
            <div className="city-info">
                <div className="info-title">
                    <div>Activities</div>
                    <input type="text" placeholder="Search what you want..." style={{marginLeft: 20}} />
                </div>
                
                <div className="activities-scroll">
                    <div className="activities-holder">
                        {dataList}
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
                        {dataList}
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