import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import useAuth from "./../../hooks/UseAuth"
import "./ProfilePanel.css"

function ProfilePanel() {
    const [isVisible, setIsVisible] = useState(false);
    const [user, setUserData] = useState({firstname: "Unknown", lastname: "User", email: "-"});

    const { logout, authAxios } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await authAxios.get('/api/user');
            setUserData(response.data); // Store the JSON data
        };
        fetchUserData();
    }, []);

    const handleLogout = async (event) => {
        event.preventDefault();
        logout();
        navigate("/login");
    };

    return (
        <div className={`profile-panel-container ${isVisible ? "show" : ""}`}>
            {/* Profile initials */}
            <div className={`profile-initials ${isVisible ? "show" : ""}`} onClick={() => setIsVisible(true)}>
                {user.firstname.at(0).toUpperCase()}
                {user.lastname.at(0).toUpperCase()}
            </div>

            {/* Conditionally render profile details with transition effect */}
            <div className={`profile-details ${isVisible ? "show" : ""}`}>
                <button className="close-button" onClick={() => setIsVisible(false)}> &times; </button>
                <p className="profile-username">{user.firstname} {user.lastname}</p>
                <p className="profile-email">{user.email}</p>
                <Link to="profile" id="profile-button">Manage Profile</Link>
                <button id="logout-button" onClick={handleLogout}> Logout </button>
            </div>
        </div>
    );
}

export default ProfilePanel;