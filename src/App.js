import React,{useState} from 'react';
import './App.css';
import Travel from './components/Travel';
import ChosedCity from './components/ChosedCity';
import Container from './components/Container';
function App() {

  const TRAVEL= 'travel', CHOSEDCITY='chosedcity';
  const [screen, setScreen] = useState(TRAVEL);

  let content = null;

  switch (screen) {

    case CHOSEDCITY:
      content = <ChosedCity 
      showTravel = {() => setScreen(Travel)} />
      break;

    default:
      content = <Travel 
      showChosedCity = {() => setScreen(CHOSEDCITY)} />
  }

  return (
   
    <div>
      <Container>
        {content}
      </Container>
      
    </div>
       
    
       

    
  );
}

export default App;
