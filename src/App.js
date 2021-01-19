import React from 'react';
import './App.css';
import Travel from './components/Travel';
import ChosedCity from './components/ChosedCity';
import Container from './components/Container';
import {BrowserRouter, Route} from 'react-router-dom';
import AddUrsActivity from './components/AddUrsActivity';

import Header from './components/Header';
import Login  from './components/Login';
import CreateAccount from './CreateAccount';

function App() {
  

  return (
   
    <div>
      <Container>
        
        <BrowserRouter>
          
          <Route path="/" exact>
              <Header />
              <Login />
          </Route>

          <Route path="/account" exact>
              <Header />
              <CreateAccount />
          </Route>

          <Route path="/travel/:userid" exact>
              <Header />
              <Travel />
          </Route>

          <Route path="/travel/city/:userid/:cityid" exact>
              <Header />
              <ChosedCity />
          </Route>

          <Route path="/add/:item/:userid/:cityid">
              <Header />
              <AddUrsActivity />
          </Route>

          {/* <Route path="/add-restaurant/:id">
              <Header />
              <AddUrsRestaurant />
          </Route> */}

        </BrowserRouter>
      </Container>
      
    </div>
       
    
       

    
  );
}

export default App;
