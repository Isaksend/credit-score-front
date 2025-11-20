// src/components/ClientDetailModal.js
import React from "react";

const Metric = ({label, value, color}) => (
    <div style={{marginBottom: 10, fontSize: 17}}>
        <span style={{color:"#888"}}>{label}: </span>
        <span style={{
            color: color || "#222",
            fontWeight:"bold",
        }}>{value}</span>
    </div>
);

const ClientDetailModal = ({ client, onClose }) => {
    if (!client) return null;

    // Цвета для статусов
    const decisionColor = {
        "APPROVE": "#45ca7b",
        "REJECT": "#ff4466",
        "REVIEW": "#ffd055"
    }[client.result?.decision] || "#222";

    const riskColor = {
        "Low": "#45ca7b",
        "Medium": "#ffd055",
        "High": "#ff4466"
    }[client.result?.risk_level] || "#222";

    // Краткая шапка параметров — только топовые
    const topParams = ["INCOME", "DEBT", "SAVINGS"];
    const keyData = topParams
        .filter(name => client.data[name] !== undefined)
        .map(name => (
            <div key={name} style={{
                fontSize:15,
                marginBottom:7,
                color: "#333",
                letterSpacing: ".03em"
            }}>
                {name}: <b>{client.data[name]}</b>
            </div>
        ));

    return (
        <div style={{
            position: "fixed", zIndex:999, top:0, left:0, width:"100vw", height:"100vh",
            background: "rgba(0,0,0,0.18)", display: "flex", alignItems:"center", justifyContent:"center"
        }}>
            <div style={{
                background:"#fff", padding:"28px 24px", maxWidth:340, width:"100%",
                borderRadius:10, boxShadow:"0 2px 18px #2223", position: "relative"
            }}>
                {/* Крестик */}
                <button
                    onClick={onClose}
                    style={{
                        position:"absolute", top:13, right:15, background: "transparent",
                        border: "none", fontSize:24, color:"#bbb", cursor:"pointer", fontWeight:"bold"
                    }}
                    aria-label="Закрыть"
                >×</button>

                {/* Сверху id и дата */}
                <div style={{
                    color:"#aaa", fontSize:14, marginBottom:4, textAlign:"left"
                }}>ID клиента: {client.client_id}</div>
                <div style={{color:"#bbb", fontSize:13, marginBottom:12}}>
                    {client.timestamp}
                </div>
                {/* Метрики решения и риска */}
                <Metric label="Решение" value={client.result?.decision} color={decisionColor}/>
                <Metric label="Риск" value={client.result?.risk_level} color={riskColor}/>

                {/* Краткие финансы */}
                <div style={{margin:"18px 0 8px 0", fontWeight:"bold", fontSize:15, color:"#555"}}>Финансовые параметры</div>
                <div>{keyData}</div>

                {/* Свернуть все параметры */}
                <details style={{
                    marginTop:14, background:"#f5f5f6", borderRadius:6, padding:"8px 6px"
                }}>
                    <summary style={{cursor:"pointer", fontSize:14, color:"#555"}}>Все параметры клиента</summary>
                    <pre style={{
                        fontSize:12, fontFamily:"Consolas, monospace", margin:0, padding:0,
                        color:"#222", background:"none", maxHeight:150, overflowY:"auto"
                    }}>
            {JSON.stringify(client.data, null, 2)}
          </pre>
                </details>
            </div>
        </div>
    );
};

export default ClientDetailModal;
