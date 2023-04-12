import React, {useState, useEffect} from "react";
import './NavBar.css';
//Redux imports
import { useDispatch } from "react-redux";
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
        setInput('');
        setIsMenuOpen(false);
        navigate('/search');
    };

    return(
        <form
        style={{backgroundColor: 'rgba(240, 240, 240, 0.9',display: 'flex', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}}
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