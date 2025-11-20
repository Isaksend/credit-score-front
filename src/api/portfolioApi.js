// src/api/portfolioApi.js
export async function getPortfolioStatistics() {
    const res = await fetch("http://3.238.108.97:8000/portfolio/statistics");
    return await res.json();
}

export async function getPortfolioClients() {
    const res = await fetch("http://3.238.108.97:8000/portfolio/clients");
    return await res.json();
}
