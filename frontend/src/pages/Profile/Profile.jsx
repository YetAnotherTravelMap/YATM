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
    const [pins, setPins] = useState([]);

    const toggleSettingsPanel = () => {
        setSettingsVisible(!settingsVisible);
    }

    const { logout, authAxios } = useAuth();

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await authAxios.get('/api/user');
            setUserData(response.data);
        };
        fetchUserData();
    }, [authAxios]);

    const profilePictureSrc = user.profilePicture
        ? `data:image/png;base64,${user.profilePicture}`
        : null;

    const getPins = async () => {
        try {
            const pinsResponse = await authAxios.get(`/api/user/maps/${user.mapIdArray[0]}/pins`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                }
            });
            setPins(pinsResponse.data);
            console.log(pinsResponse.data);
        } catch (error) {
            console.error('Error fetching pins:', error);
        }
    };

    return (
        <div className={classes["profile-page"]}>
            {/* Header Menu */}
            <header className={classes["header-menu"]}>
                <button className={`${classes["menu-button"]} ${classes.button}`} onClick={() => window.location.href = '/'}>Back to Map</button>
                <button className={`${classes["get-pins-button"]} ${classes.button}`} onClick={getPins}>Get pins</button>
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
                        <p>15</p></div>
                </div>
                <div className={classes["stat-container"]}>
                    <img src={countriesVisited} alt="Profile" className={classes.icons}/>
                    <div className={classes["stat-text-container"]}>
                        <h3>Countries Visited</h3>
                        <p>5</p></div>
                </div>
                <div className={classes["stat-container"]}>
                    <img src={pinsCreated} alt="Profile" className={classes.icons}/>
                    <div className={classes["stat-text-container"]}>
                        <h3>Pins Created</h3>
                        <p>20</p></div>
                </div>
            </div>

            {/* Import/Export Section */}
            <div className={classes["import-export-section"]}>
                <div className={classes["export-container"]}>
                    <h3>Export Travel Data</h3>
                    <select>
                        <option value="kml">KML</option>
                        <option value="json">JSON</option>
                        <option value="xml">XML</option>
                    </select>
                    <button className={`${classes["profile-page-button"]} ${classes.button}`}>Export</button>
                </div>
                <div className={classes["import-container"]}>
                    <h3>Import Travel Data</h3>
                    <input type="file" accept=".kml,.json,.xml" />
                    <button className={`${classes["profile-page-button"]} ${classes.button}`}>Import</button>
                </div>
            </div>
            {settingsVisible && (
                <AccountSettings toggleSettingsPanel={toggleSettingsPanel} logout={logout} user={user} />
            )}
        </div>


    );
}