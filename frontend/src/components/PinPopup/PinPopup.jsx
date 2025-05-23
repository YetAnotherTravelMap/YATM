import classes from "./PipPopup.module.css"
import CategoryTag from "../CategoryTag/CategoryTag.jsx";
import PropTypes from "prop-types";
import {useMap} from "react-leaflet";

function PinPopup({pin, onDeleteRequest, onEditRequest, canEditPin}) {

    const map = useMap();

    function onEditClicked() {
        onEditRequest();
        map.closePopup();
    }

    function onDeleteClicked() {
        onDeleteRequest();
        map.closePopup();
    }

    return (<>
        <h2>{pin.name}</h2>
        <div>{pin.country}</div>
        <br/>

        <h3>Categories: </h3>
        <CategoryTag value={pin.mainCategory}/>
        <div>
            {pin.categories.map(category => (<CategoryTag value={category.name} key={category.id}/>))}
        </div>
        <br/>

        {pin.description && <div>
            <h3>Description: </h3>
            <div>{pin.description}</div>
            <br/>
        </div>}

        <small>Latitude: {pin.latitude.toFixed(6)}, Longitude: {pin.longitude.toFixed(6)}</small>
        <br/>

        {canEditPin && <button className={classes["edit-button"]} onClick={onEditClicked}>Edit</button>}
        {canEditPin && <button className={classes["edit-button"]} onClick={onDeleteClicked}>Delete</button>}
    </>);
}

PinPopup.propTypes = {
    pin: PropTypes.shape({
        pinId: PropTypes.number,
        latitude: PropTypes.number,
        longitude: PropTypes.number,
        mainCategory: PropTypes.string,
        categories: PropTypes.array,
        name: PropTypes.string,
        description: PropTypes.string,
        country: PropTypes.string
    }).isRequired,
    onDeleteRequest: PropTypes.func.isRequired,
    onEditRequest: PropTypes.func.isRequired,
    canEditPin: PropTypes.bool.isRequired,
}

export default PinPopup;