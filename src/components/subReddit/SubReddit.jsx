import React, {useState, useEffect} from "react";
import './SubReddit.css'
import { useSelector, useDispatch } from "react-redux";
import { fetchSubReddits } from "../../store/subRedditSlice";
//Framer motion imports
import { motion, animate, stagger } from "framer-motion";
import { setSelectedSubreddit } from "../../store/redditSlice";
//Spring imports
import { animated, useSpring } from "react-spring"; 

export function SubReddit({isMenuOpen, setIsMenuOpen}) {

    //Fetch subReddits
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchSubReddits());
    },[]);
    const subreddits = useSelector(state => state.subreddit.subreddits);

    //Redux Slector
    const loading = useSelector(state => state.subreddit.isLoading);
    const error = useSelector(state => state.subreddit.error);
    const isLightMode = useSelector(state =>  state.reddit.isLightMode);
    const selectedSubReddit = useSelector(state => state.reddit.selectedSubReddits);

    function clickHandler(url) {
        dispatch(setSelectedSubreddit(url));
        setIsMenuOpen(false);
    };
    
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        if(windowWidth < 600) {
            setIsMenuOpen(false);
        } else {
            setIsMenuOpen(true);
        }
    },[windowWidth])

    useEffect(() => {
        const handleWindowResize = () => {
        setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
        window.removeEventListener('resize', handleWindowResize);
        };
    });
   
    //Side menu animation
    const slide = useSpring({
        right: isMenuOpen ? '0%' : !isMenuOpen && window.innerWidth < 600 ? '-100%' : '0%'
    })

    return(
        <animated.div 
        style={slide}
        className="subRedditContainer">
            <div style={{backgroundColor: isLightMode ? 'white' : 'black', borderColor: isLightMode ? 'lightgrey' : 'rgb(180,180,180)'}} className="subRedditWrapper">
                <ul>
                {subreddits && subreddits.map((subreddit, index) => (
                    <motion.li
                    key={subreddit.id}
                    initial={{opacity: 0,scale: 0, filter: 'blur(0.2rem)'}}
                    whileInView={{opacity: 1,scale: 1, filter: 'blur(0)'}}
                    className='subList' >
                        <button type="button"
                        onClick={() =>{clickHandler(subreddit.url)}} 
                        className={`${selectedSubReddit === subreddit.url ? 'selectedSubreddit' : 'notSelectedSubreddut'}`}>
                            <img 
                            src={subreddit.icon_img || `https://api.adorable.io/avatars/25/${subreddit.display_name}`}
                            className="subredditIcon"
                            style={{ border: `2px solid ${subreddit.primary_color}` }}
                            alt={subreddit.display_name} />
                            <span style={{marginLeft: '1rem', color: isLightMode ? 'black' : "white"}}>{subreddit.display_name}</span>
                        </button>
                    </motion.li>
                ))}
                </ul>
            </div>
        </animated.div>
    )
}