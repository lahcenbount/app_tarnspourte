export async function getDemandes(token) {
    const res = await fetch("/api/demandes", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Erreur lors du chargement des demandes");
    return res.json();
  }
  
  export async function createDemande(annonceId, token) {
    const res = await fetch("/api/demandes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ annonceId }),
    });
    if (!res.ok) throw new Error("Erreur lors de la demande");
    return res.json();
  }