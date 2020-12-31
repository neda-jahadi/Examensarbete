import React,{useState} from 'react';
import './App.css';
import Travel from './components/Travel';
import ChosedCity from './components/ChosedCity';
import Container from './components/Container';
import {BrowserRouter, Route} from 'react-router-dom';

function App() {

  let cities = ['Paris', 'Rome', 'Kualalampour', 'Stickholm', 'Madrid', 'London',
                  'Tokyo', 'Rio', 'Moscow', 'Los Angeles', 'Milan', 'Sergy', ]

  

  return (
   
    <div>
      <Container>
        <BrowserRouter>

          <Route path="/travel" exact>
              <Travel cities={cities}/>
          </Route>

          <Route path="/travel/:id" exact>
              <ChosedCity cities={cities}/>
          </Route>

        </BrowserRouter>
      </Container>
      
    </div>
       
    
       

    
  );
}

export default App;
