import {useState} from "react";
import "./ProfilePanel.css"
import {Link} from "react-router-dom";

function ProfilePanel() {
    const [isVisible, setIsVisible] = useState(false);

    const user = {
        firstname: "Daniel",
        lastname: "Adkjfhasb",
        email: "testuser@gmail.com",
    }

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
            </div>
        </div>
    );
}

export default ProfilePanel;