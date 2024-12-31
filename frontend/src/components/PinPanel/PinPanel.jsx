import classes from "./PinPanel.module.css"
import {useEffect, useState} from "react";
import MultiSelect from "../MultiSelect/MultiSelect.jsx";
import useAuth from "../../hooks/UseAuth.jsx";
import TemporaryMarker from "../TemporaryMarker/TemporaryMarker.jsx";
import PinPanelState from "./PinPanelState.js";
import {useMapEvents} from "react-leaflet";
import PropTypes from "prop-types";


function PinPanel({panelState, setPanelState, pinDetailsToUpdate, notifyPinUpdate}) {

    const isInPinUpdateState = panelState === PinPanelState.PIN_EDIT && !!pinDetailsToUpdate
    const isInPinCreationState = panelState === PinPanelState.PIN_CREATION
    const isInvisible = panelState === PinPanelState.INVISIBLE

    const [tempMarkerPos, setTempMarkerPos] = useState(isInPinUpdateState ? [pinDetailsToUpdate.latitude, pinDetailsToUpdate.longitude] : [44, -77]);
    const [isTempMarkerVisible, setIsTempMarkerVisible] = useState(isInPinCreationState);

    const [mainCategory, setMainCategory] = useState(isInPinUpdateState ? pinDetailsToUpdate.mainCategory : "Been");
    const [selectedSubCategories, setSelectedSubCategories] = useState(isInPinUpdateState ? pinDetailsToUpdate.categories.map(c => c.name) : []);
    const [name, setName] = useState(isInPinUpdateState ? pinDetailsToUpdate.name : "");
    const [description, setDescription] = useState(isInPinUpdateState ? pinDetailsToUpdate.description : "");

    const [subCategories, setSubCategories] = useState([]);
    const {authAxios} = useAuth();


    const map = useMapEvents({
        click(e) {
            if(panelState === PinPanelState.INVISIBLE ) {
                const { lat, lng } = e.latlng;
                setTempMarkerPos([lat, lng]);
                setIsTempMarkerVisible(true);
                setPanelState(PinPanelState.PIN_CREATION)
                map.setView([lat, lng]);
            }else{
                resetPanel()
            }
        },
    });

    const fetchCategories = async () => {
        const userResponse = await authAxios.get('/api/user');
        const categoriesResponse = await authAxios.get(`/api/maps/${userResponse.data.mapIdArray[0]}/categories`);
        setSubCategories(categoriesResponse.data.map(category => category.name));
        console.log(categoriesResponse.data);
    };

    useEffect(() => {
        fetchCategories();
    }, [authAxios]);

    useEffect(() => {
        if(panelState === PinPanelState.INVISIBLE) {
            return;
        }
        const isInPinUpdateState = panelState === PinPanelState.PIN_EDIT

        setMainCategory(isInPinUpdateState ? pinDetailsToUpdate.mainCategory : "Been");
        setSelectedSubCategories(isInPinUpdateState ? pinDetailsToUpdate.categories.map(c => c.name) : []);
        setName(isInPinUpdateState ? pinDetailsToUpdate.name : "");
        setDescription(isInPinUpdateState ? pinDetailsToUpdate.description : "");
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
            setName(response.data[0].name || response.data[0].address.neighbourhood || response.data[0].address.road)
            console.log(response.data);
        };
        fetchPinLocationName();
    }, [tempMarkerPos, authAxios]);


    async function handleSubmit() {
        if(panelState === PinPanelState.PIN_CREATION) {
            await handlePinCreation();
        }else if (panelState === PinPanelState.PIN_EDIT) {
            await handlePinUpdate();
        }
        notifyPinUpdate()
        fetchCategories()
    }

    async function handlePinCreation() {
        const pin = {
            name,
            latitude: tempMarkerPos[0],
            longitude: tempMarkerPos[1],
            mainCategory,
            subCategories: selectedSubCategories,
            description
        };
        console.log(pin)
        const userResponse = await authAxios.get('/api/user');
        await authAxios.post(`/api/maps/${userResponse.data.mapIdArray[0]}/pins`, pin);
        resetPanel()
    }

    async function handlePinUpdate() {
        const pin = {
            id: pinDetailsToUpdate.pinId,
            name,
            mainCategory,
            subCategories: selectedSubCategories,
            description
        };
        console.log(pin)
        const userResponse = await authAxios.get('/api/user');
        await authAxios.put(`/api/maps/${userResponse.data.mapIdArray[0]}/pins`, pin);
        resetPanel()
    }

    function resetPanel() {
        setIsTempMarkerVisible(false)
        setName("")
        setMainCategory("been");
        setSelectedSubCategories([]);
        setDescription("")
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
                        allOptions={subCategories}
                        selectedOptions={selectedSubCategories}
                        setSelectedOptions={setSelectedSubCategories}
                        optionTypeName="Sub-category"
                    />

                    <label htmlFor="description" className={classes["pin-creation-panel-label"]}>Description:</label>
                    <textarea
                        id="description"
                        className={classes["pin-creation-panel-description"]}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter a short description here..."
                    />

                    <button id={classes["create-pin-button"]} onClick={handleSubmit}> {isInPinCreationState ? "Create" : "Update"} Pin</button>
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
    }),
    notifyPinUpdate: PropTypes.func.isRequired
}

export default PinPanel;
