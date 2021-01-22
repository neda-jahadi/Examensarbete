import React, { useState } from 'react';
import './DataList.css';
import deleteIcon from '../assets/delete.png';
import commentIcon from '../assets/comment.png';
import backgroundImg from '../assets/background.jpg';
import {useHistory} from 'react-router-dom';

const DataList = ({ data, source, id1,userid, updateCity }) => {
    const history = useHistory();
    const [like, setLike] = useState(false);
    const [comment, setComment] = useState('');
    const [chosedIndex, setIndex] = useState();
    const [userName, setUserName] = useState('');


    let deleteTitle = '', editTitle = '', commentTitle = '';

    switch (source) {
        case 'activity':
            deleteTitle = 'activity';
            editTitle = 'editactivity';
            commentTitle = 'activity';
            break;
    
        default:
            deleteTitle = 'restaurant';
            editTitle = 'editrestaurant';
            commentTitle = 'restaurant';
            break;
    }

    const getUser = () => {
        fetch(`http://localhost:2294/api/user/?userid=${userid}` )
        .then(response => response.json())
        .then(res => {
                setUserName(res.name)
            }
                )
        .catch(error => console.log(error))
    }

    if(userName ===''){
        getUser();
    }

    async function onSendComment (name,address) {
        let newComment = { name: userName, comment: comment}
        let url= `http://localhost:2294/api/addcomment/?cityid=${id1}&title=${commentTitle}&name=${name}&address=${address}`
        // console.log(url);
        // console.log(newComment)
             const response = await fetch(url, {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(newComment)
         })
     const text = await response.text();
     console.log(text);
        setIndex();
        updateCity();
 }


    const OnDeleteEntity = (data) => {
        let url = `http://localhost:2294/api/deletentity/?id1=${id1}&title=${deleteTitle}&entityname=${data.name}&entityaddress=${data.address}`;
        console.log(url);
        fetch(url)
            .then(response => response.text())
            .then(res => console.log(res))
            .catch(error => console.log(error))
        updateCity();
    }

    

    let dataList = data.map((datum, index) => <div className="activity-box" key={index}>
            <div className="img-holder">
                <img src={backgroundImg} alt="backImg" className="backImg" />

            </div>
            <div className="activity-holder">
                <div>
                    <div className="title">Name:</div>
                    <div className="item-info">{datum.name}</div>
                </div>
                <div>
                    <div className="title">Address:</div>
                    <div className="item-info">{datum.address}</div>
                </div>
                <div>
                    <div className="title">Likes: </div>
                    <div className="item-info">{datum.likes}</div>
                </div>
                <div>
                    <div className="title">Comments: </div>
                    
                </div>
                <div className="comment-holder" 
                     style={{display: index === chosedIndex  ? 'none' : 'block'}}>
                    {datum.comments.map((comment, index) => 
                        <div key={index}>
                            <span className="user">{comment.name}:</span>
                            <span style={{marginLeft: 5}}>{comment.comment}</span>
                        </div> )
                     }
                </div>

                <div style={{display: index === chosedIndex  ? 'inline-block' : 'none'}}>
                    <div className ="new-comment">
                        <textarea type="comment" onChange={(e) => setComment(e.target.value)} />
                        <button className="send-commentbtn" onClick={() => onSendComment(datum.name,datum.address)} >Send!</button>
                    </div>
                    
                </div>

            </div>

            <div className="iconForItem-holder">
                {!like
                    ? <div className="like" onClick={() => setLike(true)}>Like </div>
                    : <div className="liked" onClick={() => setLike(false)}>Liked </div>}

                <div className="Delete-comment">
                    <img src={commentIcon} alt="comment" onClick={() => setIndex(index)} />
                    <img src={deleteIcon} alt="delete" className="delete-icon" onClick={() => OnDeleteEntity(datum)} />
                </div>

            </div>

        </div>)
    

return (
    <>
        {dataList}
    </>
)
}

export default DataList;