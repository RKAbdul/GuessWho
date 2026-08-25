import React from "react";
import { useNavigate } from "react-router-dom";
import "./rooms.css";
import "./home.css";
import changelog from "../data/changelog";

export default function Changelog() {
    const navigate = useNavigate();

    return (
        <div className="room-container">
            <div className="room-header">
                <h1 className="room-title">What's New</h1>
                <button className="home-icon-button" onClick={() => navigate('/')} title="Go Home">
                    ⌂
                </button>
            </div>

            <div className="changelog-page-body">
                {changelog.map((release) => (
                    <div key={release.version} className="changelog-release">
                        <div className="changelog-release-header">
                            <span className="changelog-version">v{release.version}</span>
                            <span className="changelog-date">{release.date}</span>
                        </div>

                        {release.sections.map((section) => (
                            <div key={section.title} className="changelog-section">
                                <h3 className="changelog-section-title">
                                    <span className="changelog-section-icon">{section.icon}</span>
                                    {section.title}
                                </h3>
                                <div className="changelog-items">
                                    {section.items.map((item) => (
                                        <div key={item.heading} className="changelog-item">
                                            <p className="changelog-item-heading">{item.heading}</p>
                                            <p className="changelog-item-detail">{item.detail}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
