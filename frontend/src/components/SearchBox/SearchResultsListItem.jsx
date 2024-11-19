import './SearchResultsListItem.css'
import {useMap} from "react-leaflet";
import L from "leaflet";

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
        <button className="result-item" onClick={handleClick}>
            {result.display_name}
        </button>
    );
}

export default SearchResultsListItem;