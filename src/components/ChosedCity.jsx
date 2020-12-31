import React from 'react';
import './ChosedCity.css';
import {useHistory} from 'react-router-dom';
import {useParams} from 'react-router-dom';

const ChosedCity = ({cities}) => {
    
    const {id} = useParams();
    const history = useHistory();

    const sendTo = (link) =>{
        history.push(link);
    }
     
    return(
        <div className="chosed-city">
            <div>{cities[id]}</div>
            <button onClick={()=> sendTo("/travel")}>Travel</button>
        </div>
    )
}

export default ChosedCity;