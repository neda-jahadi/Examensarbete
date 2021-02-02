import React, { useState } from 'react';
import './DataList.css';
import deleteIcon from '../assets/delete.png';
import commentIcon from '../assets/comment.png';
import activityBackground from '../assets/activityBack.jpg';
import restaurantBackground from '../assets/restaurantBack.jpg';
import likeIcon from '../assets/like.png';
import likedIcon from '../assets/liked.png';


const DataList = ({ data, source, id1,userid, updateCity }) => {
    // const [like, setLike] = useState(false);
    const [comment, setComment] = useState('');
    const [chosedIndex, setIndex] = useState();
    const [userName, setUserName] = useState('');
    // const [indexForVote, setIndexForVote] = useState();

    let deleteTitle = '', commentTitle = '', backgroundImg = activityBackground;

    switch (source) {
        case 'activity':
            deleteTitle = 'activity';
            // editTitle = 'editactivity';
            commentTitle = 'activity';
            break;
    
        default:
            deleteTitle = 'restaurant';
            // editTitle = 'editrestaurant';
            commentTitle = 'restaurant';
            backgroundImg = restaurantBackground;
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
        let url= `http://localhost:2294/api/addcomment/?cityid=${id1}&name=${name}&address=${address}&title=${commentTitle}`
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
        let url = `http://localhost:2294/api/deletentity/?id1=${id1}&entityname=${data.name}&entityaddress=${data.address}&title=${deleteTitle}`;
        // console.log(url);
        fetch(url)
            .then(response => response.text())
            .then(res => {console.log(res); updateCity();})
            .catch(error => console.log(error))
        
    }
    
    const InsertFan = (data) => {
        let url = `http://localhost:2294/api/insertfan/?id1=${id1}&userid=${userid}&entityname=${data.name}&entityaddress=${data.address}&title=${source}`;
        fetch(url)
            .then(response => response.text())
            .then(res => {console.log(res); updateCity();})
            .catch(error => console.log(error))
    }

    const deleteFan = (data) => {
        let url = `http://localhost:2294/api/deletefan/?id1=${id1}&userid=${userid}&entityname=${data.name}&entityaddress=${data.address}&title=${source}`;
        fetch(url)
            .then(response => response.text())
            .then(res => {console.log(res); updateCity();})
            .catch(error => console.log(error))
    }
    

    const OnVote = (data) => {
        let url = `http://localhost:2294/api/votentity/?id1=${id1}&entityname=${data.name}&entityaddress=${data.address}&title=${source}`;
        fetch(url)
            .then(response => response.text())
            .then(res => {console.log(res); InsertFan(data);})
            .catch(error => console.log(error))
    }

    const OnUnvote = (data) => {
        let url = `http://localhost:2294/api/unvotentity/?id1=${id1}&entityname=${data.name}&entityaddress=${data.address}&title=${source}`;
        fetch(url)
            .then(response => response.text())
            .then(res => {console.log(res); deleteFan(data);})
            .catch(error => console.log(error))
    }

    let dataList = data.map((datum, index) => <div className="activity-box" key={index}>
            <div className="img-holder">
                <img src={backgroundImg} alt="backImg" className="backImg" />

            </div>
            <div className="activity-holder">
                <div>
                    {/* <div className="title">Name:</div> */}
                    <div className="item-info-name">{datum.name}</div>
                </div>
                <div>
                    {/* <div className="title">Address:</div> */}
                    <div className="item-info">{datum.address}test</div>
                </div>
                <div>
                    {/* <div className="title">Likes: </div> */}
                    <div className="item-info">
                        Liked by <span style={{fontWeight: 'bold'}}>{datum.likes}</span>
                    </div>
                </div>
                <div>
                    <div className="title">Comments: </div>
                    
                </div>
                <div className="comment-holder" 
                     style={{display: index === chosedIndex  ? 'none' : 'block'}}>
                    {datum.comments.map((comment, index) => 
                        <div className="user-comment" key={index}>
                            <span className="user">{comment.name}:</span>
                            <span className="comment-content" >{comment.comment}</span>
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
               {(datum.lovers.filter(ID => ID === userid).length) > 0 
                    ? <img className="like-icon" src={likedIcon} alt="liked" onClick={() => {OnUnvote(datum);  }}/>
                    : <img className="like-icon" src={likeIcon} alt="like" onClick={() => {OnVote(datum);  }} />

                }

                <div className="delete-comment">
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