import React, {useState, useEffect} from "react";
import './NavBar.css';
//Redux imports
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../../store/redditSlice";

export function SearchBar() {
    //Input state
    const [input, setInput] = useState('');

    const dispatch = useDispatch();
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(setSearchTerm(input));
    };

    return(
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
    )
}