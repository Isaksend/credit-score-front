// src/components/ClientsTable.js
import React, { useState } from "react";
import ClientDetailModal from "./ClientDetailModal";

// Цветовая маркировка
function getRiskColor(risk) {
    if (risk === "Low") return "#45ca7b";
    if (risk === "Medium") return "#ffd055";
    if (risk === "High") return "#ff4466";
    return "#aaa";
}
function getDecisionColor(decision) {
    if (decision === "APPROVE") return "#45ca7b";
    if (decision === "REVIEW") return "#ffd055";
    if (decision === "REJECT") return "#ff4466";
    return "#aaa";
}

const tableHeader = [
    "client_id",
    "credit_score",
    "default_probability",
    "risk_level",
    "decision",
    "timestamp",
    "детали"
];

const ClientsTable = ({ clients }) => {
    const [selected, setSelected] = useState(null);
    const [query, setQuery] = useState("");

    // Фильтрация по client_id или кредитному скору
    const filtered = clients.filter(client =>
        (client.client_id && client.client_id.toString().includes(query)) ||
        (client.result?.credit_score && String(client.result.credit_score).includes(query))
    );

    return (
        <div style={{marginTop: 50, width: "100%"}}>
            <h4>Список клиентов</h4>
            <input
                type="text"
                value={query}
                placeholder="Поиск по ID или скору"
                onChange={e => setQuery(e.target.value)}
                style={{
                    marginBottom: 12,
                    padding: "6px 12px",
                    border: "1px solid #ccc",
                    borderRadius: 6,
                    fontSize: 15
                }}
            />
            {filtered.length === 0 ? (
                <p>Нет клиентов, удовлетворяющих запросу</p>
            ) : (
                <table style={{
                    borderCollapse:"collapse", width:"100%", background:"#222",
                    color:"#fff", fontSize:16, boxShadow:"0 1px 8px #2224"
                }}>
                    <thead>
                    <tr>
                        {tableHeader.map(col => (
                            <th key={col} style={{
                                padding:"8px 12px",
                                background:"#25282e",
                                borderBottom:"2px solid #333"
                            }}>{col}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {filtered.map((client, idx) => (
                        <tr key={idx} style={{
                            background: idx % 2 ? "#23272c" : "#282c34"
                        }}>
                            <td style={{textAlign: "center"}}>{client.client_id}</td>
                            <td style={{fontWeight:"bold", textAlign: "center"}}>{client.result?.credit_score}</td>
                            <td style={{textAlign: "center"}}>{client.result?.default_probability}</td>
                            <td style={{
                                color: getRiskColor(client.result?.risk_level),
                                fontWeight:"bold",
                                textAlign: "center"
                            }}>
                                {client.result?.risk_level}
                            </td>
                            <td style={{
                                color: getDecisionColor(client.result?.decision),
                                fontWeight:"bold",
                                textAlign: "center"
                            }}>
                                {client.result?.decision}
                            </td>
                            <td style={{
                                fontSize:15,
                                textAlign: "center"}}>
                                {client.timestamp}
                            </td>
                            <td>
                                <button
                                    onClick={() => setSelected(client)}
                                    style={{
                                        padding:"5px 10px", borderRadius:5, border:"none",
                                        background:"#6cc0e5", color:"#fff", cursor:"pointer", textAlign: "center"
                                    }}
                                >
                                    Детали
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            {/* Модальное окно деталей клиента */}
            <ClientDetailModal client={selected} onClose={() => setSelected(null)} />
        </div>
    );
};

export default ClientsTable;
