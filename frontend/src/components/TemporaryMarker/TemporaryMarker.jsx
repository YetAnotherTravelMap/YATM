import "./TemporaryMarker.css"
import {Marker, useMapEvents} from "react-leaflet";

// eslint-disable-next-line react/prop-types
function TemporaryMarker({ pos, setPos, isVisible, setIsVisible }) {

    const map = useMapEvents({
        click(e) {
            console.log("clicked");
            const { lat, lng } = e.latlng;
            setPos([lat, lng]);
            setIsVisible(true);
            map.setView([lat, lng]);
        },
    });

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