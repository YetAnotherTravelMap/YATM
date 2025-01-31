import {useEffect, useState} from "react";
import classes from './Profile.module.css';
import citiesTravelled from '../../assets/citiesTravelled.png';
import countriesVisited from '../../assets/countriesVisited.png';
import pinsCreated from '../../assets/pinsCreated.png';
import cogIcon from '../../assets/cogWheel.png';
import AccountSettings from '../../components/AccountSettings/AccountSettings.jsx';


import useAuth from "./../../hooks/UseAuth"

export function Profile(){
    const [user, setUserData] = useState({username: "-", email: "-"});
    const [settingsVisible, setSettingsVisible] = useState(false);
    const [stats, setStats] = useState([]);
    const [exportFormat, setExportFormat] = useState("json");

    const toggleSettingsPanel = () => {
        setSettingsVisible(!settingsVisible);
    }

    const { logout, authAxios } = useAuth();

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await authAxios.get('/api/user');
            setUserData(response.data);

            await getStats(response.data);
        };

        const getStats = async (userData) => {
            try {
                const statsResponse = await authAxios.post(`/api/stats`, userData);
                console.log(statsResponse.data);
                setStats(statsResponse.data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchUserData();
        getStats();
    }, [authAxios]);

    const profilePictureSrc = user.profilePicture
        ? `data:image/png;base64,${user.profilePicture}`
        : null;

    async function handleExport() {
        const userResponse = await authAxios.get("/api/user");
        const json = await authAxios.get(`/api/export/${userResponse.data.mapIdArray[0]}/json`);

        const blob = new Blob([JSON.stringify(json.data)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'pins.json';
        link.click();
    }

    return (
        <div className={classes["profile-page"]}>
            {/* Header Menu */}
            <header className={classes["header-menu"]}>
                <button className={`${classes["menu-button"]} ${classes.button}`} onClick={() => window.location.href = '/'}>Back to Map</button>
                {/*<button className={`${classes["get-pins-button"]} ${classes.button}`} onClick={getStats}>Get stats</button>*/}
            </header>
            {/* Top Section */}
            <div className={classes["top-section"]}>
            <div className={classes["profile-info"]}>
                {profilePictureSrc ? (
                    <img src={profilePictureSrc} alt="Profile" className={classes["profile-pic"]} />
                ) : (
                    <div className={classes["profile-initials"]}>
                        {user.username.at(0).toUpperCase()}
                    </div>
                )}
                    <div className={classes["user-details"]}>
                        <h2>{user.username}</h2>
                        <p>{user.email}</p>
                    </div>
                </div>
                <button className={`${classes["settings-button"]} ${classes.button}`} onClick={toggleSettingsPanel}>
                    <img src={cogIcon} alt="cog" className={classes["cog-icon"]}/>Account Settings
                </button>
            </div>

            {/* Stats section */}
            <div className={classes["stats-section"]}>
                <div className={classes["stat-container"]}>
                    <img src={citiesTravelled} alt="Profile" className={classes.icons}/>
                    <div className={classes["stat-text-container"]}>
                        <h3>Cities Visited</h3>
                        <p>{stats.at(2)}</p></div>
                </div>
                <div className={classes["stat-container"]}>
                    <img src={countriesVisited} alt="Profile" className={classes.icons}/>
                    <div className={classes["stat-text-container"]}>
                        <h3>Countries Visited</h3>
                        <p>{stats.at(1)}</p></div>
                </div>
                <div className={classes["stat-container"]}>
                    <img src={pinsCreated} alt="Profile" className={classes.icons}/>
                    <div className={classes["stat-text-container"]}>
                        <h3>Pins Created</h3>
                        <p>{stats.at(0)}</p></div>
                </div>
            </div>

            {/* Import/Export Section */}
            <div className={classes["import-export-section"]}>
                <div className={classes["export-container"]}>
                    <h3>Export Travel Data</h3>
                    <select value={exportFormat} onChange={(e) => setExportFormat(e.target.value)}>
                        <option value="kml">KML</option>
                        <option value="json">JSON</option>
                        <option value="xml">XML</option>
                    </select>
                    <button className={`${classes["profile-page-button"]} ${classes.button}`} onClick={handleExport}>Export</button>
                </div>
                <div className={classes["import-container"]}>
                    <h3>Import Travel Data</h3>
                </div>
            </div>
            {settingsVisible && (
                <AccountSettings toggleSettingsPanel={toggleSettingsPanel} logout={logout} user={user} />
            )}
        </div>


    );
}