import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import initialClientsJson from "../data/clients.json";

const statuses = [
    { key: "New", label: "New", color: "#5b7aff" },
    { key: "Review", label: "Review", color: "#ffd055" },
    { key: "Approved", label: "Approved", color: "#45ca7b" },
    { key: "Rejected", label: "Rejected", color: "#ff4466" }
];

function groupClients(clients) {
    const result = {};
    statuses.forEach(s => result[s.key] = []);
    clients.forEach(c => result[c.status].push(c));
    return result;
}

function getInitialClients() {
    const stored = localStorage.getItem("clientsData");
    if (stored) return JSON.parse(stored);
    return initialClientsJson;
}

export default function KanbanClientsPage() {
    const [clients, setClients] = useState(getInitialClients());
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", score: "", status: "New" });
    const [formError, setFormError] = useState("");
    const [editClient, setEditClient] = useState(null); // клиент для редактирования

    const groupedClients = groupClients(clients);

    // drag logic
    const onDragEnd = result => {
        const { source, destination } = result;
        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;
        const groups = groupClients(clients);
        const moved = groups[source.droppableId][source.index];
        groups[source.droppableId].splice(source.index, 1);
        groups[destination.droppableId].splice(destination.index, 0, { ...moved, status: destination.droppableId });
        const flatClients = [];
        statuses.forEach(s => flatClients.push(...groups[s.key]));
        setClients(flatClients);
    };

    React.useEffect(() => {
        localStorage.setItem("clientsData", JSON.stringify(clients));
    }, [clients]);

    // add new client
    const handleAddClient = e => {
        e.preventDefault();
        if (!form.name.trim() || !form.email.trim() || !form.score.trim()) {
            setFormError("Please fill in all fields!");
            return;
        }
        if (isNaN(form.score) || form.score < 0 || form.score > 1000) {
            setFormError("Score must be a number (0—1000)");
            return;
        }
        const newClient = {
            id: String(Date.now()) + Math.random(),
            name: form.name,
            email: form.email,
            score: Number(form.score),
            status: form.status
        };
        setClients([newClient, ...clients]);
        setForm({ name: "", email: "", score: "", status: "New" });
        setFormError("");
        setShowForm(false);
    };

    // edit client
    const handleEditClient = e => {
        e.preventDefault();
        if (!editClient.name.trim() || !editClient.email.trim() || !editClient.score.toString().trim()) {
            setFormError("Please fill in all fields!");
            return;
        }
        if (isNaN(editClient.score) || editClient.score < 0 || editClient.score > 1000) {
            setFormError("Score must be a number (0—1000)");
            return;
        }
        setClients(
            clients.map(c => c.id === editClient.id ? { ...editClient } : c)
        );
        setEditClient(null);
        setFormError("");
    };

    // remove client
    const handleDeleteClient = (clientId) => {
        setClients(clients.filter(c => c.id !== clientId));
        setEditClient(null);
    };

    // клик по карточке клиента для открытия редактирования
    const openEditModal = (client) => {
        setEditClient({ ...client });
        setFormError("");
    };

    return (
        <div style={{ margin: "100px auto 0", maxWidth: 1150, padding: "0 6px" }}>
            <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:28}}>
                <h2 style={{ color: "#fff", fontWeight: 600, fontSize: "26px", marginBottom: 0 }}>Clients Kanban Board</h2>
                <button onClick={() => setShowForm(true)}
                        style={{
                            background: "#45ca7b", color: "#191920", borderRadius: 7, padding: "11px 23px",
                            fontWeight: 600, fontSize: "16px", border: "none", cursor: "pointer", boxShadow: "0 2px 10px #0002"
                        }}>+ Add Client</button>
            </div>

            {/* Add client modal */}
            {showForm &&
                <div style={{
                    position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
                    background: "#0006", zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center"
                }}>
                    <form onSubmit={handleAddClient}
                          style={{
                              background: "#232325", padding: "32px 28px 20px", borderRadius: "16px",
                              minWidth:360, boxShadow:"0 6px 36px #0007", display:"flex", flexDirection:"column", gap:"14px"
                          }}>
                        <h3 style={{color:"#45ca7b", fontWeight:570, fontSize:"23px", marginBottom:"3px"}}>New Client</h3>
                        <input type="text" placeholder="Name" value={form.name}
                               onChange={e => setForm({...form, name: e.target.value})}
                               style={{ padding: "10px", borderRadius: 8, border: "1px solid #38444d",
                                   background: "#26303b", color: "#fff", fontSize: "16px" }} required />
                        <input type="email" placeholder="Email" value={form.email}
                               onChange={e => setForm({...form, email: e.target.value})}
                               style={{ padding: "10px", borderRadius: 8, border: "1px solid #38444d",
                                   background: "#26303b", color: "#fff", fontSize: "16px" }} required />
                        <input type="number" placeholder="Score (0–1000)" value={form.score}
                               min={0} max={1000}
                               onChange={e => setForm({...form, score: e.target.value.replace(/\D/g, "")})}
                               style={{ padding: "10px", borderRadius: 8, border: "1px solid #38444d",
                                   background: "#26303b", color: "#fff", fontSize: "16px" }} required />
                        <select value={form.status} onChange={(e) => setForm({...form, status: e.target.value})}
                                style={{ padding: "10px", borderRadius: 8, border:"1px solid #38444d",
                                    fontSize:"16px", background:"#20263b", color: "#fff" }}>
                            {statuses.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
                        </select>
                        {formError && <div style={{ color: "#ff4466", fontSize:"15px" }}>{formError}</div>}
                        <div style={{display:"flex", gap:22, marginTop:"5px"}}>
                            <button type="submit" style={{
                                background: "#45ca7b", color: "#191920", borderRadius: 8, padding: "10px 0", flex:1,
                                fontWeight: 600, fontSize: "16px", border: "none", cursor: "pointer"
                            }}>Add</button>
                            <button type="button" onClick={() => setShowForm(false)} style={{
                                background:"#292b2f", color:"#fff", border:"none", borderRadius:8, padding:"10px 0", flex:1, fontWeight:550
                            }}>Cancel</button>
                        </div>
                    </form>
                </div>
            }

            {/* Edit client modal */}
            {editClient &&
                <div style={{
                    position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
                    background: "#0006", zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center"
                }}>
                    <form onSubmit={handleEditClient}
                          style={{
                              background: "#232325", padding: "32px 28px 20px", borderRadius: "16px",
                              minWidth:360, boxShadow:"0 6px 36px #0007", display:"flex", flexDirection:"column", gap:"14px"
                          }}>
                        <h3 style={{color:"#45ca7b", fontWeight:570, fontSize:"23px", marginBottom:"3px"}}>Edit Client</h3>
                        <input type="text" placeholder="Name" value={editClient.name}
                               onChange={e => setEditClient({...editClient, name: e.target.value})}
                               style={{ padding: "10px", borderRadius: 8, border: "1px solid #38444d",
                                   background: "#26303b", color: "#fff", fontSize: "16px" }} required />
                        <input type="email" placeholder="Email" value={editClient.email}
                               onChange={e => setEditClient({...editClient, email: e.target.value})}
                               style={{ padding: "10px", borderRadius: 8, border: "1px solid #38444d",
                                   background: "#26303b", color: "#fff", fontSize: "16px" }} required />
                        <input type="number" placeholder="Score (0–1000)" value={editClient.score}
                               min={0} max={1000}
                               onChange={e => setEditClient({...editClient, score: e.target.value.replace(/\D/g, "")})}
                               style={{ padding: "10px", borderRadius: 8, border: "1px solid #38444d",
                                   background: "#26303b", color: "#fff", fontSize: "16px" }} required />
                        <select value={editClient.status} onChange={(e) => setEditClient({...editClient, status: e.target.value})}
                                style={{ padding: "10px", borderRadius: 8, border:"1px solid #38444d",
                                    fontSize:"16px", background:"#20263b", color: "#fff" }}>
                            {statuses.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
                        </select>
                        {formError && <div style={{ color: "#ff4466", fontSize:"15px" }}>{formError}</div>}
                        <div style={{display:"flex", gap:22, marginTop:"5px"}}>
                            <button type="submit" style={{
                                background: "#45ca7b", color: "#191920", borderRadius: 8, padding: "10px 0", flex:1,
                                fontWeight: 600, fontSize: "16px", border: "none", cursor: "pointer"
                            }}>Save</button>
                            <button type="button" onClick={() => setEditClient(null)} style={{
                                background:"#292b2f", color:"#fff", border:"none", borderRadius:8, padding:"10px 0", flex:1, fontWeight:550
                            }}>Cancel</button>
                            <button type="button" onClick={() => handleDeleteClient(editClient.id)} style={{
                                background:"#ff4466", color:"#fff", border:"none", borderRadius:8, padding:"10px 0", flex:1, fontWeight:550
                            }}>Delete</button>
                        </div>
                    </form>
                </div>
            }

            <DragDropContext onDragEnd={onDragEnd}>
                <div style={{ display: "flex", gap: "32px", justifyContent: "flex-start" }}>
                    {statuses.map(status => (
                        <Droppable droppableId={status.key} key={status.key}>
                            {(provided, snapshot) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}
                                     style={{
                                         background: "#232325",
                                         borderRadius: 12, minWidth: 230, flex: "1 1 0%",
                                         boxShadow: "0 2px 13px #0003", padding: "17px 14px",
                                         transition: "background 0.18s",
                                         outline: snapshot.isDraggingOver ? `2px solid ${status.color}` : "none"
                                     }}>
                                    <div style={{
                                        fontWeight: 560, fontSize: "17px", color: status.color, marginBottom: 13
                                    }}>{status.label}</div>
                                    <div style={{ minHeight: 150 }}>
                                        {groupedClients[status.key].map((client, idx) => (
                                            <Draggable key={client.id} draggableId={client.id} index={idx}>
                                                {(prov, snap) => (
                                                    <div
                                                        ref={prov.innerRef}
                                                        {...prov.draggableProps}
                                                        {...prov.dragHandleProps}
                                                        style={{
                                                            background: "#222b3a",
                                                            borderRadius: 8,
                                                            marginBottom: 17,
                                                            padding: "12px 11px",
                                                            boxShadow: "0 1px 5px #0002",
                                                            userSelect: "none",
                                                            opacity: snap.isDragging ? 0.7 : 1,
                                                            cursor: "pointer",
                                                            ...prov.draggableProps.style
                                                        }}
                                                        onClick={() => openEditModal(client)}
                                                    >
                                                        <div style={{
                                                            fontWeight: 520, fontSize: 15.5, color: "#e6f4ee"
                                                        }}>{client.name}</div>
                                                        <div style={{ fontSize: 14, color: "#a8bee8" }}>{client.email}</div>
                                                        <div style={{
                                                            fontSize: 13, color: "#aaf", fontWeight: 470
                                                        }}>
                                                            Score: <b>{client.score}</b>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
}
