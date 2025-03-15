import classes from "./CategoryTag.module.css"
import PropTypes from "prop-types";

function CategoryTag({ value, onClose, onClick }) {

    return (
        <div className={classes["selected-option"]} onClick={onClick} style={{ paddingRight: !onClose ? "12px" : "5px" }}>
            <div>{value}</div>
            {onClose &&
                <button className={`${classes["selected-option-close-btn"]} ${classes["icon-button"]}`}
                        onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"
                         className={`${classes["remove-icon"]} ${classes.icon}`}>
                        <path
                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
            }
        </div>
    );
}

CategoryTag.propTypes = {
    value: PropTypes.string.isRequired,
    onClose: PropTypes.func,
    onClick: PropTypes.func,
}

export default CategoryTag;