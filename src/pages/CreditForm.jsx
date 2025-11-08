import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./CreditForm.css";

const fields = [
    { key: "INCOME", label: "Annual Income (USD)", type: "number" },
    { key: "DEBT", label: "Total Debt (USD)", type: "number" },
    { key: "SAVINGS", label: "Savings (USD)", type: "number" },
    { key: "T_EXPENDITURE_12", label: "Annual Expenditure (USD)", type: "number" },
    { key: "T_HOUSING_12", label: "Annual Housing Expenditure (USD)", type: "number" },
    { key: "T_GROCERIES_12", label: "Annual Groceries Expenditure (USD)", type: "number" },
    { key: "T_GAMBLING_12", label: "Annual Gambling Expenditure (USD)", type: "number" }
];

function computeFeatures(vals) {
    const income = parseFloat(vals.INCOME) || 0;
    const debt = parseFloat(vals.DEBT) || 0;
    const savings = parseFloat(vals.SAVINGS) || 0;
    const exp = parseFloat(vals.T_EXPENDITURE_12) || 0;
    const housing = parseFloat(vals.T_HOUSING_12) || 0;
    const groceries = parseFloat(vals.T_GROCERIES_12) || 0;
    const gambling = parseFloat(vals.T_GAMBLING_12) || 0;
    return {
        INCOME: income,
        DEBT: debt,
        SAVINGS: savings,
        T_EXPENDITURE_12: exp,
        T_HOUSING_12: housing,
        T_GROCERIES_12: groceries,
        T_GAMBLING_12: gambling,
        R_DEBT_INCOME: income ? (debt / income) : 0,
        R_SAVINGS_INCOME: income ? (savings / income) : 0,
        R_EXPENDITURE: income ? (exp / income) : 0,
        R_GROCERIES: income ? (groceries / income) : 0,
        R_HOUSING: income ? (housing / income) : 0,
        R_GAMBLING: income ? (gambling / income) : 0
    };
}

export default function CreditForm() {
    const [values, setValues] = useState(() => Object.fromEntries(fields.map(f => [f.key, ""])));
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    function handleChange(e) {
        const { name, value } = e.target;
        setValues(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        const data = computeFeatures(values);
        try {
            const resp = await fetch("http://localhost:8000/predict_slim", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            const res = await resp.json();
            setResult(res);
        } catch {
            setResult({ error: "Request failed" });
        }
        setLoading(false);
    }

    return (
        <div className="form-full-bg">
            <div className="dashboard-header">
                <div>
                    <div className="smart-credit-title">Smart Credit <span className="for-retailers">for Retailers</span></div>
                </div>
                <nav className="dashboard-nav">
                    <Link to="/dashboard" className={location.pathname === "/dashboard" ? "nav-active" : ""}>Dashboard</Link>
                    <Link to="/form" className={location.pathname === "/form" ? "nav-active" : ""}>Credit Form</Link>
                    <Link to="/profile" className={location.pathname === "/profile" ? "nav-active" : ""}>Profile</Link>
                </nav>
            </div>
            <div className="credit-form-center-wrap">
                <div className="credit-form-card">
                    <h2 className="credit-form-title">Credit Score Application</h2>
                    <div className="credit-form-subtitle">All inputs are in US dollars (USD)</div>
                    <form onSubmit={handleSubmit}>
                        {fields.map(f => (
                            <div className="credit-label-input" key={f.key}>
                                <label htmlFor={f.key}>{f.label}</label>
                                <input
                                    id={f.key}
                                    name={f.key}
                                    className="credit-input"
                                    type={f.type}
                                    required
                                    inputMode="numeric"
                                    autoComplete="off"
                                    min="0"
                                    value={values[f.key]}
                                    onChange={handleChange}
                                />
                            </div>
                        ))}
                        <button className="credit-btn" type="submit" disabled={loading}>
                            {loading ? "Calculating..." : "Submit for Scoring"}
                        </button>
                    </form>
                    {result &&
                        <div className="credit-result-card">
                            {result.error ? (
                                <div style={{ color: "#d22", fontWeight: 500 }}>{result.error}</div>
                            ) : (
                                <>
                                    <div className="credit-result-title">Scoring result</div>
                                    <div className="credit-res-row"><span>Credit Score:</span><b>{result.credit_score}</b> <span style={{color:"#969"}}>({result.score_range})</span></div>
                                    <div className="credit-res-row"><span>Default Probability:</span><b>{result.default_probability}%</b></div>
                                    <div className="credit-res-row"><span>Decision:</span>
                                        <b style={{ color: result.decision === "REJECT" ? "#d33" : "#21a37e" }}>{result.decision}</b>
                                    </div>
                                    <div className="credit-res-row"><span>Risk Level:</span>
                                        <b style={{ color: result.risk_level === "High" ? "#d33" : "#21a37e" }}>{result.risk_level}</b>
                                    </div>
                                </>
                            )}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
