import React from "react";
import { Pie } from "react-chartjs-2";

// Не забудь! Для Chart.js v3+ надо зарегистрировать чарты:
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const RiskPieChart = ({ stats }) => {
    if (!stats) return null;

    const data = {
        labels: ["Low", "Medium", "High"],
        datasets: [
            {
                data: [
                    stats.risk_distribution.Low,
                    stats.risk_distribution.Medium,
                    stats.risk_distribution.High
                ],
                backgroundColor: ["#45ca7b", "#ffd055", "#ff4466"]
            }
        ]
    };

    const options = {
        plugins: {
            legend: {
                position: "bottom",
                labels: { color: "#fff" }
            }
        }
    };

    return (
        <div style={{ width: 290, background: "#232324", borderRadius: 12, padding: 8 }}>
            <h4 style={{ textAlign: "center", color: "#fff", marginBottom: 8 }}>
                Risk Distribution
            </h4>
            <Pie data={data} options={options} />
        </div>
    );
};

export default RiskPieChart;
