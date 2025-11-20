// src/components/MenuNav.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
    { to: "/kanban", label: "Kanban" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/form", label: "Form" },
    { to: "/profile", label: "Profile" },
];

export default function MenuNav() {
    return (
        <nav style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",         // пункты у правого края
            alignItems: "center",
            gap: "22px",
            background: "#232325",
            padding: "18px 34px 18px 0",        // padding слева можно уменьшить
            boxShadow: "0 2px 9px #0003",
            zIndex: 100
        }}>
            {navItems.map(item => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    style={({ isActive }) => ({
                        fontSize: "17px", fontWeight: 500,
                        color: isActive ? "#45ca7b" : "#bbb",
                        textDecoration: "none",
                        padding: "8px 18px",
                        borderRadius: "8px",
                        background: isActive ? "#292b2f" : "none",
                        transition: "0.15s"
                    })}
                >
                    {item.label}
                </NavLink>
            ))}
        </nav>
    );
}
