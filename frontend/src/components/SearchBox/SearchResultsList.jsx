import React from 'react';
import './SearchResultsList.css'
import SearchResultsListItem from "./SearchResultsListItem.jsx";

function SearchResultsList({results, resetSearchResults}) {
    return (
        <div className="result-list">
            {results.map((result) => (
                <SearchResultsListItem key={result.place_id} result={result} resetSearchResults={resetSearchResults}/>
            ))}
        </div>
    );
}

export default SearchResultsList;