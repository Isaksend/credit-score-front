// src/pages/ProfilePage.jsx
import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

const mockProfile = {
    name: "Islam K.",
    email: "MLfinance@corp.kz",
    occupation: "Student / ML developer",
    status: "Active",
    joined: "2025-07-15"
};

export default function ProfilePage() {
    const [profile] = useState(mockProfile);
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/login");
    };
    return (
        <div style={{
            maxWidth: 460,
            margin: "100px auto 0",
            padding: "30px 32px 26px",
            background: "#232325",
            borderRadius: 16,
            boxShadow: "0 2px 24px #0002",
            color: "#e6e6ee"
        }}>
            <div style={{
                display: "flex", alignItems: "center", marginBottom: 28
            }}>
                <div style={{
                    width: 68, height: 68, borderRadius: "50%", background: "#232a3a",
                    display: "flex", alignItems: "center", justifyContent: "center", marginRight: 24,
                    fontSize: 34, fontWeight: 700, color: "#45ca7b"
                }}>
                    {profile.name.split(' ').map(w=>w[0]).join('')}
                </div>
                <div>
                    <div style={{ fontSize: 22, fontWeight: 600 }}>{profile.name}</div>
                    <div style={{ color: "#92f2e3", marginTop: 2, fontSize: 15 }}>{profile.email}</div>
                    <div style={{
                        marginTop: 3, fontSize: "13.5px", color: "#a8bee8", fontWeight: 470
                    }}>
                        {profile.occupation}
                    </div>
                </div>
            </div>

            <div style={{
                borderTop: "1px solid #363844", paddingTop: 15, marginBottom: 10
            }}>
                <div style={{display: "flex", marginBottom: 6}}>
                    <span style={{width: 108, color: "#aaa"}}>Status:</span>
                    <span style={{
                        color: profile.status === "Active" ? "#45ca7b" : "#ffd055", fontWeight: 500
                    }}>{profile.status}</span>
                </div>
                <div style={{display: "flex", marginBottom: 6}}>
                    <span style={{width: 108, color: "#aaa"}}>Joined:</span>
                    <span>{profile.joined}</span>
                </div>
            </div>

            <div style={{
                marginTop: 26,
                padding: 18,
                background: "#18191c",
                borderRadius: 11,
                color: "#d7faf1"
            }}>
                <div style={{fontWeight: 500, fontSize: 16, marginBottom: 7}}>
                    Your Bio
                </div>
                <div>
                    Welcome to your dashboard!
                    <br/>
                    Here you can manage your account, track model activity, set preferences and much more.
                </div>
            </div>

            <button
                onClick={handleLogout}
                style={{
                    marginTop: 22, width: "100%", padding: "13px 0", borderRadius: 10,
                    background: "#ff4466", color: "#fff", border: "none",
                    fontSize: "17px", fontWeight: "bold", cursor: "pointer",
                    transition: "0.17s"
                }}>
                Logout
            </button>
        </div>
    );
}

