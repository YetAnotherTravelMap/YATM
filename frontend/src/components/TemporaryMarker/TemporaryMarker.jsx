import {Marker} from "react-leaflet";
import {Icon} from "leaflet";
import tempPinIconImg from '../../assets/PinIcons/TempPin.png';
import PropTypes from "prop-types";
import classes from "./TemporaryMarker.module.css"

const tempPinIcon = new Icon({
    iconUrl: tempPinIconImg,
    iconSize: [25, 40],
    iconAnchor: [13, 40],
})

function TemporaryMarker({ pos, setPos, isVisible }) {

    return (
        isVisible &&
        <Marker
            position={pos}
            draggable
            autoPan
            icon={tempPinIcon}
            eventHandlers={{
                moveend: (event) => {
                    setPos([event.target.getLatLng().lat, event.target.getLatLng().lng]);
                }
            }}
        />
    );
}

TemporaryMarker.propTypes = {
    pos: PropTypes.arrayOf(PropTypes.number).isRequired,
    setPos: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
}

export default TemporaryMarker;