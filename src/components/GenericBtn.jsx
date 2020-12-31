import React from 'react';
import './GenericBtn.css';
import {useHistory} from 'react-router-dom';

const GenericBtn = ({text, color, link}) => {

	const history = useHistory();

	const sendTo = (link) =>{
		history.push(link);
	}
	
    return(
			<button onClick={()=>sendTo(link)} className={'generic ' + color}>
				{text}	
			</button>
    )
}

export default GenericBtn;
