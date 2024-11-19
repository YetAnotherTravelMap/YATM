import {useEffect, useState} from "react";
import "./SearchBoxInput.css"
import useAuth from "../../hooks/UseAuth.jsx";

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
    const { authAxios } = useAuth();

    useEffect(() => {
        if (debouncedInput) {
            authAxios.get('/api/geocoding', {
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
    }, [authAxios, debouncedInput, setSearchResult]);

    return (<input
            className="search-input"
            placeholder="Type to search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
        />);
}

export default SearchBoxInput;