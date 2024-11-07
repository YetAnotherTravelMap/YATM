import {useEffect, useState} from "react";
import SearchBoxInput from "./SearchBoxInput.jsx";
import "./SearchBox.css"
import SearchResultsList from "./SearchResultsList.jsx";
import axios from "axios";

function SearchBox() {

    const [searchResults, setSearchResults] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const resetSearchResults = () => {
        setSearchResults([]);
        setSearchInput("")
    }

    return (
        <div className="search-container">
            <SearchBoxInput searchInput={searchInput} setSearchInput={setSearchInput} setSearchResult={setSearchResults}/>
            <SearchResultsList results={searchResults} resetSearchResults={resetSearchResults}></SearchResultsList>
        </div>
    );
}

export default SearchBox;