import "./Map.css"
import "leaflet/dist/leaflet.css"

import {MapContainer, Marker, Popup} from 'react-leaflet'
import {MapLibreTileLayer} from "../../components/MapLibreTileLayer/MapLibreTileLayer.ts";
import mapStyle from "../../assets/MapStyles/WorldNavigationMap_Esri_S.json"
import SearchBox from "../../components/SearchBox/SearchBox.jsx";
import Control from "react-leaflet-custom-control";
import ProfilePanel from "../../components/ProfilePanel/ProfilePanel.jsx";
import {useState, useEffect} from "react";
import PinPanel from "../../components/PinPanel/PinPanel.jsx";
import PinPopup from "../../components/PinPopup/PinPopup.jsx";
import PinPanelState from "../../components/PinPanel/PinPanelState.js";
import useAuth from "../../hooks/UseAuth.jsx";
import {Icon} from "leaflet";

export function Map() {

    const [pinPanelState, setPinPanelState] = useState(PinPanelState.INVISIBLE);
    const [pinDetailsToUpdate, setPinDetailsToUpdate] = useState(null);
    const [pins, setPins] = useState([]);
    const {authAxios} = useAuth();

    const fetchUserPins = async () => {
        const userResponse = await authAxios.get('/api/user');
        const pinsResponse = await authAxios.get(`/api/maps/${userResponse.data.mapIdArray[0]}/pins`);
        setPins(pinsResponse.data);
        console.log(pinsResponse.data);
    };

    useEffect(() => {
        fetchUserPins();
    }, [authAxios]);

    function handlePinUpdate(pin) {
        if (pinPanelState === PinPanelState.INVISIBLE || pinPanelState === PinPanelState.PIN_EDIT) {
            setPinDetailsToUpdate(pin)
            setPinPanelState(PinPanelState.PIN_EDIT)
        }
    }

    return (<MapContainer center={[45.384, -75.697]} zoom={5} zoomControl={false} maxBounds={[[-90, -180], [90, 180]]}
                          minZoom={3}
                          maxZoom={19} bounceAtZoomLimits={false} maxBoundsViscosity={1}>
            <Control prepend position='topleft'>
                <SearchBox/>
            </Control>
            <Control prepend position='topright'>
                <ProfilePanel/>
            </Control>
            <Control prepend position={"bottomright"}>
                <PinPanel panelState={pinPanelState} setPanelState={setPinPanelState}
                          pinDetailsToUpdate={pinDetailsToUpdate} notifyPinUpdate={fetchUserPins}/>
            </Control>

            <MapLibreTileLayer
                attribution='Esri, TomTom, Garmin, FAO, NOAA, USGS, &copy; OpenStreetMap contributors, and the GIS User Community'
                url={mapStyle}
            />

            {pins.map(pin => {
                const markerIcon = pin.icon ? new Icon({
                    iconUrl: `data:image/png;base64,${pin.icon.image}`,
                    iconSize: [pin.icon.width, pin.icon.height],
                }) : null;

                return (<Marker key={pin.pinId} position={[pin.latitude, pin.longitude]}  {...(markerIcon && { icon: markerIcon })} >
                    <Popup>
                        <PinPopup pin={pin} canEditPin={pinPanelState !== PinPanelState.PIN_CREATION}
                                  onEditRequest={() => handlePinUpdate(pin)}/>
                    </Popup>
                </Marker>)
            })}

        </MapContainer>)
}