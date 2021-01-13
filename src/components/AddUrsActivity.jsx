import React,{useState} from 'react';
import './AddUrsActivity.css';
import {useHistory} from 'react-router-dom';
import {useParams} from 'react-router-dom';


const AddUrsActivity = () => {

    let title = '', apiTitle = '';
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [comment, setComment] = useState('');

    const history = useHistory();
    const {item,id} = useParams();
    
    const sendTo = (link) =>{
        history.push(link);
    }

    switch (item) {
        case 'activity':
            title = 'Your favorite Activity';
            apiTitle = 'activities';
            break;
        case 'restaurant':
            title = 'Your favorite Restaurant';
            apiTitle = 'restaurants';
            break;
        case 'editactivity':
            title = 'Edit Activity';
            apiTitle = 'editactivity';
            break;
    
        default:
            title = 'Edit Restaurant';
            apiTitle = 'editrestaurant';
            break;
    }

    async function onSubmit() {
      let item = {name: name, address: address, comment: comment, likes: '1'};

       const response = await fetch(`http://localhost:2294/api/add/?title=${apiTitle}&id=${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            })
        const text = await response.text();
        console.log(text);
            
        sendTo(`/travel/${id}`);
    }

    return(
        <div className="content-holder">
            <div className="title">
                <span>{title}</span>
            </div>
            <div className="content">
                <input type="text" placeholder="Name ... " onChange={(e) => setName(e.target.value) }/>
                <input  type="text" placeholder="Address ..." className="input-address" onChange={(e) => setAddress(e.target.value)} />
                <input type="text" placeholder="Comment ..."  className="input-comment" onChange={(e) => setComment(e.target.value)} />
                <div>
                   choose image:  
                </div>
            </div>
            <div className="submit">
                <button onClick={()=> onSubmit()}>Submit!</button>
            </div>
        </div>
    )
}

export default AddUrsActivity;