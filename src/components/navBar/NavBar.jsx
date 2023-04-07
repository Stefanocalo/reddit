import React, {useState, useEffect} from "react";
import './NavBar.css';
//Icons import
import {CgDarkMode} from 'react-icons/cg';
import {BsReddit} from 'react-icons/bs';
//motion imports
import { animate, motion } from "framer-motion";
//Spring imports
import { animated, useSpring } from "react-spring"; 
//Redux imports
import { useDispatch, useSelector } from "react-redux";
import {setSearchTerm, toggleDarkMode} from "../../store/redditSlice";


export function NavBar({isMenuOpen, setIsMenuOpen}) {

    useEffect(() => {
    },[isMenuOpen])

    const isLightMode = useSelector(state => state.reddit.isLightMode);
    //Theme toggle
    const [active, setActive] = useState(false);

    const dispatch = useDispatch();
    function handleClick() {
        setActive(prevState => !prevState);
        animate("#theme", {rotate: active? 180 : 0});
        dispatch(toggleDarkMode());
    }
    //Access theme in global state
    const theme = useSelector(state => state.reddit.isLightMode);
    //Input state
    const [input, setInput] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(setSearchTerm(input));
    };

    //Side menu animation
    const slide = useSpring({
        right: isMenuOpen ? '0%' : !isMenuOpen && window.innerWidth < 600 ? '-100%' : '0%'
    })

    return(
        <div className='navBarContainer'>
            <div className="section">
                <div 
                onClick={() => {
                    setIsMenuOpen(!isMenuOpen);
                }}
                className="hamburgerContainer">
                    <div style={{backgroundColor: theme ? 'black' : 'white'}} className="bar"></div>
                    <div style={{backgroundColor: theme ? 'black' : 'white'}} className="bar"></div>
                    <div style={{backgroundColor: theme ? 'black' : 'white'}} className="bar"></div>
                </div>
                <div className="logoContainer">
                    <BsReddit style={{fontSize: '1.6rem',color: 'rgb(140, 190, 254)'}} />
                    <span style={{color: theme ? 'black' : 'white'}}>Reddit</span>
                    <span style={{color: theme ? 'black' : 'white'}}>Client</span>
                </div>
            </div>
            <animated.div 
            style={slide}
            className="centralSection">
                <form
                style={{display: 'flex', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}}
                onSubmit={(e) => handleSubmit(e)}
                >
                    <input
                    className="searchInput"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onSubmit={() => console.log(input)}
                    />
                    <button
                    className='searchButton'
                    onClick={(e) => handleSubmit(e)}
                    >
                        Search
                    </button>
                </form>                
            </animated.div>
            <motion.div 
            onClick={() => handleClick()}
           
            id="theme"
            className="themeSection">
                <CgDarkMode style={{color: theme ? 'black' : 'white' ,fontSize:'1.6rem', opacity: isMenuOpen ? 1 : 0}}/>
            </motion.div>
        </div>
    )
}