// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from "react";
import StatCards from "../components/StatCards";
import RiskPieChart from "../components/RiskPieChart";
import ScoreHistogram from "../components/ScoreHistogram";
import DefaultProbHistogram from "../components/DefaultProbHistogram";
import ClientsTable from "../components/ClientsTable";
import { getPortfolioStatistics, getPortfolioClients } from "../api/portfolioApi";

const DashboardPage = () => {
    const [stats, setStats] = useState(null);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    // Загрузка данных при отображении страницы
    useEffect(() => {
        async function fetchData() {
            try {
                const statData = await getPortfolioStatistics();
                setStats(statData.portfolio);
                const clientData = await getPortfolioClients();
                setClients(clientData.clients);
            } catch (error) {
                console.error("Ошибка при загрузке данных Dashboard:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) return <div>Загрузка данных...</div>;

    return (
        <div style={{
            boxSizing: "border-box",
            padding: "4vw 2vw",
            margin: "0 auto",
            background: "#212224"
        }}>
            <h2 style={{
                boxSizing: "border-box",
                padding: "4vw 0",
                margin: "0 auto",
                background: "#212224"
            }}>Dashboard: Кредитный портфель</h2>

            <StatCards stats={stats}/>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '40px',
                justifyContent: 'space-around',
                margin: "0"
            }}>
                <RiskPieChart stats={stats}/>
                <ScoreHistogram stats={stats}/>
                <DefaultProbHistogram stats={stats}/>
            </div>

            <ClientsTable clients={clients}/>
            <style>{`
              @media (max-width: 900px) {
                h2 { font-size: 20px; }
                div { padding: 3vw 1vw !important; }
              }
              @media (max-width: 600px) {
                .stat-card { min-width: 0 !important; }
                div { gap: 2vw !important; margin: 2vw 0 !important; }
                h2 { font-size: 16px !important; }
              }
            `}</style>
        </div>
    );
};

export default DashboardPage;
