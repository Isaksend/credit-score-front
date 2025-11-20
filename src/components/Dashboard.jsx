// src/components/DashboardPage.js
import React, { useState, useEffect } from "react";
import StatCards from "./StatCards";
import RiskPieChart from "./RiskPieChart";
import ScoreHistogram from "./ScoreHistogram";
import DefaultProbHistogram from "./DefaultProbHistogram";
import ClientsTable from "./ClientsTable";
import { getPortfolioStatistics, getPortfolioClients } from "../api/portfolioApi";

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const statData = await getPortfolioStatistics();
            setStats(statData.portfolio);
            const clientData = await getPortfolioClients();
            setClients(clientData.clients);
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading) return <div>Загрузка...</div>;

    return (
        <div>
            <h2>Кредитный портфель</h2>
            <StatCards stats={stats} />
            <div style={{display: 'flex', gap: '40px', margin: '20px 0'}}>
                <RiskPieChart stats={stats} />
                <ScoreHistogram stats={stats} />
                <DefaultProbHistogram stats={stats} />
            </div>
            <ClientsTable clients={clients} />
        </div>
    );
};

export default Dashboard;