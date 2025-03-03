import "./Map.css";
import "leaflet/dist/leaflet.css";

import { MapContainer } from "react-leaflet";
import { MapLibreTileLayer } from "../../components/MapLibreTileLayer/MapLibreTileLayer.ts";
import mapStyle from "../../assets/MapStyles/WorldNavigationMap_Esri_S.json";
import SearchBox from "../../components/SearchBox/SearchBox.jsx";
import Control from "react-leaflet-custom-control";
import ProfilePanel from "../../components/ProfilePanel/ProfilePanel.jsx";
import { useState, useEffect } from "react";
import PinPanel from "../../components/PinPanel/PinPanel.jsx";
import PinPanelState from "../../components/PinPanel/PinPanelState.js";
import useAuth from "../../hooks/UseAuth.jsx";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay.jsx";
import PinCluster from "../../components/PinCluster/PinCluster.jsx";

export function Map() {
    const [pinPanelState, setPinPanelState] = useState(PinPanelState.INVISIBLE);
    const [pinDetailsToUpdate, setPinDetailsToUpdate] = useState(null);
    const [pins, setPins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedMainCategories, setSelectedMainCategories] = useState([]);
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false); // State for filter menu toggle
    const { authAxios } = useAuth();

    const mainCategories = ["Favourite", "Been", "Want2Go"];

    const fetchUserPins = async () => {
        setLoading(true);
        const userResponse = await authAxios.get("/api/user");
        const pinsResponse = await authAxios.get(`/api/maps/${userResponse.data.mapIdArray[0]}/pins`);
        const categoriesResponse = await authAxios.get(`/api/maps/${userResponse.data.mapIdArray[0]}/categories`);
        setCategories(categoriesResponse.data);
        setPins(pinsResponse.data);
        setLoading(false);
    };

    const handleMainCategoryChange = (category) => {
        setSelectedMainCategories((prev) =>
            prev.includes(category)
                ? prev.filter((cat) => cat !== category)
                : [...prev, category]
        );
    };

    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((cat) => cat !== category)
                : [...prev, category]
        );
    };

    const filteredPins = pins.filter((pin) =>
        (selectedMainCategories.length === 0 || selectedMainCategories.includes(pin.mainCategory)) &&
        (selectedCategories.length === 0 || pin.categories.some((cat) => selectedCategories.includes(cat.name)))
    );

    useEffect(() => {
        fetchUserPins();
    }, [authAxios]);

    function handlePinUpdate(pin) {
        if (pinPanelState === PinPanelState.INVISIBLE || pinPanelState === PinPanelState.PIN_EDIT) {
            setPinDetailsToUpdate(pin);
            setPinPanelState(PinPanelState.PIN_EDIT);
        }
    }

    async function handlePinDelete(pin) {
        const userResponse = await authAxios.get("/api/user");
        await authAxios.delete(`/api/maps/${userResponse.data.mapIdArray[0]}/pins/${pin.pinId}`);
        setPins(pins => [...(pins.filter(p => p.pinId !== pin.pinId))])
    }

    return (<>
        {loading && <LoadingOverlay/>}
        <MapContainer
            center={[45.384, -75.697]}
            zoom={5}
            zoomControl={false}
            maxBounds={[
                [-90, -180],
                [90, 180],
            ]}
            minZoom={3}
            maxZoom={19}
            bounceAtZoomLimits={false}
            maxBoundsViscosity={1}
            preferCanvas={true}
        >
            <Control prepend position="topleft">
                <SearchBox />
            </Control>
            <Control prepend position="topright">
                <ProfilePanel />
            </Control>
            <Control prepend position="bottomleft">
                {/* Circular Button for Filter Menu */}
                <button
                    className="filter-button"
                    onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                >
                    &#x2630;
                </button>

                {isFilterMenuOpen && (
                    <div className="category-menu">
                        <h4>Main Categories</h4>
                        {mainCategories.map((category) => (
                            <label key={category} className="category-label">
                                <input
                                    type="checkbox"
                                    value={category}
                                    checked={selectedMainCategories.includes(category)}
                                    onChange={() => handleMainCategoryChange(category)}
                                />
                                {category}
                            </label>
                        ))}

                        {categories.length > 0 && <h4>Subcategories</h4>}
                        {categories.map((category) => (
                            <label key={category.id} className="category-label">
                                <input
                                    type="checkbox"
                                    value={category.name}
                                    checked={selectedCategories.includes(category.name)}
                                    onChange={() => handleCategoryChange(category.name)}
                                />
                                {category.name}
                            </label>
                        ))}
                    </div>
                )}
            </Control>
            <Control prepend position="bottomright">
                <PinPanel
                    panelState={pinPanelState}
                    setPanelState={setPinPanelState}
                    pinDetailsToUpdate={pinDetailsToUpdate}
                    createPin={async (pin) => {
                        setPins(pins => [...pins, pin])
                        const userResponse = await authAxios.get("/api/user");
                        const categoriesResponse = await authAxios.get(`/api/maps/${userResponse.data.mapIdArray[0]}/categories`);
                        setCategories(categoriesResponse.data);
                    }}
                    updatePin={async (pin) => {
                        setPins(pins => [...(pins.filter(p => p.pinId !== pin.pinId)), pin])
                        const userResponse = await authAxios.get("/api/user");
                        const categoriesResponse = await authAxios.get(`/api/maps/${userResponse.data.mapIdArray[0]}/categories`);
                        setCategories(categoriesResponse.data);
                    }}
                />
            </Control>

            <MapLibreTileLayer
                attribution="Esri, TomTom, Garmin, FAO, NOAA, USGS, &copy; OpenStreetMap contributors, and the GIS User Community"
                url={mapStyle}
            />
            <PinCluster pins={filteredPins} canEditPin={pinPanelState !== PinPanelState.PIN_CREATION} handlePinUpdate={handlePinUpdate} handlePinDelete={handlePinDelete} />

        </MapContainer>
    </>);
}