import classes from "./CategoryTag.module.css"

// eslint-disable-next-line react/prop-types
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

export default CategoryTag;