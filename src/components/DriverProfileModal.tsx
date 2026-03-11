import React, { useState } from "react";
import { ZONE_CONFIG } from "../constants";

export default function DriverProfileModal({ driver, onClose, onSaveTicket }: { driver: any, onClose: () => void, onSaveTicket: (ticket: any) => void }) {
  const [activeTab, setActiveTab] = useState("info");
  const [newTicket, setNewTicket] = useState({ type: "PANNE", description: "", status: "OUVERT" });

  if (!driver) return null;

  const zoneInfo = ZONE_CONFIG[driver.zone] || ZONE_CONFIG.INCONNU;

  const handleAddTicket = () => {
    if (!newTicket.description.trim()) return;
    onSaveTicket({
      ...newTicket,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      driverId: driver.id
    });
    setNewTicket({ type: "PANNE", description: "", status: "OUVERT" });
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(15,23,42,0.65)", zIndex: 10000, display: "flex",
        alignItems: "center", justifyContent: "center", backdropFilter: "blur(6px)"
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: 24, padding: 0, width: 800, maxWidth: "95vw",
          boxShadow: "0 25px 80px rgba(0,0,0,0.3)", overflow: "hidden",
          animation: "modalIn 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          maxHeight: "90vh", display: "flex", flexDirection: "column"
        }}
      >
        {/* Header */}
        <div style={{ background: "linear-gradient(135deg,#1e3a5f,#1d4ed8)", padding: "24px 32px", color: "#fff", flexShrink: 0, position: "relative" }}>
          <button onClick={onClose} style={{ position: "absolute", top: 20, right: 24, background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", width: 32, height: 32, borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, transition: "background 0.2s" }}>✕</button>
          
          <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#fff", color: "#1d4ed8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 800, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
              {driver.nom ? driver.nom.charAt(0).toUpperCase() : "👤"}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800 }}>{driver.nom || "Chauffeur inconnu"}</h2>
                <span style={{ background: zoneInfo.bg, color: zoneInfo.color, border: `1px solid ${zoneInfo.border}`, padding: "4px 10px", borderRadius: 99, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                  {zoneInfo.icon} {zoneInfo.label}
                </span>
              </div>
              <div style={{ fontSize: 15, opacity: 0.9, display: "flex", alignItems: "center", gap: 16 }}>
                <span>📞 {driver.tel || "Sans numéro"}</span>
                <span>🚗 {driver.vehicule || "Véhicule inconnu"} ({driver.plaque || "Pas de plaque"})</span>
                <span>🪪 Permis: {driver.permis || "Non renseigné"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb", background: "#f8fafc", padding: "0 24px" }}>
          {[
            { id: "info", label: "Vue 360°", icon: "👁️" },
            { id: "history", label: "Historique Appels", icon: "📞" },
            { id: "quality", label: "Qualité & Notes", icon: "⭐" },
            { id: "tickets", label: "Requêtes / Assistance", icon: "🛠️" }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                padding: "16px 20px", background: "none", border: "none", borderBottom: activeTab === t.id ? "3px solid #1d4ed8" : "3px solid transparent",
                color: activeTab === t.id ? "#1d4ed8" : "#6b7280", fontSize: 14, fontWeight: activeTab === t.id ? 700 : 600,
                cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 8
              }}
            >
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ padding: "24px 32px", overflowY: "auto", flex: 1, background: "#fff" }}>
          
          {/* TAB: INFO */}
          {activeTab === "info" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ background: "#f8fafc", padding: 20, borderRadius: 16, border: "1px solid #e5e7eb" }}>
                  <h3 style={{ margin: "0 0 16px 0", fontSize: 14, color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.05em" }}>Activité</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>Dernière commande</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{driver.derniere_commande || "Jamais"}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>Jours inactif</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: driver.jours_inactif >= 7 ? "#ef4444" : "#111827" }}>{driver.jours_inactif ?? "N/A"} jours</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>Commandes terminées</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{driver.commandes || 0}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>Note actuelle</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: driver.note && parseFloat(driver.note) < 4.5 ? "#ef4444" : "#f59e0b" }}>⭐ {driver.note || "N/A"}</div>
                    </div>
                  </div>
                </div>

                <div style={{ background: "#f8fafc", padding: 20, borderRadius: 16, border: "1px solid #e5e7eb" }}>
                  <h3 style={{ margin: "0 0 16px 0", fontSize: 14, color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.05em" }}>Finances</h3>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>Solde actuel</div>
                      <div style={{ fontSize: 24, fontWeight: 800, color: driver.solde < driver.limite ? "#ef4444" : driver.solde < 0 ? "#f97316" : "#22c55e" }}>
                        {driver.solde} XOF
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>Limite autorisée</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: "#374151" }}>{driver.limite} XOF</div>
                    </div>
                  </div>
                  {driver.fin_bloque && (
                    <div style={{ marginTop: 12, background: "#fef2f2", color: "#b91c1c", padding: "8px 12px", borderRadius: 8, fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                      ⛔ Compte bloqué pour solde insuffisant
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {driver.dateRappel && (
                  <div style={{ background: "#f0fdf4", padding: 20, borderRadius: 16, border: "1px solid #bbf7d0" }}>
                    <h3 style={{ margin: "0 0 8px 0", fontSize: 14, color: "#166534", textTransform: "uppercase", letterSpacing: "0.05em", display: "flex", alignItems: "center", gap: 6 }}>
                      📅 Rappel programmé
                    </h3>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#14532d" }}>
                      {new Date(driver.dateRappel).toLocaleDateString("fr-FR", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                  </div>
                )}

                <div style={{ background: "#f8fafc", padding: 20, borderRadius: 16, border: "1px solid #e5e7eb", height: "100%" }}>
                  <h3 style={{ margin: "0 0 16px 0", fontSize: 14, color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.05em" }}>Dernier Commentaire</h3>
                  {driver.commentaire ? (
                    <div style={{ fontSize: 15, color: "#1f2937", lineHeight: 1.5, background: "#fff", padding: 16, borderRadius: 12, border: "1px solid #e5e7eb" }}>
                      {driver.commentaire}
                    </div>
                  ) : (
                    <div style={{ fontSize: 14, color: "#9ca3af", fontStyle: "italic", textAlign: "center", padding: "30px 0" }}>
                      Aucun commentaire enregistré.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB: HISTORY */}
          {activeTab === "history" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <h3 style={{ margin: 0, fontSize: 16, color: "#111827" }}>Historique des interactions ({driver._callLog?.length || 0})</h3>
              </div>
              
              {(!driver._callLog || driver._callLog.length === 0) ? (
                <div style={{ textAlign: "center", padding: "40px 0", color: "#9ca3af", background: "#f9fafb", borderRadius: 16, border: "1px dashed #e5e7eb" }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>📭</div>
                  <div style={{ fontSize: 15, fontWeight: 500 }}>Aucun appel enregistré pour ce chauffeur.</div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[...driver._callLog].reverse().map((log: any, i: number) => (
                    <div key={i} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 16, display: "flex", gap: 16, alignItems: "flex-start" }}>
                      <div style={{ width: 40, height: 40, borderRadius: "50%", background: log.via === "wa" ? "#dcfce3" : "#dbeafe", color: log.via === "wa" ? "#16a34a" : "#1d4ed8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                        {log.via === "wa" ? "💬" : "📞"}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                          <div style={{ fontWeight: 700, color: "#111827", fontSize: 15 }}>{log.agent}</div>
                          <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 500 }}>{log.time}</div>
                        </div>
                        {log.outcome && (
                          <div style={{ display: "inline-block", background: "#f3f4f6", padding: "4px 8px", borderRadius: 6, fontSize: 12, fontWeight: 600, color: "#4b5563", marginBottom: 8, marginRight: 8 }}>
                            {log.outcome}
                          </div>
                        )}
                        {log.dateRappel && (
                          <div style={{ display: "inline-block", background: "#f0fdf4", padding: "4px 8px", borderRadius: 6, fontSize: 12, fontWeight: 600, color: "#166534", marginBottom: 8, border: "1px solid #bbf7d0" }}>
                            📅 Rappel: {new Date(log.dateRappel).toLocaleDateString("fr-FR")}
                          </div>
                        )}
                        <div style={{ fontSize: 14, color: "#374151", lineHeight: 1.5 }}>
                          {log.comment || "Aucun commentaire détaillé."}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: QUALITY */}
          {activeTab === "quality" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ background: "#fffbf1", border: "1px solid #fde68a", padding: 20, borderRadius: 16, display: "flex", alignItems: "center", gap: 20 }}>
                <div style={{ fontSize: 48 }}>⭐</div>
                <div>
                  <div style={{ fontSize: 13, color: "#b45309", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Note Globale Yango</div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: driver.note && parseFloat(driver.note) < 4.5 ? "#ef4444" : "#d97706" }}>
                    {driver.note || "N/A"} <span style={{ fontSize: 16, fontWeight: 600, color: "#9ca3af" }}>/ 5.0</span>
                  </div>
                </div>
                {driver.note && parseFloat(driver.note) < 4.5 && (
                  <div style={{ marginLeft: "auto", background: "#fef2f2", color: "#b91c1c", padding: "12px 16px", borderRadius: 12, border: "1px solid #fca5a5", maxWidth: 300 }}>
                    <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 4 }}>🚨 Risque de blocage</div>
                    <div style={{ fontSize: 12 }}>La note est inférieure à 4.5. Le chauffeur risque d'être bloqué par la plateforme.</div>
                  </div>
                )}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ background: "#f8fafc", padding: 20, borderRadius: 16, border: "1px solid #e5e7eb" }}>
                  <h3 style={{ margin: "0 0 16px 0", fontSize: 14, color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.05em" }}>Comportement Commandes</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 14, color: "#4b5563" }}>Taux d'acceptation</span>
                      <span style={{ fontSize: 16, fontWeight: 700, color: "#22c55e" }}>{driver.taux_acceptation ? `${(driver.taux_acceptation * 100).toFixed(0)}%` : "N/A"}</span>
                    </div>
                    <div style={{ width: "100%", height: 6, background: "#e5e7eb", borderRadius: 99, overflow: "hidden" }}>
                      <div style={{ width: driver.taux_acceptation ? `${driver.taux_acceptation * 100}%` : "0%", height: "100%", background: "#22c55e" }}></div>
                    </div>
                    
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                      <span style={{ fontSize: 14, color: "#4b5563" }}>Taux d'annulation</span>
                      <span style={{ fontSize: 16, fontWeight: 700, color: driver.taux_annulation && driver.taux_annulation > 0.1 ? "#ef4444" : "#f97316" }}>{driver.taux_annulation ? `${(driver.taux_annulation * 100).toFixed(0)}%` : "N/A"}</span>
                    </div>
                    <div style={{ width: "100%", height: 6, background: "#e5e7eb", borderRadius: 99, overflow: "hidden" }}>
                      <div style={{ width: driver.taux_annulation ? `${driver.taux_annulation * 100}%` : "0%", height: "100%", background: driver.taux_annulation && driver.taux_annulation > 0.1 ? "#ef4444" : "#f97316" }}></div>
                    </div>
                  </div>
                </div>

                <div style={{ background: "#f8fafc", padding: 20, borderRadius: 16, border: "1px solid #e5e7eb" }}>
                  <h3 style={{ margin: "0 0 16px 0", fontSize: 14, color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.05em" }}>Évolution (Derniers imports)</h3>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 100, color: "#9ca3af", fontSize: 13, fontStyle: "italic", textAlign: "center" }}>
                    Les données d'évolution seront disponibles après plusieurs imports hebdomadaires.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: TICKETS */}
          {activeTab === "tickets" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ background: "#f8fafc", padding: 20, borderRadius: 16, border: "1px solid #e5e7eb" }}>
                <h3 style={{ margin: "0 0 16px 0", fontSize: 14, color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.05em" }}>Nouvelle Requête / Assistance</h3>
                <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                  <select 
                    value={newTicket.type} 
                    onChange={e => setNewTicket({...newTicket, type: e.target.value})}
                    style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #d1d5db", fontSize: 14, fontWeight: 600, outline: "none", background: "#fff" }}
                  >
                    <option value="PANNE">🔧 Panne Véhicule</option>
                    <option value="ACCIDENT">💥 Accident</option>
                    <option value="COMPTE">📱 Problème Compte Yango</option>
                    <option value="SOLDE">💰 Litige Solde</option>
                    <option value="AUTRE">❓ Autre</option>
                  </select>
                  <input 
                    type="text" 
                    value={newTicket.description}
                    onChange={e => setNewTicket({...newTicket, description: e.target.value})}
                    placeholder="Description détaillée du problème..."
                    style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: "1px solid #d1d5db", fontSize: 14, outline: "none" }}
                  />
                  <button 
                    onClick={handleAddTicket}
                    disabled={!newTicket.description.trim()}
                    style={{ padding: "0 20px", background: newTicket.description.trim() ? "#1d4ed8" : "#9ca3af", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, cursor: newTicket.description.trim() ? "pointer" : "not-allowed", transition: "background 0.2s" }}
                  >
                    Créer
                  </button>
                </div>
              </div>

              <div>
                <h3 style={{ margin: "0 0 16px 0", fontSize: 14, color: "#111827", textTransform: "uppercase", letterSpacing: "0.05em" }}>Requêtes en cours ({driver.tickets?.length || 0})</h3>
                {(!driver.tickets || driver.tickets.length === 0) ? (
                  <div style={{ textAlign: "center", padding: "30px 0", color: "#9ca3af", background: "#f9fafb", borderRadius: 16, border: "1px dashed #e5e7eb" }}>
                    Aucune requête d'assistance pour ce chauffeur.
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {driver.tickets.map((t: any) => (
                      <div key={t.id} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                            <span style={{ background: "#f3f4f6", padding: "4px 8px", borderRadius: 6, fontSize: 11, fontWeight: 700, color: "#4b5563" }}>{t.type}</span>
                            <span style={{ fontSize: 12, color: "#9ca3af" }}>{new Date(t.date).toLocaleDateString("fr-FR")}</span>
                          </div>
                          <div style={{ fontSize: 15, color: "#111827", fontWeight: 500 }}>{t.description}</div>
                        </div>
                        <div style={{ background: t.status === "OUVERT" ? "#fef3c7" : "#dcfce3", color: t.status === "OUVERT" ? "#d97706" : "#16a34a", padding: "6px 12px", borderRadius: 99, fontSize: 12, fontWeight: 800 }}>
                          {t.status}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
