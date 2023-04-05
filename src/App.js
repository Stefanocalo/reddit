import { useEffect } from 'react';
import './App.css';
//Redix imports
import { useSelector, useDispatch} from 'react-redux';
//Components imports
import { NavBar } from './components/navBar/NavBar';
import { SubReddit } from './components/subReddit/SubReddit';
import { Feed } from './components/Feed/Feed';

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
      <Feed/>
    </div>
  );
}

export default App;
