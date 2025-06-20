import React, { useEffect, useState } from "react";
import API from "../api";
import { useAuth } from "../context/AuthContext";

export default function MesTrajets() {
  const { user } = useAuth();
  const [trajets, setTrajets] = useState([]);

  useEffect(() => {
    if (user) fetchTrajets();
  }, [user]);

  async function fetchTrajets() {
    try {
      const res = await API.get(`/conducteur/${user._id}/trajets`);
      setTrajets(res.data);
    } catch (err) {
      console.error("Erreur fetch trajets", err);
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-12 p-4">
      <h1 className="text-2xl font-bold mb-6">Mes Trajets</h1>
      {trajets.length === 0 ? (
        <p>Vous n'avez pas encore publié de trajets.</p>
      ) : (
        <ul>
          {trajets.map(t => (
            <li key={t._id} className="border p-4 rounded mb-4 shadow-sm">
              <h2 className="font-semibold">{t.lieuDepart} → {t.destination}</h2>
              <p>Date: {new Date(t.dateTrajet).toLocaleDateString()}</p>
              <p>Capacité: {t.capacite}</p>
              {/* Ici tu peux ajouter demandes associées, etc. */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
