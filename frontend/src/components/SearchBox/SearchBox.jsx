import {useState} from "react";
import SearchBoxInput from "./SearchBoxInput.jsx";
import classes from "./SearchBox.module.css"
import SearchResultsList from "./SearchResultsList.jsx";

function SearchBox() {

    const [searchResults, setSearchResults] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const resetSearchResults = () => {
        setSearchResults([]);
        setSearchInput("")
    }

    return (
        <div className={classes["search-container"]}>
            <SearchBoxInput searchInput={searchInput} setSearchInput={setSearchInput} setSearchResult={setSearchResults}/>
            <SearchResultsList results={searchResults} resetSearchResults={resetSearchResults}></SearchResultsList>
        </div>
    );
}

export default SearchBox;