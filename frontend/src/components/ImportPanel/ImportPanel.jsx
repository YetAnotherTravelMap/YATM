import classes from "./ImportPanel.module.css"
import PropTypes from "prop-types";
import {useEffect, useRef, useState} from "react";
import useAuth from "./../../hooks/UseAuth.jsx"
import Spinner from "../Spinner/Spinner.jsx";

function ImportPanel({updateStats}) {

    const {authAxios} = useAuth();
    const fileInputRef = useRef(null);
    const [importFile, setImportFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [importedMainCategoryCount, setImportedMainCategoryCount] = useState(0);
    const [categoryMappings, setCategoryMappings] = useState({});
    const [importedMainCategoryMapping, setImportedMainCategoryMapping] = useState("Been");
    const importSection = useRef(null)

    const fetchCategories = async () => {
        const userResponse = await authAxios.get("/api/user");
        const response = await authAxios.get(`/api/maps/${userResponse.data.mapIdArray[0]}/categories`);
        setCategories(response.data);
        console.log(categories);
    };

    useEffect(() => {
        fetchCategories();
    }, [authAxios]);

    function resetImport() {
        setImportFile(null);
        setLoading(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setImportedMainCategoryCount(0)
        setCategoryMappings({})
        setError(null)
    }

    async function handleImport() {
        try {
            if (!importFile) {
                setError("Import file is missing!");
                resetImport()
                return;
            }

            const subcategoryMappingsFromUser = Object.fromEntries(
                Object.entries(categoryMappings).map(([key, value]) => [key, value.mappedCategoryName])
            );

            const hasEmptyValues = Object.values(subcategoryMappingsFromUser).some(value => value === "");
            if (hasEmptyValues) {
                setError("Missing mapping for a subcategory!");
                return;
            }

            setLoading(true);
            const formData = new FormData();
            formData.append('file', importFile);
            formData.append('subcategoryMappings', JSON.stringify(subcategoryMappingsFromUser))
            formData.append('importedMainCategoryMapping', importedMainCategoryMapping)
            const userResponse = await authAxios.get("/api/user");
            if (userResponse.status !== 200) {
                return setError("An error occurred while connecting to the server!");
            }
            const importResponse = await authAxios.post(`/api/import/${userResponse.data.mapIdArray[0]}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });

            if (importResponse.status !== 200) {
                return setError("An error occurred while processing your file!");
            }
            updateStats();
            resetImport();
        }
        // eslint-disable-next-line no-unused-vars
        catch (error) {
            resetImport()
            setError("A server error occurred while processing your file!");
        }
    }

    async function handleFileSelection(file) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const fileCategoryInfoResponse = await authAxios.post("/api/import/getImportFileCategoryInfo", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });

            if (fileCategoryInfoResponse.status !== 200) {
                return setError("An error occurred while processing your file!");
            }
            setImportFile(file);

            const categoryCounts = Object.fromEntries(
                Object.entries(fileCategoryInfoResponse.data.categoryCounts)
                    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
                    .map(([key, value]) => [key, {
                        count: value,
                        mappedCategoryName: key,
                        isNewCategory: false,
                    }])
            );
            setImportedMainCategoryCount(fileCategoryInfoResponse.data.importedMainCategoryCount);
            setCategoryMappings(categoryCounts);

            setTimeout(function () {
                importSection.current.scrollIntoView({behavior: "smooth"});
            }, 10);
        }
        // eslint-disable-next-line no-unused-vars
        catch (error) {
            resetImport();
            setError("A server error occurred while processing your file!");
        }
    }

    function handleMappingSelection(category, mappedCategoryName, isNewCategory) {
        if (categoryMappings[category]) {
            setCategoryMappings(prevCategories => ({
                ...prevCategories,
                [category]: {
                    ...prevCategories[category],
                    mappedCategoryName: mappedCategoryName,
                    isNewCategory: isNewCategory,
                },
            }))
        }
    }

    return (<div className={classes["import-container"]}>
        <h3 ref={importSection} className={classes.header}>Import Travel Data</h3>

        {error && !importFile && <div className={classes["error-message"]}>{error}</div>}
        {!importFile &&
            <input type="file" accept=".kml,.json,.xml"
                   onChange={(e) => handleFileSelection(e.target.files[0])}/>
        }

        { importedMainCategoryCount > 0 &&
            <div className={classes["main-category-mapping-container"]}>
                <p className={classes["category-mapping-instructions"]}>Assign a main category for pins without a valid
                    main category:</p>
                {error && <div className={classes["error-message"]}>{error}</div>}
                <div className={classes["main-category-mapping-row"]}>
                    <div className={classes["category-count"]}>{importedMainCategoryCount} x</div>
                    <label className={classes["category-label"]}>Imported</label>
                    <div className={classes["category-mapping-inputs-container"]}>
                        <select onChange={(e) => setImportedMainCategoryMapping(e.target.value)} value={importedMainCategoryMapping}>
                            <option value="Been">Been</option>
                            <option value="Favourite">Favourite</option>
                            <option value="Want2Go">Want2Go</option>
                        </select>
                    </div>
                </div>
            </div>
        }

        {Object.keys(categoryMappings).length > 0 &&
            <div className={classes["category-mapping-container"]}>
                <p className={classes["category-mapping-instructions"]}>Map the subcategories from the imported file to
                    new or existing subcategories:</p>
                {error && <div className={classes["error-message"]}>{error}</div>}
                {Object.keys(categoryMappings).map(category => (
                    <div key={category} className={classes["category-mapping-row"]}>
                        <div className={classes["category-count"]}>{categoryMappings[category].count} x</div>
                        <div className={classes["flex-center-vertically"]}><label className={classes["category-label"]}>{category}</label></div>
                        <div className={classes["category-mapping-inputs-container"]}>
                            <select value={categoryMappings[category].mappedCategoryName} onChange={(e) => handleMappingSelection(category, e.target.value, false)}>
                                <option value="">Create new subcategory</option>
                                <option value={category}>{category}</option>
                                {categories.filter(c => c.name !== category).map(c => (
                                    <option key={c.name} value={c.name}>{c.name}</option>
                                ))}
                            </select>
                            {(categoryMappings[category].mappedCategoryName === "" || categoryMappings[category].isNewCategory) &&
                                <input type="text"
                                       onChange={(e) => handleMappingSelection(category, e.target.value, true)}
                                       placeholder="Enter new subcategory"/>
                            }
                        </div>
                    </div>
                ))}
            </div>
        }

        <div>
        {importFile &&
            <button className={`${classes["profile-page-button"]} ${classes.button}`} onClick={handleImport}
                    disabled={loading}>
                {loading ? <Spinner/> : "Import"}
            </button>
        }
        {importFile && !loading &&
            <button className={`${classes.button} ${classes["cancel-button"]}`} onClick={resetImport}>
                Cancel
            </button>
        }
        </div>
    </div>);
}

ImportPanel.propTypes = {
    updateStats: PropTypes.func.isRequired,
}

export default ImportPanel;