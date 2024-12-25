import {useEffect, useState} from "react";
import classes from "./MultiSelect.module.css"

// eslint-disable-next-line react/prop-types
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
                {/* eslint-disable-next-line react/prop-types */}
                {selectedOptions.map(option => (<div key={option} className={classes["selected-option"]}>
                        {option}
                        <span
                            className={classes["selected-option-close-btn"]}
                            onClick={() => removeOption(option)}
                        >
                        &times;
                    </span>
                    </div>))}
                {!isInputVisible && (
                    <div className={classes["selected-option"]} onClick={() => setIsInputVisible(true)}> + </div>)}
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

export default MultiSelect;