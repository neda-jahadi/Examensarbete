import React, { useState,useEffect } from 'react';
import './DataList.css';
import deleteIcon from '../assets/delete.png';
import commentIcon from '../assets/comment.png';
import activityBackground from '../assets/activityBack.jpg';
import restaurantBackground from '../assets/restaurantBack.jpg';
import likeIcon from '../assets/like.png';
import likedIcon from '../assets/liked.png';


const DataList = ({ count, setCount,data, source, id1,userid, updateCity, userName }) => {
    
    const [comment, setComment] = useState('');
    const [chosedIndex, setIndex] = useState();
    const [commentClicked, setCommentClicked] = useState(false);
    const [commentValid, setCommentValid] = useState(false);
    const [commentErrorStatus, setCommentErrorStatus] = useState(false);
    

    const componentIsMounted = React.useRef(true);

    useEffect(() => {
        return () => {
            componentIsMounted.current = false
        }
    }, [])

    let deleteTitle = '', commentTitle = '', backgroundImg = activityBackground;

    let sendBtnStatus = 'unsend-commentbtn';
    
    if(commentValid && comment!== '' ){
        sendBtnStatus = 'send-commentbtn';
    }else{
        sendBtnStatus ='unsend-commentbtn';
    }

    switch (source) {
        case 'activity':
            deleteTitle = 'activity';
            commentTitle = 'activity';
            break;
    
        default:
            deleteTitle = 'restaurant';
            commentTitle = 'restaurant';
            backgroundImg = restaurantBackground;
            break;
    }

    

    async function onSendComment (name,address) {
        let newComment = { name: userName, comment: comment}
        let url= `http://localhost:2294/api/addcomment/?cityid=${id1}&name=${name}&address=${address}&title=${commentTitle}`
        
             const response = await fetch(url, {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(newComment)
         })
     const text = await response.text();
     console.log(text);
     if(componentIsMounted.current){
        setIndex();
        setCommentClicked(false);
        // updateCity();
        setCount(count+1);
     }
        
 }


    const OnDeleteEntity = (data) => {
        let url = `http://localhost:2294/api/deletentity/?id1=${id1}&entityname=${data.name}&entityaddress=${data.address}&title=${deleteTitle}`;
        // console.log(url);
        fetch(url)
            .then(response => response.text())
            .then(res => {
                if(componentIsMounted.current){
                    console.log(res);
                    setCount(count+1);
                    // updateCity();
                }
                
            })
            .catch(error => console.log(error))
        
    }
    
    const InsertFan = (data) => {
        let url = `http://localhost:2294/api/insertfan/?id1=${id1}&userid=${userid}&entityname=${data.name}&entityaddress=${data.address}&title=${source}`;
        fetch(url)
            .then(response => response.text())
            .then(res => {
                if(componentIsMounted.current){
                    console.log(res);
                    // updateCity();
                    setCount(count+1);
                }
            })
            .catch(error => console.log(error))
    }

    const deleteFan = (data) => {
        let url = `http://localhost:2294/api/deletefan/?id1=${id1}&userid=${userid}&entityname=${data.name}&entityaddress=${data.address}&title=${source}`;
        fetch(url)
            .then(response => response.text())
            .then(res => {
                if(componentIsMounted.current){
                    console.log(res);
                    setCount(count+1);
                    // updateCity();
                }
                
            })
            .catch(error => console.log(error))
    }
    

    const OnVote = (data) => {
        let url = `http://localhost:2294/api/votentity/?id1=${id1}&entityname=${data.name}&entityaddress=${data.address}&title=${source}`;
        fetch(url)
            .then(response => response.text())
            .then(res => {
                if(componentIsMounted.current){
                    console.log(res);
                    InsertFan(data);
                }
                
            })
            .catch(error => console.log(error))
    }

    const OnUnvote = (data) => {
        let url = `http://localhost:2294/api/unvotentity/?id1=${id1}&entityname=${data.name}&entityaddress=${data.address}&title=${source}`;
        fetch(url)
            .then(response => response.text())
            .then(res => {
                if(componentIsMounted.current){
                    console.log(res);
                    deleteFan(data);
                }
                
            })
            .catch(error => console.log(error))
    }

   const ManageNewComment = (e) => {
    setComment(e.target.value);
    setCommentValid(e.target.validity.valid);
        if(e.target.validity.valid) {
            setCommentErrorStatus(false);
        }else{
            setCommentErrorStatus(true);
        }
        
   }
 
    let dataList = data.map((datum, index) => <div className="activity-box" key={index}>
            <div className="img-holder">
                <img src={backgroundImg} alt="backImg" className="backImg" />

            </div>
            <div className="activity-holder">
                <div className="name-address-like" style={{display: index === chosedIndex && commentClicked ? 'none' : 'block'}}>
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
                </div>
                
                <div>
                    <div className="title" >Comments: </div>
                    
                </div>

                <div className="new-comment-area" style={{display: index === chosedIndex && commentClicked ? 'inline-block' : 'none'}}>
                    <div className ="new-comment" >
                        <input 
                            pattern="[a-zA-ZÀ-ž0-9][a-zA-ZÀ-ž0-9.,)(:'’\s]{0,150}"
                            placeholder="No ?!%¤$#[/]=@"
                            onChange={(e) => ManageNewComment(e)} />
                        <button className={sendBtnStatus} onClick={() => onSendComment(datum.name,datum.address)} >Send!</button>
                    </div>

                    <div className="error-holder">
                        <span className="error" style={{opacity: commentErrorStatus ? 1 : 0}}>
                            Letter,Number, No ?!%¤$#[/]=@, Max 150
                        </span>
                    </div>
                    
                </div>
                
                <div className="comment-holder" 
                     style={{display: 'flex', flexDirection:'column'}}
                     >
                    {datum.comments.map((comment, index) => 
                        <div className="user-comment" key={index}>

                            <span className="user">{comment.name}:</span>
                            <span className="comment-content" >{comment.comment}</span>

                        </div> )
                     }
                </div>

               

            </div>

            <div className="iconForItem-holder">
               {(datum.lovers.filter(ID => ID === userid).length) > 0 
                    ? <img className="like-icon" src={likedIcon} alt="liked" onClick={() => {OnUnvote(datum);  }}/>
                    : <img className="like-icon" src={likeIcon} alt="like" onClick={() => {OnVote(datum);  }} />

                }

                <div className="delete-comment">
                    <img src={commentIcon} alt="comment" className="comment-icon"
                        onClick={() => {
                            setIndex(index);
                            setCommentClicked(!commentClicked);
                            // const test = myRef.current;
                            
                            // console.log(test)
                        }} />
                        
                    {datum.owner === userid &&
                        <img src={deleteIcon} alt="delete" className="delete-icon" onClick={() => OnDeleteEntity(datum)} />
                    }
                    
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