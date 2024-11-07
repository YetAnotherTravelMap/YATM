import {useEffect, useState} from "react";
import axios from 'axios';
import "./SearchBoxInput.css"

const useDebouncedValue = (inputValue, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(inputValue);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(inputValue);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue, delay]);

    return debouncedValue;
};

function SearchBoxInput({searchInput, setSearchInput, setSearchResult}) {

    const debouncedInput = useDebouncedValue(searchInput, 500);

    useEffect(() => {
        if (debouncedInput) {
            axios.get('/api/geocoding', {
                params: {
                    q: debouncedInput
                }
            })
                .then(function (response) {
                    setSearchResult(response.data);
                })
        } else {
            setSearchResult([]);
        }
    }, [debouncedInput]);

    return (<input
            className="search-input"
            placeholder="Type to search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
        />);
}

export default SearchBoxInput;