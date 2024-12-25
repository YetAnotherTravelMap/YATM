import {Link,} from "react-router-dom";
import classes from "./PinCreationPanel.module.css"
import {useEffect, useState} from "react";
import { MultiSelect } from "react-multi-select-component";
import useAuth from "../../hooks/UseAuth.jsx";


// eslint-disable-next-line react/prop-types
function PinCreationPanel({ pos, isVisible, setIsVisible }) {

    const [mainCategory, setMainCategory] = useState("been");
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [locationName, setLocationName] = useState("");
    const [description, setDescription] = useState("");
    const { authAxios } = useAuth();

    const subCategories = [
        { label: "SubCategory1", value: "1" },
        { label: "SubCategory2", value: "2" },
        { label: "SubCategory3", value: "3" },
        { label: "SubCategory4", value: "4" },
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

            <h3>{locationName}</h3>

            <label htmlFor="mainCategory">Main Category:</label>
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

            <label htmlFor="subCategory">Subcategory:</label>
            <MultiSelect
                id="subCategory"
                options={subCategories}
                value={selectedSubCategories}
                onChange={setSelectedSubCategories}
                labelledBy="Select subcategory"
                isCreatable={true}
            />

            <label htmlFor="description">Description:</label>
            <textarea
                id={classes["description"]}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a short description here..."
            />

            <button id={classes["create-pin-button"]} onClick={handleCreatePin}> Create Pin</button>
            <button id={classes["cancel-pin"]} onClick={handleCreatePin}> Cancel</button>

        </div>
    );
}

export default PinCreationPanel;