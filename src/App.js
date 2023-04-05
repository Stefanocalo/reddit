import logo from './logo.svg';
import './App.css';
//Redix imports
import { useSelector, useDispatch} from 'react-redux';
//Components imports
import { NavBar } from './components/navBar/NavBar';
import { SubReddit } from './components/subReddit/SubReddit';
import { useEffect } from 'react';

function App() {

  const lightTheme = useSelector(state => state.reddit.isLightMode);
  console.log(lightTheme)

  //Fetching sunReddits
  const dispatch = useDispatch();
  useEffect(() => {
    
  },[])

  return (
    <div style={{backgroundColor: lightTheme ? 'white' : 'black'}} className='App'>
      <NavBar/>
      <SubReddit/>
    </div>
  );
}

export default App;
