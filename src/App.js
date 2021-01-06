import React, {useEffect, useState} from 'react';
import './App.css';
import Travel from './components/Travel';
import ChosedCity from './components/ChosedCity';
import Container from './components/Container';
import {BrowserRouter, Route} from 'react-router-dom';
import AddUrs from './components/AddUrs';
import Header from './components/Header';

function App() {

  const [datacities, setCities] = useState([]);

  let cities = ['Paris', 'Rome', 'Kualalampour', 'Stockholm', 'Madrid', 'London',
                  'Tokyo', 'Rio', 'Moscow', 'Los Angeles', 'Milan', 'Sergy', ]

  useEffect(async () => {
    const response = await fetch('/api/cities', { method: 'GET' });;
    setCities(response.json());
  }, []);

  console.log('cities are:', datacities);

  const addNewCity = (newCity) => {
    cities.push(newCity);
  }

  return (
   
    <div>
      <Container>
        <BrowserRouter>

          <Route path="/travel" exact>
              <Travel cities={cities} addNewCity={addNewCity} />
          </Route>

          <Route path="/travel/:id" exact>
              <Header />
              <ChosedCity cities={cities}/>
          </Route>

          <Route path="/add-activity-restaurant/:id">
              <Header />
              <AddUrs />
          </Route>

        </BrowserRouter>
      </Container>
      
    </div>
       
    
       

    
  );
}

export default App;
