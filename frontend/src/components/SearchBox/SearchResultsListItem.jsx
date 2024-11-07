import './SearchResultsListItem.css'
import {useMap} from "react-leaflet";

function SearchResultsListItem({result, resetSearchResults}) {
    const map = useMap()

    function handleClick() {
        map.flyTo([result.lat, result.lon], 15);
        resetSearchResults();
    }

    return (
        <div className="result-item" onClick={handleClick}>
            {result.display_name}
        </div>
    );
}

export default SearchResultsListItem;