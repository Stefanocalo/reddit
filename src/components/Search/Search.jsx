import React, {useEffect, useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import './Search.css';
import { getSearchResults } from "../../api/api";

export function Search() {

    //Component internal status
    const [status, setStatus] = useState({
        isLoading: false,
        isSuccess: false
    });
    //Get searchTerm from global state
    const searchQuery = useSelector(state => state.reddit.searchTerm);
    //Declare state variable to store search resutls
    const [results, setResults] = useState(null);

    const dispatch = useDispatch();
    useEffect(() => {
        try {
            setStatus({
                isLoading: true,
                isSuccess: false
            });
            const searchResults = getSearchResults(searchQuery);
            searchResults.then(resultList => setResults(resultList));
        } catch (error) {
            console.log(error);
            //Navigate to error page.
        }
    },[searchQuery])

    return(
        <div className="searchWrapper">
            <h1>{searchQuery}</h1>
            {}
        </div>
    )
}