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

function SearchBoxInput({setSearchResult}) {

    const [input, setInput] = useState("");
    const debouncedInput = useDebouncedValue(input, 500);

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
            value={input}
            onChange={(e) => setInput(e.target.value)}
        />);
}

export default SearchBoxInput;