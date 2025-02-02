import classes from "./ImportPanel.module.css"
import PropTypes from "prop-types";
import {useRef, useState} from "react";
import useAuth from "./../../hooks/UseAuth.jsx"
import Spinner from "../Spinner/Spinner.jsx";

function ImportPanel({updateStats}) {

    const {authAxios} = useAuth();
    const fileInputRef = useRef(null);
    const [importFile, setImportFile] = useState(null);
    const [loading, setLoading] = useState(false);


    async function handleImport() {
        if (!importFile) return;
        setLoading(true);
        const formData = new FormData();
        formData.append('jsonFile', importFile);
        const userResponse = await authAxios.get("/api/user");
        await authAxios.post(`/api/import/${userResponse.data.mapIdArray[0]}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        updateStats();
        setImportFile(null);
        setLoading(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    return (<div className={classes["import-container"]}>
        <h3>Import Travel Data</h3>
        <input ref={fileInputRef} type="file" accept=".kml,.json,.xml" onChange={(e) => setImportFile(e.target.files[0])}/>
        <button className={`${classes["profile-page-button"]} ${classes.button}`} onClick={handleImport}
                disabled={loading}>
            {loading ? <Spinner/> : "Import"}
        </button>
    </div>);
}

ImportPanel.propTypes = {
    updateStats: PropTypes.func.isRequired,
}

export default ImportPanel;