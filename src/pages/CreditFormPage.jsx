// src/pages/CreditFormPage.jsx
import React, { useState } from "react";

const FIELDS = [
    { key: "income", label: "Income", type: "number", min: 0 },
    { key: "debt", label: "Debt", type: "number", min: 0 },
    { key: "expenditure", label: "Expenditure", type: "number", min: 0 },
    { key: "savings", label: "Savings", type: "number", min: 0 },
    { key: "credit_card", label: "Credit Card", type: "radio", options: [
            {value:1,label:"Yes"}, {value:0,label:"No"}
        ] },
    { key: "mortgage", label: "Mortgage", type: "radio", options: [
            {value:1,label:"Yes"}, {value:0,label:"No"}
        ] },
    { key: "dependents", label: "Dependents", type: "radio", options: [
            {value:0, label:"None"},
            {value:1, label:"1"},
            {value:2, label:"2-3"},
            {value:4, label:"4 or more"},
        ]},
];

const initialClient = {};
FIELDS.forEach(f => { initialClient[f.key] = ""; });

const prepareData = (raw) => ({
    ...raw,
    r_debt_income: raw.income ? (raw.debt / raw.income).toFixed(3) : 0,
    r_savings_income: raw.income ? (raw.savings / raw.income).toFixed(3) : 0,
    r_expenditure_income: raw.income ? (raw.expenditure / raw.income).toFixed(3) : 0,
});

const CreditFormPage = () => {
    const [client, setClient] = useState(initialClient);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const validateInput = (key, value) => {
        const field = FIELDS.find(f => f.key === key);
        if (field && field.type === "number") {
            if (value === "" || isNaN(Number(value)) || Number(value) < (field.min ?? 0)) return (field.min ?? 0);
        }
        return value;
    };

    const handleChange = (key, value) => {
        setClient(prev => ({ ...prev, [key]: validateInput(key, value) }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setResult(null);

        for (let f of FIELDS) {
            if (client[f.key] === "") {
                setError("Please fill in all fields!");
                setLoading(false);
                return;
            }
        }
        const clientData = prepareData(client);

        try {
            const res = await fetch("http://localhost:8000/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(clientData),   // ВАЖНО: просто { income, debt, ... }
            });
            const json = await res.json();
            if (!res.ok) {
                setError(json.detail || "Server error");
            } else {
                setResult(json.result);   // result находится по ключу 'result'
            }
        } catch (e) {
            setError("Server unavailable");
        }
        setLoading(false);
    };

    return (
        <div style={{
            maxWidth: "400px", margin: "100px auto 0", padding: "34px 26px 30px",
            background: "#232325", borderRadius: "16px", color: "#fff",
            boxShadow: "0 2px 18px #0003"
        }}>
            <h2 style={{
                textAlign: "center", marginBottom: "22px", fontSize: "24px", fontWeight: 600
            }}>
                New Client Scoring
            </h2>
            <form onSubmit={handleSubmit} style={{width:"100%"}} autoComplete="off">
                {FIELDS.map(field => (
                    <div key={field.key} style={{ marginBottom: "14px", display: "flex", flexDirection: "column" }}>
                        <label style={{
                            fontWeight: 470, fontSize: "15px", marginBottom: "7px", color:"#e6e6ee"
                        }}>
                            {field.label}
                        </label>
                        {field.type === "radio" ? (
                            <div style={{display: "flex", gap:"13px", marginTop:"3px", flexWrap:"wrap"}}>
                                {field.options.map(opt => (
                                    <label key={opt.value} style={{
                                        display:"flex", alignItems:"center", gap:"4px", fontSize:"15px"
                                    }}>
                                        <input
                                            type="radio"
                                            name={field.key}
                                            value={opt.value}
                                            checked={String(client[field.key]) === String(opt.value)}
                                            onChange={() => handleChange(field.key, opt.value)}
                                            style={{
                                                accentColor:"#45ca7b", width:"17px", height:"17px"
                                            }}
                                        />
                                        {opt.label}
                                    </label>
                                ))}
                            </div>
                        ) : (
                            <input
                                type={field.type}
                                value={client[field.key]}
                                min={field.min ?? 0}
                                onChange={e => handleChange(field.key, e.target.value.replace(/[^0-9]/g, ""))}
                                style={{
                                    fontSize: "15px", padding: "7px 11px", borderRadius: 7,
                                    border: "1px solid #3c3c43", background: "#23282e", color: "#fff"
                                }}
                            />
                        )}
                    </div>
                ))}
                <button type="submit" disabled={loading} style={{
                    width: "100%", padding: "12px 0", fontSize: "17px", borderRadius: 8,
                    background: "#45ca7b", color: "#fff", border: "none", fontWeight: "bold", cursor: "pointer"
                }}>
                    {loading ? "Calculating..." : "Get Scoring"}
                </button>
                {error && <div style={{ color: "#ff4466", marginTop: 13, textAlign:"center" }}>{error}</div>}
            </form>
            {result &&
                <div style={{
                    marginTop: "25px", background: "#292b2f", borderRadius: "11px", padding: "15px 11px"
                }}>
                    <h3 style={{marginBottom:7, fontSize:17}}>Scoring result:</h3>
                    <div><b>Credit score:</b> {result.credit_score}</div>
                    <div><b>Default risk (%):</b> {result.default_probability}</div>
                    <div>
                        <b>Risk:</b> <span style={{
                        color: result.risk_level === "Low" ? "#45ca7b" :
                            result.risk_level === "Medium" ? "#ffd055" :
                                "#ff4466", fontWeight:"bold"}}>
              {result.risk_level}
            </span>
                    </div>
                    <div>
                        <b>Decision:</b> <span style={{
                        color: result.decision === "APPROVE" ? "#45ca7b" :
                            result.decision === "REVIEW" ? "#ffd055" :
                                "#ff4466", fontWeight:"bold"
                    }}>
              {result.decision}
            </span>
                    </div>
                </div>
            }
        </div>
    );
};

export default CreditFormPage;
