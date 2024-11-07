import {useState} from "react";
import SearchBoxInput from "./SearchBoxInput.jsx";
import "./SearchBox.css"
import SearchResultsList from "./SearchResultsList.jsx";

function SearchBox() {

    const [searchResults, setSearchResults] = useState([]);

    const resetSearchResults = () => {
        setSearchResults([]);
    }

    return (
        <div className="search-container">
            <SearchBoxInput setSearchResult={setSearchResults}/>
            <SearchResultsList results={searchResults} resetSearchResults={resetSearchResults}></SearchResultsList>
        </div>
    );
}

export default SearchBox;