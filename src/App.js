import logo from './logo.svg';
import './App.css';
//Components imports
import { NavBar } from './components/navBar/NavBar';
import { useSelector } from 'react-redux';

function App() {

  const lightTheme = useSelector(state => state.reddit.isLightMode);

  return (
    <div className={lightTheme ? 'App' : 'darkApp'}>
      <NavBar/>
    </div>
  );
}

export default App;
