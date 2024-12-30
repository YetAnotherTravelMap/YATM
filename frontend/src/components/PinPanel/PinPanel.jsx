import classes from "./PinPanel.module.css"
import {useEffect, useState} from "react";
import MultiSelect from "../MultiSelect/MultiSelect.jsx";
import useAuth from "../../hooks/UseAuth.jsx";
import TemporaryMarker from "../TemporaryMarker/TemporaryMarker.jsx";
import PinPanelState from "./PinPanelState.js";
import {useMapEvents} from "react-leaflet";


function PinPanel({panelState, setPanelState, pinDetailsToUpdate}) {

    const isInPinUpdateState = panelState === PinPanelState.PIN_EDIT
    const isInPinCreationState = panelState === PinPanelState.PIN_CREATION && !!pinDetailsToUpdate
    const isInvisible = panelState === PinPanelState.INVISIBLE

    const [tempMarkerPos, setTempMarkerPos] = useState(isInPinUpdateState ? [pinDetailsToUpdate.latitude, pinDetailsToUpdate.longitude] : [44, -77]);
    const [isTempMarkerVisible, setIsTempMarkerVisible] = useState(isInPinCreationState);

    const [mainCategory, setMainCategory] = useState(isInPinUpdateState ? pinDetailsToUpdate.mainCategory : "been");
    const [selectedSubCategories, setSelectedSubCategories] = useState(isInPinUpdateState ? pinDetailsToUpdate.categories : []);
    const [locationName, setLocationName] = useState(isInPinUpdateState ? pinDetailsToUpdate.name : "");
    const [description, setDescription] = useState(isInPinUpdateState ? pinDetailsToUpdate.description : "");
    const {authAxios} = useAuth();

    const subCategories = [
        "SubCategory1",
        "SubCategory2",
        "SubCategory3",
        "SubCategory4",
    ];

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

    useEffect(() => {
        if(panelState === PinPanelState.INVISIBLE) {
            return;
        }
        const isInPinUpdateState = panelState === PinPanelState.PIN_EDIT

        setMainCategory(isInPinUpdateState ? pinDetailsToUpdate.mainCategory : "been");
        setSelectedSubCategories(isInPinUpdateState ? pinDetailsToUpdate.categories : []);
        setLocationName(isInPinUpdateState ? pinDetailsToUpdate.name : "");
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
            setLocationName(response.data[0].name || response.data[0].address.neighbourhood || response.data[0].address.road)
            console.log(response.data);
        };
        fetchPinLocationName();
    }, [tempMarkerPos, authAxios]);


    async function handleCreatePin() {
        const pin = {
            locationName,
            tempMarkerPos,
            mainCategory,
            selectedSubCategories,
            description
        };
        console.log(pin)
        resetPanel()
        await authAxios.post("/api/pin", pin);
    }

    function resetPanel() {
        setIsTempMarkerVisible(false)
        setLocationName("")
        setMainCategory("been");
        setSelectedSubCategories([]);
        setDescription("")
        setPanelState(PinPanelState.INVISIBLE)
    }

    return (
        <div>
            <TemporaryMarker pos={tempMarkerPos} setPos={setTempMarkerPos} isVisible={isTempMarkerVisible} setIsVisible={setIsTempMarkerVisible}/>
            {!isInvisible &&
                <div className={`${classes["pin-creation-panel-container"]} ${!isInvisible ? classes.show : ""}`}>

                    <h3 className={classes["pin-creation-panel-header"]}>{isInPinCreationState ? "Create New" : "Update"} Pin:</h3>

                    <label htmlFor="pinName" className={classes["pin-creation-panel-label"]}>Pin Name:</label>
                    <input type="text" id="pinName" className={classes["pin-creation-panel-pin-name"]} name="pinName"
                           value={locationName} onChange={e => setLocationName(e.target.value)}/>

                    <label htmlFor="mainCategory" className={classes["pin-creation-panel-label"]}>Main Category:</label>
                    <select
                        name="mainCategory"
                        id={classes["mainCategory"]}
                        value={mainCategory}
                        onChange={(e) => setMainCategory(e.target.value)}
                    >
                        <option value="been">Been</option>
                        <option value="favourite">Favourite</option>
                        <option value="want2go">Want2Go</option>
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

                    <button id={classes["create-pin-button"]} onClick={handleCreatePin}> {isInPinCreationState ? "Create" : "Update"} Pin</button>
                    <button id={classes["cancel-pin"]} onClick={resetPanel}> Cancel</button>

                </div>
            }
        </div>
    );
}

export default PinPanel;
