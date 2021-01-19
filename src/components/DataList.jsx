import React, { useState } from 'react';
import './DataList.css';
import deleteIcon from '../assets/delete.png';
import editIcon from '../assets/edit.png';
import backgroundImg from '../assets/background.jpg';
import {useHistory} from 'react-router-dom';

const DataList = ({ data, source, id1, updateCity }) => {
    const history = useHistory();
    const [like, setLike] = useState(false);
    let deleteTitle = '', editTitle = '';

    switch (source) {
        case 'activity':
            deleteTitle = 'activity';
            editTitle = 'editactivity';
            break;
    
        default:
            deleteTitle = 'restaurant';
            editTitle = 'editrestaurant';
            break;
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
                    <div className="title">Comment: </div>
                    <div className="item-info">{datum.comment}</div>
                </div>

            </div>

            <div className="iconForItem-holder">
                {!like
                    ? <div className="like" onClick={() => setLike(true)}>Like </div>
                    : <div className="liked" onClick={() => setLike(false)}>Liked </div>}

                <div className="Delete-edit">
                    <img src={deleteIcon} alt="delete" className="delete-icon" onClick={() => OnDeleteEntity(datum)} />
                    <img src={editIcon} alt="edit" onClick={() =>   history.push(`/add/${editTitle}/${index}`)} />
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