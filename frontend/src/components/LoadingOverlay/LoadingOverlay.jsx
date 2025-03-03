import classes from "./LoadingOverlay.module.css"

function LoadingOverlay() {
    return (
        <div className={classes["loading-overlay"]}>
            <div className={classes.loader}></div>
            {/*<div className={classes["loading-text"]}>Loading</div>*/}
        </div>
    );
}

LoadingOverlay.propTypes = {};

export default LoadingOverlay;