import classes from "./PinCreationPanel.module.css"
import {useEffect, useState} from "react";
import MultiSelect from "../MultiSelect/MultiSelect.jsx";
import useAuth from "../../hooks/UseAuth.jsx";


// eslint-disable-next-line react/prop-types
function PinCreationPanel({ pos, isVisible, setIsVisible }) {

    const [mainCategory, setMainCategory] = useState("been");
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [locationName, setLocationName] = useState("");
    const [description, setDescription] = useState("");
    const { authAxios } = useAuth();

    const subCategories = [
        "SubCategory1",
        "SubCategory2",
        "SubCategory3",
        "SubCategory4",
    ];

    useEffect(() => {
        const fetchPinLocationName = async () => {
            const [lat, lon] = pos;
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
    }, [pos, authAxios]);


    async function handleCreatePin() {
        const pin = {
            locationName,
            pos,
            mainCategory,
            selectedSubCategories,
            description
        };
        console.log(pin)
        resetPanel()
        await authAxios.post("/api/pin", pin);
    }

    function resetPanel() {
        setIsVisible(false)
        setLocationName("")
        setMainCategory("been");
        setSelectedSubCategories([]);
        setDescription("")
    }

    return (
        isVisible &&
        <div className={`${classes["pin-creation-panel-container"]} ${isVisible ? classes.show : ""}`}>

            <h3 className={classes["pin-creation-panel-header"]}>Create New Pin:</h3>

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

            <button id={classes["create-pin-button"]} onClick={handleCreatePin}> Create Pin</button>
            <button id={classes["cancel-pin"]} onClick={resetPanel}> Cancel</button>

        </div>
    );
}

export default PinCreationPanel;
