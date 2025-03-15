import classes from "./PinPanel.module.css"
import {useEffect, useState} from "react";
import MultiSelect from "../MultiSelect/MultiSelect.jsx";
import useAuth from "../../hooks/UseAuth.jsx";
import TemporaryMarker from "../TemporaryMarker/TemporaryMarker.jsx";
import PinPanelState from "./PinPanelState.js";
import {useMapEvents} from "react-leaflet";
import PropTypes from "prop-types";
import IconSelector from "../IconSelector/IconSelector.jsx";


function PinPanel({panelState, setPanelState, pinDetailsToUpdate, createPin, updatePin, subCategories}) {

    const isInPinUpdateState = panelState === PinPanelState.PIN_EDIT && !!pinDetailsToUpdate
    const isInPinCreationState = panelState === PinPanelState.PIN_CREATION
    const isInvisible = panelState === PinPanelState.INVISIBLE

    const [tempMarkerPos, setTempMarkerPos] = useState(isInPinUpdateState ? [pinDetailsToUpdate.latitude, pinDetailsToUpdate.longitude] : [null]);
    const [isTempMarkerVisible, setIsTempMarkerVisible] = useState(isInPinCreationState);
    const [country, setCountry] = useState(isInPinUpdateState ? pinDetailsToUpdate.country : null);
    const [countryCode, setCountryCode] = useState(isInPinUpdateState ? pinDetailsToUpdate.countryCode : null);

    const mainCategoryName = !isInPinUpdateState || !["Been", "Favourite", "Want2Go"].includes(pinDetailsToUpdate.mainCategory) ? "Been" : pinDetailsToUpdate.mainCategory;
    const [mainCategory, setMainCategory] = useState(mainCategoryName);
    const [selectedSubCategories, setSelectedSubCategories] = useState(isInPinUpdateState ? pinDetailsToUpdate.categories.map(c => c.name) : []);
    const [name, setName] = useState(isInPinUpdateState ? pinDetailsToUpdate.name : "Default");
    const [description, setDescription] = useState(isInPinUpdateState ? pinDetailsToUpdate.description : "");


    const [icons, setIcons] = useState([]);
    const [icon, setIcon] = useState(isInPinUpdateState ? pinDetailsToUpdate.icon : icons[0]);
    const {authAxios} = useAuth();


    const map = useMapEvents({
        click(e) {
            if(panelState === PinPanelState.INVISIBLE ) {
                const { lat, lng } = e.latlng;
                setTempMarkerPos([lat, lng]);
                setIsTempMarkerVisible(true);
                setPanelState(PinPanelState.PIN_CREATION)

                // Move the map so that the temporary pin is in the center-top of the viewport
                const bounds = map.getBounds();
                const latSpan = bounds.getNorth() - bounds.getSouth();
                const adjustedLat = lat - (latSpan  * 0.25) ;
                map.setView([adjustedLat, lng]);
            }else{
                resetPanel()
            }
        },
    });

    const fetchIcons = async () => {
        const userResponse = await authAxios.get('/api/user');
        const iconsResponse = await authAxios.get(`/api/maps/${userResponse.data.mapIdArray[0]}/icons`);
        setIcons(iconsResponse.data);
    };

    useEffect(() => {
        fetchIcons();
    }, [authAxios]);

    useEffect(() => {
        if(panelState === PinPanelState.INVISIBLE) {
            return;
        }
        const isInPinUpdateState = panelState === PinPanelState.PIN_EDIT

        const mainCategoryName = !isInPinUpdateState || !["Been", "Favourite", "Want2Go"].includes(pinDetailsToUpdate.mainCategory) ? "Been" : pinDetailsToUpdate.mainCategory;
        setMainCategory(mainCategoryName);
        setSelectedSubCategories(isInPinUpdateState ? pinDetailsToUpdate.categories.map(c => c.name) : []);
        setName(isInPinUpdateState ? pinDetailsToUpdate.name : "Default");
        setDescription(isInPinUpdateState ? pinDetailsToUpdate.description : "");
        setIcon(isInPinUpdateState ? pinDetailsToUpdate.icon : icons[0]);
    }, [panelState, authAxios, pinDetailsToUpdate]);

    useEffect(() => {
        const fetchPinLocationName = async () => {
            const [lat, lon] = tempMarkerPos;
            const response = await authAxios.get('/api/reverseGeocoding', {
                params: {
                    lat: lat,
                    lon: lon,
                }
            });
            setName(response.data[0].name || response.data[0].address.neighbourhood || response.data[0].address.road || response.data[0].address.country)
            setCountry(response.data[0].address.country)
            setCountryCode(response.data[0].address.country_code)
        };
        fetchPinLocationName();
    }, [tempMarkerPos, authAxios]);


    async function handleSubmit() {
        if(panelState === PinPanelState.PIN_CREATION) {
            await handlePinCreation();
        }else if (panelState === PinPanelState.PIN_EDIT) {
            await handlePinUpdate();
        }
        fetchIcons()
    }


    async function handlePinCreation() {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("latitude", tempMarkerPos[0])
        formData.append("longitude", tempMarkerPos[1])
        formData.append("country", country)
        formData.append("countryCode", countryCode)
        formData.append("mainCategory", mainCategory)
        formData.append("subCategories", selectedSubCategories);
        formData.append("description", description);
        formData.append("iconId", icon.id);
        formData.append("iconName", icon.iconName);
        formData.append("iconWidth", icon.width);
        formData.append("iconHeight", icon.height);
        if(icon.id < 0){
            formData.append("iconImage", icon.image);
        }

        const userResponse = await authAxios.get('/api/user');
        const createdPin = await authAxios.post(`/api/maps/${userResponse.data.mapIdArray[0]}/pins`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        createPin(createdPin.data);
        resetPanel()
    }

    async function handlePinUpdate() {
        const formData = new FormData();
        formData.append("id", pinDetailsToUpdate.pinId);
        formData.append("name", name);
        formData.append("mainCategory", mainCategory)
        formData.append("subCategories", selectedSubCategories);
        formData.append("description", description);
        formData.append("iconId", icon.id);
        formData.append("iconName", icon.iconName);
        formData.append("iconWidth", icon.width);
        formData.append("iconHeight", icon.height);
        if(icon.id < 0){
            formData.append("iconImage", icon.image);
        }

        const userResponse = await authAxios.get('/api/user');
        const updatedPin = await authAxios.put(`/api/maps/${userResponse.data.mapIdArray[0]}/pins`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        updatePin(updatedPin.data);
        resetPanel()
    }

    function resetPanel() {
        setIsTempMarkerVisible(false)
        setName("")
        setMainCategory("Been");
        setSelectedSubCategories([]);
        setDescription("")
        setIcon(icons[0])
        setPanelState(PinPanelState.INVISIBLE)
    }

    return (
        <div>
            <TemporaryMarker pos={tempMarkerPos} setPos={setTempMarkerPos} isVisible={isTempMarkerVisible}/>
            {!isInvisible &&
                <div className={`${classes["pin-creation-panel-container"]} ${!isInvisible ? classes.show : ""}`}>

                    <h3 className={classes["pin-creation-panel-header"]}>{isInPinCreationState ? "Create New" : "Update"} Pin:</h3>

                    <label htmlFor="pinName" className={classes["pin-creation-panel-label"]}>Pin Name:</label>
                    <input type="text" id="pinName" className={classes["pin-creation-panel-pin-name"]} name="pinName"
                           value={name} onChange={e => setName(e.target.value)}/>

                    <label htmlFor="mainCategory" className={classes["pin-creation-panel-label"]}>Main Category:</label>
                    <select
                        name="mainCategory"
                        id={classes["mainCategory"]}
                        value={mainCategory}
                        onChange={(e) => setMainCategory(e.target.value)}
                    >
                        <option value="Been">Been</option>
                        <option value="Favourite">Favourite</option>
                        <option value="Want2Go">Want2Go</option>
                    </select>

                    <label htmlFor="subCategory" className={classes["pin-creation-panel-label"]}>Subcategory:</label>
                    <MultiSelect
                        allOptions={subCategories.map(c => c.name)}
                        selectedOptions={selectedSubCategories}
                        setSelectedOptions={setSelectedSubCategories}
                        optionTypeName="Sub-category"
                    />

                    <label className={classes["pin-creation-panel-label"]}>Icon:</label>
                    <IconSelector icon={icon} setIcon={setIcon} icons={icons}/>

                    <label htmlFor="description" className={classes["pin-creation-panel-label"]}>Description:</label>
                    <textarea
                        id="description"
                        className={classes["pin-creation-panel-description"]}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter a short description here..."
                    />

                    <button id={classes["create-pin-button"]}
                            onClick={handleSubmit}
                            disabled={(name === null || name === "")}>
                        {isInPinCreationState ? "Create" : "Update"} Pin
                    </button>
                    <button id={classes["cancel-pin"]} onClick={resetPanel}> Cancel</button>

                </div>
            }
        </div>
    );
}

PinPanel.propTypes = {
    panelState: PropTypes.number.isRequired,
    setPanelState: PropTypes.func.isRequired,
    pinDetailsToUpdate: PropTypes.shape({
        pinId: PropTypes.number,
        latitude: PropTypes.number,
        longitude: PropTypes.number,
        mainCategory: PropTypes.string,
        categories: PropTypes.array,
        name: PropTypes.string,
        description: PropTypes.string,
        country: PropTypes.string,
        countryCode: PropTypes.string,
        icon: PropTypes.any
    }),
    subCategories: PropTypes.array,
    createPin: PropTypes.func.isRequired,
    updatePin: PropTypes.func.isRequired
}

export default PinPanel;
