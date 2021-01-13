import React, {useState} from 'react';
import './DataList.css';
import deleteIcon from '../assets/delete.png';
import editIcon from '../assets/edit.png';
import backgroundImg from '../assets/background.jpg';


const DataList = ({data,source,id1, updateCity}) => {
    const [like, setLike] = useState(false);

    const OnDeleteActivity = (id2) => {
        fetch(`http://localhost:2294/api/deleteactivity/?id1=${id1}&id2=${id2}` )
        .then(response => response.text())
        .then(res => console.log(res))
        .catch(error => console.log(error))
        updateCity();
    }

    const OnDeleteRestaurant = (id2) => {
        fetch(`http://localhost:2294/api/deleterestaurant/?id1=${id1}&id2=${id2}` )
        .then(response => response.text())
        .then(res => console.log(res))
        .catch(error => console.log(error))
        updateCity();
    }
    
    let dataList = null;
    {source==='activity' 
        ?   dataList = data.map((datum, index) => <div className="activity-box" key={index}>
                                                                        <div className="img-holder">
                                                                            <img src={backgroundImg} alt="backImg" className="backImg" />

                                                                        </div>
                                                                        <div className="activity-holder">
                                                                            <div>
                                                                                <div className="title">Name:</div>
                                                                                <div className="item-info">{datum.aname}</div>
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
                                                                                <img src={deleteIcon} alt="delete" className="delete-icon" onClick={() => OnDeleteActivity(index)} />
                                                                                <img src={editIcon} alt="edit" />
                                                                            </div>
                                                                            
                                                                        </div>
                                                                       
                                                  </div>)
        :  dataList = data.map((datum, index) => <div className="activity-box" key={index}>
                                                                        <div className="img-holder">
                                                                            <img src={backgroundImg} alt="backImg" className="backImg" />

                                                                        </div>
                                                                        <div className="activity-holder">
                                                                            <div>
                                                                                <div className="title">Name:</div>
                                                                                <div className="item-info">{datum.rname}</div>
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
                                                                                <img src={deleteIcon} alt="delete" className="delete-icon" onClick={() => OnDeleteRestaurant(index)}/>
                                                                                <img src={editIcon} alt="edit" />
                                                                            </div>
                                                                            
                                                                        </div>
                                                                    
                                                                </div>)
    }

    return(
        <>
            {dataList}
        </>
    )
}

export default DataList;