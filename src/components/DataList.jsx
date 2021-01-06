import React, {useState} from 'react';
import './DataList.css';
import deleteIcon from '../assets/delete.png';
import editIcon from '../assets/edit.png';
import backgroundImg from '../assets/background.jpg';
import likeIcon from '../assets/like.png';
import likedIcon from '../assets/liked.png';

const DataList = ({data}) => {
    const [like, setLike] = useState(false);

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
                                                                                <div className="title">Comment: </div>
                                                                                <div className="item-info">{datum.comment}</div>
                                                                            </div>
                                                                            
                                                                        </div>
                                                                        
                                                                        <div className="iconForItem-holder">
                                                                            {!like 
                                                                                ? <div className="like" onClick={() => setLike(true)}>Like </div>
                                                                                : <div className="liked" onClick={() => setLike(false)}>Liked </div>} 
                                                                            
                                                                            <div className="Delete-edit">
                                                                                <img src={deleteIcon} alt="delete" className="delete-icon" />
                                                                                <img src={editIcon} alt="edit" />
                                                                            </div>
                                                                            
                                                                        </div>
                                                                       
                                                           </div>)

    return(
        <>
            {dataList}
        </>
    )
}

export default DataList;