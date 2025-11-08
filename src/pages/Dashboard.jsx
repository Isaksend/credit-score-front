import React from "react";
import "./Dashboard.css";
import { Link, useLocation } from "react-router-dom";

export default function Dashboard() {
    return (
        <div className="dashboard-bg">
            <div className="dashboard-header">
                <div>
                    <div className="smart-credit-title">Smart Credit <span
                        className="for-retailers">for Retailers</span></div>
                </div>
                <nav className="dashboard-nav">
                    <Link to="/dashboard"
                          className={location.pathname === "/dashboard" ? "nav-active" : ""}>Dashboard</Link>
                    <Link to="/form" className={location.pathname === "/form" ? "nav-active" : ""}>Credit Form</Link>
                    <Link to="/profile" className={location.pathname === "/profile" ? "nav-active" : ""}>Profile</Link>
                </nav>
            </div>
            <div className="dashboard-content">
                <h1 className="dashboard-title">Dashboard</h1>
                <div className="dashboard-subtitle">Overview of your credit profile and business metrics</div>
                <div className="dashboard-notification">
          <span style={{color: "#1a2a43"}}>
            Your credit score has improved by 12 points this month!
            <span className="dashboard-link"> View details</span>
          </span>
                    <button className="dashboard-btn-small">Notifications</button>
                </div>
                <div className="dashboard-stat-blocks">
                    <div className="stat-card">
                        <div className="stat-title">Credit Score</div>
                        <div className="stat-value">780</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-title">Last Month Revenue</div>
                        <div className="stat-value" style={{ color: "#233377" }}>KZT 1,650,000</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-title">Loan Status</div>
                        <div className="stat-value" style={{ color: "#1a2a43" }}>No active loans</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-title">Next Review</div>
                        <div className="stat-value" style={{ color: "#233377" }}>Nov 15</div>
                    </div>
                </div>
                <div className="dashboard-row">
                    <div className="block-lg">
                        <div className="block-title">Your Credit Score</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                            <div>
                                <div className="score-gauge-main">
                                    <span className="score-gauge-num">780</span>
                                    <div className="score-gauge-risk">Low Risk</div>
                                </div>
                            </div>
                            <div style={{ fontSize: 13, color: "#2e3b4d" }}>
                                <div>Recommended Credit</div>
                                <div style={{ color: "#233377", fontWeight: 600 }}>2.0M KZT</div>
                                <div className="model-confidence">Model Confidence 92%</div>
                                <div style={{ color: "#199659", marginTop: 7 }}>Score change: +12 vs last month</div>
                                <button className="dashboard-link" style={{ marginTop: 7, padding: 0, border: "none", background: "none" }}>View Full Report</button>
                            </div>
                        </div>
                    </div>
                    <div className="block-lg">
                        <div className="block-title">Business Information</div>
                        <div style={{ color: "#2e3b4d", fontSize: 15 }}>
                            <b style={{ color: "#101826" }}>Astana Fresh Market</b><br />
                            Grocery, Food Retail<br />
                            Registration ID: KZ2025123456<br />
                            Astana, Kazakhstan<br />
                            +7 (7172) 555-8008
                            <div style={{ display: "flex", gap: 20, marginTop: 7, fontSize: 13, color: "#233377" }}>
                                <span>7 Employees</span> <span>3 Years Operating</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dashboard-row">
                    <div className="block-md">
                        <div className="block-title">Balance trend</div>
                        <div style={{ height: 120, marginTop: 16, marginBottom: 7 }}>
                            <svg width="100%" height="100%" viewBox="0 0 380 75">
                                <polyline
                                    fill="none"
                                    stroke="#2973eb"
                                    strokeWidth="3"
                                    points="0,70 35,55 70,42 120,38 160,44 200,23 240,27 280,41 320,29 370,18"
                                />
                                <circle cx="370" cy="18" r="4" fill="#2973eb" />
                            </svg>
                        </div>
                        <div className="graph-label">Monthly balance trend over the last 10 months</div>
                    </div>
                    <div className="block-md">
                        <div className="block-title">Top Risk Drivers</div>
                        <ul className="risk-list">
                            <li>High spending on entertainment</li>
                            <li>Low cash reserves</li>
                            <li>High debt-to-income ratio</li>
                            <li>Recent credit inquiries</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
