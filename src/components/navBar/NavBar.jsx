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
import {toggleDarkMode} from "../../store/redditSlice";
import { SearchBar } from "./SearchBar";


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
                <SearchBar/>        
            </animated.div>
            <motion.div 
            onClick={() => handleClick()}
           
            id="theme"
            className="themeSection">
                <CgDarkMode style={{color: theme ? 'black' : 'white' ,fontSize:'1.6rem'}}/>
            </motion.div>
        </div>
    )
}