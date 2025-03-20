import PropTypes from 'prop-types';
import classes from "./ExportPanel.module.css"
import {useState} from "react";
import useAuth from "../../hooks/UseAuth.jsx";
import MultiSelect from "../MultiSelect/MultiSelect.jsx";

function ExportPanel({categories}) {
    const {authAxios} = useAuth();
    const [exportFormat, setExportFormat] = useState("json");
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);

    async function handleExport() {
        const userResponse = await authAxios.get("/api/user");
        const exportResult = await authAxios.get(`/api/export/${userResponse.data.mapIdArray[0]}/${exportFormat}`, {
            params: {
                subcategoriesToInclude: selectedSubCategories
            },
            paramsSerializer: params => {
                return new URLSearchParams(params).toString();
            }
        });

        let contentType;
        if (exportFormat === "json") {
            contentType = "application/json";
        } else if (exportFormat === "kml") {
            contentType = "application/vnd.google-earth.kml+xml";
        } else if (exportFormat === "xml") {
            contentType = "application/xml";
        }

        const blob = new Blob([exportFormat === "json" ? JSON.stringify(exportResult.data) : exportResult.data], { type: contentType });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `pins.${exportFormat}`;
        link.click();
    }

    return (
        <div className={classes["export-container"]}>
            <h3 className={classes["center-contents-container"]}>Export Travel Data</h3>

            <label htmlFor="export-format-selector" className={classes["label"]}>Export format:</label>
            <select id="export-format-selector" value={exportFormat}
                    onChange={(e) => setExportFormat(e.target.value)} className={classes.select}>
                <option value="kml">KML</option>
                <option value="json">JSON</option>
                <option value="xml">XML</option>
            </select>

            <label htmlFor="subCategory" className={classes["label"]}>Sub-categories to export:</label>
            <MultiSelect
                allOptions={categories.map(c => c.name)}
                selectedOptions={selectedSubCategories}
                setSelectedOptions={setSelectedSubCategories}
                optionTypeName="sub-category"
                isCreatable={false}
            />
            <div className={classes["center-contents-container"]}>
                <button className={`${classes["profile-page-button"]} ${classes.button}`} onClick={handleExport}>Export</button>
            </div>
        </div>
    );
}

ExportPanel.propTypes = {
    categories: PropTypes.array.isRequired,
};

export default ExportPanel;