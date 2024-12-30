import "./Map.css"
import "leaflet/dist/leaflet.css"

import {MapContainer, Marker, Popup, useMapEvents} from 'react-leaflet'
import {MapLibreTileLayer} from "../../components/MapLibreTileLayer/MapLibreTileLayer.ts";
import mapStyle from "../../assets/MapStyles/WorldNavigationMap_Esri_S.json"
import SearchBox from "../../components/SearchBox/SearchBox.jsx";
import Control from "react-leaflet-custom-control";
import ProfilePanel from "../../components/ProfilePanel/ProfilePanel.jsx";
import {useState} from "react";
import PinPanel from "../../components/PinPanel/PinPanel.jsx";
import PinPopup from "../../components/PinPopup/PinPopup.jsx";
import PinPanelState from "../../components/PinPanel/PinPanelState.js";

let pins = [
    {
        pinId: 1,
        latitude: 45.3832,
        longitude: -75.6974,
        name: "Carleton University",
        mainCategory: "been",
        categories: ["Carleton", "Cat2", "Cat3"],
        description: "Carleton University Description"
    },
    {
        pinId: 2,
        latitude: 43.6732,
        longitude: -79.4249,
        name: "Toronto",
        mainCategory: "favourite",
        categories: ["Toronto", "Cat2", "Cat3"],
        description: "Toronto Description"
    },
    {
        pinId: 3,
        latitude: 46.1986,
        longitude: -63.76745,
        name: "Confederation Bridge",
        mainCategory: "want2go",
        categories: ["Confederation", "Cat2", "Cat3"],
        description: "Confederation Bridge Description"
    },
    {
        pinId: 4,
        latitude: 40.851589,
        longitude: 14.2682,
        name: "Naples",
        mainCategory: "MainCategory",
        categories: ["Cat1", "Cat2", "Cat3"],
        description: "Naples Description"
    },
]

export function Map() {

    const [pinPanelState, setPinPanelState] = useState(PinPanelState.INVISIBLE);
    const [pinDetailsToUpdate, setPinDetailsToUpdate] = useState(null);

    function handlePinUpdate(pin) {
        if(pinPanelState === PinPanelState.INVISIBLE || pinPanelState === PinPanelState.PIN_EDIT) {
            setPinDetailsToUpdate(pin)
            setPinPanelState(PinPanelState.PIN_EDIT)
        }
    }

    return (
        <MapContainer center={[45.384, -75.697]} zoom={5} zoomControl={false} maxBounds={[[-90, -180], [90, 180]]} minZoom={3}
                      maxZoom={19} bounceAtZoomLimits={false} maxBoundsViscosity={true} >
            <Control prepend position='topleft'>
                <SearchBox/>
            </Control>
            <Control prepend position='topright'>
                <ProfilePanel/>
            </Control>
            <Control prepend position={"bottomright"}>
                <PinPanel panelState={pinPanelState} setPanelState={setPinPanelState} pinDetailsToUpdate={pinDetailsToUpdate} />
            </Control>

            <MapLibreTileLayer
                attribution='Esri, TomTom, Garmin, FAO, NOAA, USGS, &copy; OpenStreetMap contributors, and the GIS User Community'
                url={mapStyle}
            />

            {pins.map(pin => (
                <Marker key={pin.pinId} position={[pin.latitude, pin.longitude]}>
                    <Popup>
                        <PinPopup pin={pin} canEditPin={pinPanelState !== PinPanelState.PIN_CREATION} onEditRequest={() => handlePinUpdate(pin)}/>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}