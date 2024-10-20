import "./mapStyles.css"
import "leaflet/dist/leaflet.css"

import { MapContainer, Marker, Popup } from 'react-leaflet'
import {MapLibreTileLayer} from "../../components/MapLibreTileLayer/MapLibreTileLayer.ts";
import mapStyle from "../../assets/MapStyles/WorldNavigationMap_Esri.json"

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
    return (
        <MapContainer center={[45.384, -75.697]} zoom={5}>

            <MapLibreTileLayer
                // attribution=''
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