import React,{useState,useEffect} from 'react';
import './AddUrsActivity.css';
import {useHistory} from 'react-router-dom';
import {useParams} from 'react-router-dom';


const AddUrsActivity = () => {

    let title = '', apiTitle = '',SubmitionMessage = '';
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [comment, setComment] = useState('');
    const [userName, setUserName] = useState('');
    const [nameValid, setNameValid] = useState(false);
    const [addressValid, setAddressValid] = useState(false);
    const [commentValid, setCommentValid] = useState(false);
    const [submitMsgClass, setSubmitMsgClass] = useState('inactive-submit-error');

    const history = useHistory();
    const {item,userid,cityid} = useParams();
    const [city, setCity] = useState({});

    let submitBtnStatus = 'inactiveBtn';

    if(nameValid && addressValid && commentValid && name!=='' && address!=='' && comment!=='') {
        submitBtnStatus = 'activeBtn';
    }

    const sendTo = (link) =>{
        history.push(link);
    }

    const componentIsMounted = React.useRef(true);

    useEffect(() => {
        return () => {
            componentIsMounted.current = false
        }
    }, [])

    const getCity = () => {
        fetch(`https://trip-adviser.herokuapp.com/api/city/?id=${cityid}` )
        .then(response => response.json())
        .then(res => {
            if(componentIsMounted.current){
                setCity(res)
            }
        })
        .catch(error => console.log(error))
        
    }
    
     if(!city.name) {
         getCity();
         
     }

     const getUser = () => {
        fetch(`https://trip-adviser.herokuapp.com/api/user/?userid=${userid}` )
        .then(response => response.json())
        .then(res => {
            if(componentIsMounted.current){
                setUserName(res.name)
            }
               
        })
        .catch(error => console.log(error))
    }

    if(userName ===''){
        getUser();
    }
     

    switch (item) {
        case 'activity':
            title = 'Add your favorite Activity';
            apiTitle = 'activities';
            SubmitionMessage ='This activity already exists';
            break;
        default: 
            title = 'Add your favorite Restaurant';
            apiTitle = 'restaurants';
            SubmitionMessage ='This restaurant already exists';

            break;
       
    }

    const IfThereIsAlready = (item) => {
        let found = [];
        if(apiTitle === 'activities')
              found = city.activities;
            else 
              found = city.restaurants;

            const res = found.find(element =>
                 (element.address.toLowerCase() === item.address.toLowerCase() 
                    && element.name.toLowerCase() === item.name.toLowerCase()))
            if(res) {
                console.log('Already exist');
                setSubmitMsgClass('active-submit-error');
            } else {
                insertTheEntity(item)
            }
        
    }

    
    async function onSubmit() {
        let comments = [{ name: userName, comment: comment}];
        let lovers = [userid];
        let owner = userid;
        let item = {name: name, address: address, comments, likes: '1', lovers, owner};
        IfThereIsAlready(item)
    }

    async function insertTheEntity (item) {
           const response = await fetch(`https://trip-adviser.herokuapp.com/api/add/?title=${apiTitle}&id=${cityid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            })
        const text = await response.text();
        if(componentIsMounted.current){
            console.log(text);   
            sendTo(`/city/${userid}/${cityid}`);
        }
       
    }

    return(
        <div className="content-holder">
            <div className="title">
                <span>{title}</span>
            </div>
            <div className="content">
                <div>
                    <input type="text" placeholder="Name ... " className="input" 
                        pattern="[a-zA-ZÀ-ž0-9][a-zA-Z0-9À-ž-,’'.\s]{0,50}"
                        onChange={(e) => {
                            setName(e.target.value)
                            setNameValid(e.target.validity.valid)
                            setSubmitMsgClass('inactive-submit-error');
                            }}/>

                    <div className="error-name">Signs(-,’'.) Letter Number (Min 1-Max 50) </div>
                </div>

                <div>
                    <input  type="text" placeholder="Address ..." className="input"
                         pattern="[a-zA-ZÀ-ž0-9][a-zA-Z0-9À-ž-,’'.\s]{4,50}"
                         onChange={(e) => {
                             setAddress(e.target.value)
                             setAddressValid(e.target.validity.valid)
                             setSubmitMsgClass('inactive-submit-error');
                             }} />
                             
                    <div  className="error-address" >Signs(-,’'.) Letter Number (Min 5-Max 50)</div>
                </div>
                
                <div>
                    <input type="text" placeholder="Comment ..."  className="input-comment"
                          pattern="[a-zA-ZÀ-ž0-9][a-zA-Z0-9À-ž-.,)(:'’\s]{2,150}"
                         onChange={(e) => {
                             setComment(e.target.value)
                             setCommentValid(e.target.validity.valid)
                             setSubmitMsgClass('inactive-submit-error');
                             }} />

                    <div  className="error-comment" >Min 3-Max 150,Just Letter Number and -),.(!:’'</div>
                </div>
                
            </div>
            <div className="submit">
                <div className="submit-btn-holder">
                    <button className={submitBtnStatus} onClick={()=> onSubmit()}>Submit!</button>
                </div>
                <div className={submitMsgClass}>{SubmitionMessage}</div>
            </div>
        </div>
    )
}

export default AddUrsActivity;