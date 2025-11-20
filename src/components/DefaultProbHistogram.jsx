import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DefaultProbHistogram = ({ stats }) => {
    if (!stats) return null;

    const data = {
        labels: stats.default_probability_histogram.bins,
        datasets: [
            {
                label: "Clients by default probability",
                data: stats.default_probability_histogram.counts,
                backgroundColor: "#ffd055"
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
                Default Probability Histogram
            </h4>
            <Bar data={data} options={options} />
        </div>
    );
};

export default DefaultProbHistogram;
