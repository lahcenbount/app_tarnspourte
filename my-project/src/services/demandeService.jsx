const API = "http://127.0.0.1:5000/api";

export async function getDemandes(token, userId) {
    const res = await fetch(`${API}/demandes?demandeur=${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Erreur lors du chargement des demandes");
    return res.json();
}

export async function getAllDemandes(token) {
  const res = await fetch(`${API}/demandes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Erreur lors du chargement des demandes");
  return res.json();
}
  
  export async function createDemande(token, data) {
    const res = await fetch(`${API}/demandes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Erreur serveur:", errorData);
      throw new Error("Erreur lors de la création de la demande");
    }

    return res.json();
}



