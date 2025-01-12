import classes from "./CategoryTag.module.css"
import PropTypes from "prop-types";

function CategoryTag({ value, onClose, onClick }) {

    return (
        <div className={classes["selected-option"]} onClick={onClick}>
            {value}
            {onClose &&
            <span
                className={classes["selected-option-close-btn"]}
                onClick={onClose}
            >
                &times;
            </span>
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