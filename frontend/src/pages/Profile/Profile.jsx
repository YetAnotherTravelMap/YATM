import React from 'react';
import './Profile.css';
import catImage from './cat.jpg';
import citiesTravelled from './citiesTravelled.png';
import countriesVisited from './countriesVisited.png';
import pinsCreated from './pinsCreated.png';
import cogIcon from './cogWheel.png';

export function Profile(){
    return (
        <div className="profile-page">
            {/* Header Menu */}
            <header className="header-menu">
                <button className="menu-button" onClick={() => window.location.href = '/'}>Back to Map</button>
            </header>
            {/* Top Section */}
            <div className="top-section">
                <div className="profile-info">
                    <img src={catImage} alt="Profile" className="profile-pic" />
                    <div className="user-details">
                        <h2>Username</h2>
                        <p>user@example.com</p>
                    </div>
                </div>
                <button className="settings-button">
                    <img src={cogIcon} alt="cog" className="cog-icon"/>Account Settings
                </button>
            </div>

            {/* Stats section */}
            <div className="stats-section">
                <div className="stat-container">
                    <img src={citiesTravelled} alt="Profile" className="icons"/>
                    <div className="stat-text-container">
                        <h3>Cities Visited</h3>
                        <p>15</p></div>
                </div>
                <div className="stat-container">
                    <img src={countriesVisited} alt="Profile" className="icons"/>
                    <div className="stat-text-container">
                        <h3>Countries Visited</h3>
                        <p>5</p></div>
                </div>
                <div className="stat-container">
                    <img src={pinsCreated} alt="Profile" className="icons"/>
                    <div className="stat-text-container">
                        <h3>Pins Created</h3>
                        <p>20</p></div>
                </div>
            </div>

            {/* Import/Export Section */}
            <div className="import-export-section">
                <div className="export-container">
                    <h3>Export Travel Data</h3>
                    <select>
                        <option value="kml">KML</option>
                        <option value="json">JSON</option>
                        <option value="xml">XML</option>
                    </select>
                    <button>Export</button>
                </div>
                <div className="import-container">
                    <h3>Import Travel Data</h3>
                    <input type="file" accept=".kml,.json,.xml" />
                    <button>Import</button>
                </div>
            </div>
        </div>
    );
}