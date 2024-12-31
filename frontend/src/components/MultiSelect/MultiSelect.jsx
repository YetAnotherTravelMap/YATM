import {useState} from "react";
import CategoryTag from "../CategoryTag/CategoryTag.jsx";
import classes from "./MultiSelect.module.css"
import PropTypes from "prop-types";

function MultiSelect({allOptions, selectedOptions, setSelectedOptions, optionTypeName}) {

    const [inputValue, setInputValue] = useState('');
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    function removeOption(option) {
        setSelectedOptions(prevOptions => prevOptions.filter((o) => o !== option));
    }

    function handleNewInput(newInput) {
        setInputValue(newInput);
        if (newInput === "") {
            setSuggestions([])
        } else {
            setSuggestions(allOptions.filter((option) => option.toLowerCase().includes(newInput.toLowerCase()) && !selectedOptions.includes(option)));
        }
    }

    function selectSuggestion(suggestion) {
        if (suggestion.trim() === "") {
            return
        }
        setInputValue("")
        setSuggestions(prevSuggestions => prevSuggestions.filter(s => s !== suggestion));
        setSelectedOptions(prevOptions => {
            if (!prevOptions.map(s => s.toLowerCase()).includes(suggestion.toLowerCase())) {
                return [...prevOptions, suggestion];
            }
            return prevOptions;
        });
    }

    function closeInputField() {
        setIsInputVisible(false);
        setSuggestions([]);
        setInputValue("")
    }

    return (
        <>
            <div>
                {selectedOptions.map(option => (
                    <CategoryTag key={option} value={option} onClose={() => removeOption(option)}/>
                ))}
                {!isInputVisible && <CategoryTag key="+" value={" + "} onClick={() => setIsInputVisible(true)}/>}
            </div>
            {isInputVisible && (<div className={classes["multi-select-input-container"]}>
                    <input
                        className={classes["multi-select-input"]}
                        type="text"
                        placeholder={`Start typing to select or create ${optionTypeName}...`}
                        onChange={e => handleNewInput(e.target.value)}
                        onKeyUp={e => {
                            if (e.key === "Enter") selectSuggestion(inputValue)
                        }}
                        value={inputValue}
                    />
                    <button className={classes["multi-select-input-cancel-button"]}
                            onClick={() => closeInputField()}>&times;</button>
                </div>)}
            <div className={classes["suggestion-list"]}>
                {suggestions.length > 0 && (suggestions.map(suggestion => (
                        <button key={suggestion} className={classes.suggestion} onClick={() => selectSuggestion(suggestion)}>
                            {suggestion}
                        </button>)))}
                {inputValue.trim() !== "" && !allOptions.map(o => o.toLowerCase()).includes(inputValue.trim().toLowerCase()) && (
                    <button key={inputValue} className={classes.suggestion} onClick={() => selectSuggestion(inputValue)}>
                        {`Create "${inputValue}"`}
                    </button>)}
            </div>
        </>
    );
}

MultiSelect.propTypes = {
    allOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    setSelectedOptions: PropTypes.func.isRequired,
    optionTypeName: PropTypes.string.isRequired,
}

export default MultiSelect;