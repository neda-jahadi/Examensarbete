import React from 'react';
import './AddUrs.css';
import {useHistory} from 'react-router-dom';
import {useParams} from 'react-router-dom';


const AddUrs = () => {

    const history = useHistory();
    const {id} = useParams();

    const sendTo = (link) =>{
        history.push(link);
    }

    return(
        <div className="content-holder">
            <div className="title">
                <span>Add your favorite</span>
            </div>
            <div className="content">
                <input type="text" placeholder="Name ... " />
                <input  type="text" placeholder="Address ..." className="input-address" />
                <input type="text" placeholder="Comment ..."  className="input-comment" />
                <div>
                   choose image:  
                </div>
            </div>
            <div className="submit">
                <button onClick={()=> sendTo(`/travel/${id}`)}>Submit!</button>
            </div>
        </div>
    )
}

export default AddUrs;