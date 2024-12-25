import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import useAuth from "./../../hooks/UseAuth"
import classes from "./ProfilePanel.module.css"

function ProfilePanel() {
    const [isVisible, setIsVisible] = useState(false);
    const [user, setUserData] = useState({username: "-", email: "-"});

    const { logout, authAxios } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await authAxios.get('/api/user');
            setUserData(response.data);
        };
        fetchUserData();
    }, [authAxios]);

    const handleLogout = async (event) => {
        event.preventDefault();
        logout();
        navigate("/login");
    };

    return (
        <div className={`${classes['profile-panel-container']} ${isVisible ? classes.show : ""}`}>
            {/* Profile initials */}
            <div className={`${classes["profile-initials"]} ${isVisible ? classes.show : ""}`} onClick={() => setIsVisible(true)}>
                {user.username.at(0).toUpperCase()}
            </div>

            {/* Conditionally render profile details with transition effect */}
            <div className={`${classes["profile-details"]} ${isVisible ? classes.show : ""}`}>
                <button className={classes["close-button"]} onClick={() => setIsVisible(false)}> &times; </button>
                <p className={classes["profile-username"]}>{user.username}</p>
                <p className={classes["profile-email"]}>{user.email}</p>
                <Link to="profile" id={classes["profile-button"]}>Manage Profile</Link>
                <button id={classes["logout-button"]} onClick={handleLogout}> Logout </button>
            </div>
        </div>
    );
}

export default ProfilePanel;