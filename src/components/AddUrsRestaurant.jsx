import React,{useState} from 'react';
import './AddUrsRestaurant.css';
import {useHistory} from 'react-router-dom';
import {useParams} from 'react-router-dom';


const AddUrsRestaurant = () => {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [comment, setComment] = useState('');

    const history = useHistory();
    const {id} = useParams();

    const sendTo = (link) =>{
        history.push(link);
    }

    async function onSubmit() {
        let restaurant = {name: name, address: address, comment: comment, likes: '1'};
  
         const response = await fetch(`http://localhost:2294/api/addrestaurant?id=${id}`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(restaurant)
              })
          const text = await response.text();
          console.log(text);
              
          sendTo(`/travel/${id}`);
      }

    return(
        <div className="content-holder">
            <div className="title">
                <span>Your favorite restaurant</span>
            </div>
            <div className="content">
                <input type="text" placeholder="Name ... " onChange={(e) => setName(e.target.value) } />
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

export default AddUrsRestaurant;