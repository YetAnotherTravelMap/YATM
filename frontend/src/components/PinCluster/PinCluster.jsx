import PropTypes from 'prop-types';
import classes from "./PinCluster.module.css"
import {useCallback, useEffect, useState} from 'react'
import useSupercluster from "use-supercluster";
import {Marker, Popup, useMap} from "react-leaflet";
import PinPopup from "../PinPopup/PinPopup.jsx";
import L, {Icon} from "leaflet";

const icons = {};
const upperRange = 300;
const fetchIcon = (count) => {
    if (!icons[count]) {
        let color1, color2, factor;
        const start = {red: 7, green: 175, blue: 32};
        const middle = {red: 200, green: 200, blue: 45};
        const end = {red: 255, green: 65, blue: 65};

        const k = 7;  // Rate control constant
        const percent = 1 - Math.exp(-k * (count / upperRange));
        if(percent <= 0.5){
            color1 = start;
            color2 = middle;
            factor = percent * 2
        }else{
            color1 = middle;
            color2 = end;
            factor = (percent - 0.5) * 2
        }

        const r = color1.red + factor * (color2.red - color1.red);
        const g = color1.green + factor * (color2.green - color1.green);
        const b = color1.blue + factor * (color2.blue - color1.blue);

        console.log("count", count, "percent", percent, "r", r, "g", g, "b", b);
        const w = 30
        const h = 30

        icons[count] = L.divIcon({
            html: `<div class=${classes["cluster-marker"]} style="width: ${w}px; height: ${h}px; background-color: rgb(${r},${g},${b}); box-shadow: 0px 0px 10px rgba(${r},${g},${b});">
                    ${count}
                  </div>`
        });
    }
    return icons[count];
};

function PinCluster({pins, canEditPin, handlePinUpdate, handlePinDelete}) {

    const maxZoom = 19;
    const [bounds, setBounds] = useState(null);
    const [zoom, setZoom] = useState(12);
    const map = useMap();

    function updateMap() {
        const b = map.getBounds();
        setBounds([
            b.getSouthWest().lng,
            b.getSouthWest().lat,
            b.getNorthEast().lng,
            b.getNorthEast().lat
        ]);
        setZoom(map.getZoom());
    }

    const onMove = useCallback(() => {
        updateMap()
    }, [map])

    useEffect(() => {
        updateMap()
    }, [map])

    useEffect(() => {
        map.on("move", onMove)
        return () => {
            map.off("move", onMove);
        }
    }, [map, onMove])

    const pinFeatures = pins.map(pin => ({
        type: "Feature",
        properties: {
            cluster: false,
            pinId: pin.pinId,
            latitude: pin.latitude,
            longitude: pin.longitude,
            mainCategory: pin.mainCategory,
            categories: pin.categories,
            name: pin.name,
            description: pin.description,
            country: pin.country,
            icon: pin.icon,
            canEditPin: canEditPin
        },
        geometry: {
            type: "Point",
            coordinates: [pin.longitude, pin.latitude],
        }
    }))

    const {clusters, supercluster} = useSupercluster({
        points: pinFeatures,
        bounds: bounds,
        zoom: zoom,
        options: {radius: 175, maxZoom: 19}
    });

    return (
        <>
            {clusters.map((cluster) => {
                // every cluster point has coordinates
                const [longitude, latitude] = cluster.geometry.coordinates;
                // the point may be either a cluster or a crime point
                const {cluster: isCluster, point_count: pointCount} = cluster.properties;

                // we have a cluster to render
                if (isCluster) {
                    return (
                        <Marker
                            key={`cluster-${cluster.id}`}
                            position={[latitude, longitude]}
                            icon={fetchIcon(
                                pointCount
                            )}
                            eventHandlers={{
                                click: () => {
                                    const expansionZoom = Math.min(
                                        supercluster.getClusterExpansionZoom(cluster.id),
                                        maxZoom
                                    );
                                    map.setView([latitude, longitude], expansionZoom, {
                                        animate: true,
                                    });
                                },
                            }}
                        />
                    );
                }

                const markerIcon = cluster.properties.icon
                    ? new Icon({
                        iconUrl: `data:image/png;base64,${cluster.properties.icon.image}`,
                        iconSize: [cluster.properties.icon.width, cluster.properties.icon.height],
                    })
                    : null;

                return (
                    <Marker
                        key={cluster.properties.pinId}
                        position={[latitude, longitude]}
                        {...(markerIcon && {icon: markerIcon})}
                    >
                        <Popup>
                            <PinPopup
                                pin={cluster.properties}
                                canEditPin={cluster.properties.canEditPin}
                                onEditRequest={() => handlePinUpdate(cluster.properties)}
                                onDeleteRequest={() => handlePinDelete(cluster.properties)}
                            />
                        </Popup>
                    </Marker>
                );


            })}
        </>
    );

}

PinCluster.propTypes = {
    pins: PropTypes.arrayOf(PropTypes.shape({
        pinId: PropTypes.number,
        latitude: PropTypes.number,
        longitude: PropTypes.number,
        mainCategory: PropTypes.string,
        categories: PropTypes.array,
        name: PropTypes.string,
        description: PropTypes.string,
        country: PropTypes.string
    })).isRequired,
    canEditPin: PropTypes.bool.isRequired,
    handlePinUpdate: PropTypes.func.isRequired,
    handlePinDelete: PropTypes.func.isRequired,
};

export default PinCluster;