// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import MenuNav from "./components/MenuNav";
import CreditFormPage from "./pages/CreditFormPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import KanbanClientsPage from "./pages/KanpanClientsPage.jsx";

// Вынеси логику отображения меню на уровень выше
function AppLayout() {
    const location = useLocation();
    const hiddenMenuRoutes = ["/login"];
    const isMenuVisible = !hiddenMenuRoutes.includes(location.pathname);

    return (
        <>
            {isMenuVisible && <MenuNav />}
            <div style={{minHeight:"80vh", background:"#191920"}}>
                <Routes>
                    <Route path="/kanban" element={<KanbanClientsPage />} />
                    <Route path="/form" element={<CreditFormPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </div>
        </>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AppLayout />
        </BrowserRouter>
    );
}
