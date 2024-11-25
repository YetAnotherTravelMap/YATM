import {Link,} from "react-router-dom";
import "./PinCreationPanel.css"

// eslint-disable-next-line react/prop-types
function PinCreationPanel({ pos, isVisible, setIsVisible }) {

    return (
        isVisible &&
        <div className={`pin-creation-panel-container ${isVisible ? "show" : ""}`}>
            <h1>Test</h1>
            {/* Profile initials */}
            {/*<div className={`profile-initials ${isVisible ? "show" : ""}`} onClick={() => setIsVisible(true)}>*/}
            {/*    {user.username.at(0).toUpperCase()}*/}
            {/*</div>*/}

            {/*/!* Conditionally render profile details with transition effect *!/*/}
            {/*<div className={`profile-details ${isVisible ? "show" : ""}`}>*/}
            {/*    <button className="close-button" onClick={() => setIsVisible(false)}> &times; </button>*/}
            {/*    <p className="profile-username">{user.username}</p>*/}
            {/*    <p className="profile-email">{user.email}</p>*/}
            {/*    <Link to="profile" id="profile-button">Manage Profile</Link>*/}
            {/*    <button id="logout-button" onClick={handleLogout}> Logout </button>*/}
            {/*</div>*/}
        </div>
    );
}

export default PinCreationPanel;