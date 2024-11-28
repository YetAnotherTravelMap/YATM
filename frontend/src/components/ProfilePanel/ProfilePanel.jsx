import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import useAuth from "./../../hooks/UseAuth"
import "./ProfilePanel.css"

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

    const profilePictureSrc = user.profilePicture
        ? `data:image/png;base64,${user.profilePicture}`
        : null;

    const handleLogout = async (event) => {
        event.preventDefault();
        logout();
        navigate("/login");
    };

    return (
        <div className={`profile-panel-container ${isVisible ? "show" : ""}`}>
            {/* Profile initials */}
            <div className={`profile-initials-container ${isVisible ? "show" : ""}`} onClick={() => setIsVisible(true)}>
                {profilePictureSrc ? (
                    <img src={profilePictureSrc} alt="Profile" className="profile-pic"/>
                ) : (
                    <div className="profile-initials">
                        {user.username.at(0).toUpperCase()}
                    </div>
                )}
            </div>


            {/* Conditionally render profile details with transition effect */}
            <div className={`profile-details ${isVisible ? "show" : ""}`}>
                <button className="close-button" onClick={() => setIsVisible(false)}> &times; </button>
                <p className="profile-username">{user.username}</p>
                <p className="profile-email">{user.email}</p>
                <Link to="profile" id="profile-button">Manage Profile</Link>
                <button id="logout-button" onClick={handleLogout}> Logout</button>
            </div>
        </div>
    );
}

export default ProfilePanel;