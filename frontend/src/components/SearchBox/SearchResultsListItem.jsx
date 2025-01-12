import {useMap} from "react-leaflet";
import L from "leaflet";
import classes from './SearchResultsListItem.module.css'
import PropTypes from "prop-types";

function SearchResultsListItem({result, resetSearchResults}) {
    const map = useMap()

    function handleClick() {
        const box = L.latLngBounds(
            [parseFloat(result.boundingbox[0]), parseFloat(result.boundingbox[2])], // Southwest corner
            [parseFloat(result.boundingbox[1]), parseFloat(result.boundingbox[3])]  // Northeast corner
        );
        map.flyToBounds(box, {maxzoom: 16});
        resetSearchResults();
    }

    return (
        <button className={classes["result-item"]} onClick={handleClick}>
            {result.display_name}
        </button>
    );
}

SearchResultsListItem.propTypes = {
    result: PropTypes.shape({
        display_name: PropTypes.string.isRequired,
        boundingbox: PropTypes.arrayOf(PropTypes.string).isRequired,

    }).isRequired,
    resetSearchResults: PropTypes.func.isRequired,
}

export default SearchResultsListItem;