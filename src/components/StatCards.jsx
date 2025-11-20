// src/components/StatCards.js
import React from "react";

const StatCards = ({ stats }) => {
    if (!stats) return null;
    return (
        <div style={{display: 'flex', gap: 20, margin: '20px 0'}}>
            <div className="stat-card">
                <h3>Средний скор</h3>
                <p>{stats.avg_score ?? "-"}</p>
            </div>
            <div className="stat-card">
                <h3>Средний риск дефолта</h3>
                <p>{stats.avg_default_prob ?? "-"}</p>
            </div>
            <div className="stat-card">
                <h3>Клиентов</h3>
                <p>{stats.count ?? "-"}</p>
            </div>
        </div>
    );
};

export default StatCards;
