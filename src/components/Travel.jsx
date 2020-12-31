import React from 'react';
import './Travel.css';

const Travel = ({showChosedCity}) => {

    let cities = ['Paris', 'Rome', 'Kualalampour', 'Stickholm', 'Madrid', 'London',
                  'Paris', 'Rome', 'Kualalampour', 'Stickholm', 'Madrid', 'London', ]
    const jsxCities = cities.map((city, index) => <div key={index} style={{padding: 10}}>
                                                      {city}
                                                  </div>)
    return(
        <div className='travel-container'>
            <div>Choose your favorite destination</div>
            
            <div>

                <input type='text' placeholder="Search what you want..." />

            </div>

            <div className="cities">
                {jsxCities}
            </div>
            
        </div>
    )
}

export default Travel;