import { useEffect, useState } from 'react';
import './App.css';
//Redix imports
import { useSelector, useDispatch} from 'react-redux';
//Components imports
import { NavBar } from './components/navBar/NavBar';
import { SubReddit } from './components/subReddit/SubReddit';
import { Feed } from './components/Feed/Feed';
//Loading skeleton
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';


function App() {

  const lightTheme = useSelector(state => state.reddit.isLightMode);

  //Hamburger menu state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    isMenuOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto';
  },[isMenuOpen]);

  return (
    <SkeletonTheme baseColor="#7F7F7F" highlightColor="#BEBEBE">
    <div style={{backgroundColor: lightTheme ? 'white' : 'black'}} className='App'>
      <NavBar 
      setIsMenuOpen={setIsMenuOpen}
      isMenuOpen={isMenuOpen}/>
      <SubReddit 
      setIsMenuOpen={setIsMenuOpen}
      isMenuOpen={isMenuOpen}/>
      <Feed/>
    </div>
    </SkeletonTheme>
  );
}

export default App;
