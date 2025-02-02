import PropTypes from 'prop-types';
import classes from "./Spinner.module.css"

function Spinner({}) {
    return (
        <div className={classes.spinner}></div>
    );
}

Spinner.propTypes = {};

export default Spinner;