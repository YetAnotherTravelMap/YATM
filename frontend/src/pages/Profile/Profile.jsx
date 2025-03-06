import {useEffect, useState} from "react";
import { PieChart } from "react-minimal-pie-chart";
import classes from './Profile.module.css';
import countriesVisited from '../../assets/countriesVisited.png';
import pinsCreated from '../../assets/pinsCreated.png';
import cogIcon from '../../assets/cogWheel.png';
import AccountSettings from '../../components/AccountSettings/AccountSettings.jsx';


import useAuth from "./../../hooks/UseAuth"
import ImportPanel from "../../components/ImportPanel/ImportPanel.jsx";

export function Profile(){
    const [user, setUserData] = useState({username: "-", email: "-"});
    const [settingsVisible, setSettingsVisible] = useState(false);
    const [stats, setStats] = useState([]);
    const [exportFormat, setExportFormat] = useState("json");
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [otherTooltipVisible, setOtherTooltipVisible] = useState(false);

    const handleMouseOver = (dataIndex) => {
        setHoveredIndex(dataIndex);

        if (stats.at(2)[dataIndex]?.title === "other") {
            setOtherTooltipVisible(true);
        }
    };

    const handleMouseOut = () => {
        setHoveredIndex(null);
    };

    const closeOtherTooltip = () => {
        setOtherTooltipVisible(false);
    };

    const toggleSettingsPanel = () => {
        setSettingsVisible(!settingsVisible);
    }

    const { logout, authAxios } = useAuth();

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

    useEffect(() => {
        fetchUserData();
    }, [authAxios]);

    const profilePictureSrc = user.profilePicture
        ? `data:image/png;base64,${user.profilePicture}`
        : null;

    async function handleExport() {
        const userResponse = await authAxios.get("/api/user");
        const exportResult = await authAxios.get(`/api/export/${userResponse.data.mapIdArray[0]}/${exportFormat}`);

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
                    <div className={classes["stat-text-container"]}>
                        <h3>Country pin distribution</h3>
                        <div className={classes["chart-container"]}>
                            <PieChart
                                data={stats.at(2)}
                                label={({ dataEntry }) => dataEntry.title}
                                labelPosition={80}
                                labelStyle={{
                                    fontSize: "10px",
                                    fontFamily: "Arial, sans-serif",
                                    fontWeight: "bold",
                                    fill: "#eee",
                                    textShadow: "1px 1px 2px rgba(0,0,0,1)"
                                }}
                                onMouseOver={(_, dataIndex) => handleMouseOver(dataIndex)}
                                onMouseOut={handleMouseOut}
                            />
                            {hoveredIndex !== null && stats.at(2)[hoveredIndex]?.title !== "other" && (
                                <div
                                    className={classes["tooltip"]}
                                    dangerouslySetInnerHTML={{ __html: stats.at(2)[hoveredIndex].countryName.replace(/\n/g, "<br>") }}
                                />
                            )}

                            {otherTooltipVisible && (
                                <div className={classes["tooltip-other"]}>
                                    <button onClick={closeOtherTooltip} className={classes["close-button"]}>✖</button>
                                    <div dangerouslySetInnerHTML={{ __html: stats.at(2).find(entry => entry.title === "other")?.countryName.replace(/\n/g, "<br>") }} />
                                </div>
                            )}
                        </div>
                    </div>
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
                <ImportPanel updateStats={fetchUserData}/>
            </div>
            {settingsVisible && (
                <AccountSettings toggleSettingsPanel={toggleSettingsPanel} logout={logout} user={user} />
            )}
        </div>


    );
}