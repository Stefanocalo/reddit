import React, {useState, useEffect} from "react";
import './NavBar.css';
//Redux imports
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../../store/redditSlice";
//Router imports
import { useNavigate } from "react-router-dom";

export function SearchBar({setIsMenuOpen}) {
    //Input state
    const [input, setInput] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();


    function handleSubmit(e) {
        e.preventDefault();
        dispatch(setSearchTerm(input));
        setIsMenuOpen(false);
        navigate('/search');
    };

    const isLightMode = useSelector(state => state.reddit.isLightMode);

    return(
        <form

        className="formSection"
        onSubmit={(e) => handleSubmit(e)}
        >
            <input
            className="searchInput"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            />
            <button
            className='searchButton'
            onClick={(e) => handleSubmit(e)}
            >
                Search
            </button>
        </form>        
    )
}