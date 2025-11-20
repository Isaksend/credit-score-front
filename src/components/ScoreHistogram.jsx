import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ScoreHistogram = ({ stats }) => {
    if (!stats) return null;

    const data = {
        labels: stats.score_histogram.bins,
        datasets: [
            {
                label: "Clients per score range",
                data: stats.score_histogram.counts,
                backgroundColor: "#60d6ff"
            }
        ]
    };

    const options = {
        scales: {
            x: {
                ticks: { color: "#fff" },
                grid: { color: "#444" }
            },
            y: {
                beginAtZero: true,
                ticks: { color: "#fff" },
                grid: { color: "#444" }
            }
        },
        plugins: {
            legend: {
                labels: { color: "#fff" }
            }
        }
    };

    return (
        <div style={{ width: 360, background: "#232324", borderRadius: 12, padding: 14 }}>
            <h4 style={{ textAlign: "center", color: "#fff", marginBottom: 8 }}>
                Credit Score Histogram
            </h4>
            <Bar data={data} options={options} />
        </div>
    );
};

export default ScoreHistogram;
