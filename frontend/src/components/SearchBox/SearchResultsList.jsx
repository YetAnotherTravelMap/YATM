import React from 'react';
import classes from './SearchResultsList.module.css'
import SearchResultsListItem from "./SearchResultsListItem.jsx";

function SearchResultsList({results, resetSearchResults}) {
    return (
        <div className={classes["result-list"]}>
            {results.map((result) => (
                <SearchResultsListItem key={result.place_id} result={result} resetSearchResults={resetSearchResults}/>
            ))}
        </div>
    );
}

export default SearchResultsList;