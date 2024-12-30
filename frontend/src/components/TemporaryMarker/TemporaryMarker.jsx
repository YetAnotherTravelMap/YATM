import classes from "./TemporaryMarker.module.css"
import {Marker, useMapEvents} from "react-leaflet";

// eslint-disable-next-line react/prop-types
function TemporaryMarker({ pos, setPos, isVisible, setIsVisible }) {

    return (
        isVisible &&
        <Marker
            position={pos}
            draggable
            autoPan
            eventHandlers={{
                moveend: (event) => {
                    setPos([event.target.getLatLng().lat, event.target.getLatLng().lng]);
                }
            }}
        />
    );
}

export default TemporaryMarker;