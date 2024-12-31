import classes from "./TemporaryMarker.module.css"
import {Marker, useMapEvents} from "react-leaflet";
import {Icon} from "leaflet";
import tempPinIconImg from '../../assets/PinIcons/TempPin.png';

const tempPinIcon = new Icon({
    iconUrl: tempPinIconImg,
    iconSize: [25, 40],
    iconAnchor: [13, 40],
})

// eslint-disable-next-line react/prop-types
function TemporaryMarker({ pos, setPos, isVisible, setIsVisible }) {

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

export default TemporaryMarker;