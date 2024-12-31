import classes from './SearchResultsList.module.css'
import SearchResultsListItem from "./SearchResultsListItem.jsx";
import PropTypes from "prop-types";

function SearchResultsList({results, resetSearchResults}) {
    return (
        <div className={classes["result-list"]}>
            {results.map((result) => (
                <SearchResultsListItem key={result.place_id} result={result} resetSearchResults={resetSearchResults}/>
            ))}
        </div>
    );
}

SearchResultsList.propTypes = {
    results: PropTypes.arrayOf(PropTypes.shape({
        place_id: PropTypes.number.isRequired,
    })).isRequired,
    resetSearchResults: PropTypes.func.isRequired,
}

export default SearchResultsList;