import "./mapStyles.css"
import "leaflet/dist/leaflet.css"

import {MapContainer, Marker, Popup} from 'react-leaflet'
import {MapLibreTileLayer} from "../../components/MapLibreTileLayer/MapLibreTileLayer.ts";
import mapStyle from "../../assets/MapStyles/WorldNavigationMap_Esri_S.json"
import SearchBox from "../../components/SearchBox/SearchBox.jsx";
import Control from "react-leaflet-custom-control";
import ProfilePanel from "../../components/ProfilePanel/ProfilePanel.jsx";
import TemporaryMarker from "../../components/TemporaryMarker/TemporaryMarker.jsx";
import {useState} from "react";
import PinCreationPanel from "../../components/PinCreationPanel/PinCreationPanel.jsx";

let pins = [
    {
        id: 1,
        lat: 45.3832,
        lon: -75.6974,
        description: "Carleton University"
    },
    {
        id: 2,
        lat: 43.6732,
        lon: -79.4249,
        description: "Toronto"
    },
    {
        id: 3,
        lat: 46.1986,
        lon: -63.76745,
        description: "Confederation Bridge"
    },
    {
        id: 4,
        lat: 40.851589,
        lon: 14.2682,
        description: "Naples"
    },
]

export function Map() {
    const [tempMarkerPos, setTempMarkerPos] = useState([44, -77]);
    const [tempMarkerVisible, setTempMarkerVisible] = useState(false);

    // const handleMapClick = (e) => {
    //     console.log("clicked");
    //     const { lat, lng } = e.latlng;
    //     setTempMarkerPos([lat, lng]);
    //     setTempMarkerVisible(true);
    // };
    
    return (
        <MapContainer center={[45.384, -75.697]} zoom={5} zoomControl={false} maxBounds={[[-90, -180], [90, 180]]} minZoom={3}
                      maxZoom={19} bounceAtZoomLimits={false} maxBoundsViscosity={true} >
            <Control prepend position='topleft'>
                <SearchBox/>
            </Control>
            <Control prepend position='topright'>
                <ProfilePanel/>
            </Control>

            <TemporaryMarker pos={tempMarkerPos} setPos={setTempMarkerPos} isVisible={tempMarkerVisible} setIsVisible={setTempMarkerVisible} />

            <Control prepend position={"bottomright"}>
                <PinCreationPanel pos={tempMarkerPos} isVisible={tempMarkerVisible} setIsVisible={setTempMarkerVisible} />
            </Control>
            <MapLibreTileLayer
                attribution='Esri, TomTom, Garmin, FAO, NOAA, USGS, &copy; OpenStreetMap contributors, and the GIS User Community'
                url={mapStyle}
            />

            {pins.map(pin => (
                <Marker key={pin.id} position={[pin.lat, pin.lon]}>
                    <Popup>
                        {pin.description}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}