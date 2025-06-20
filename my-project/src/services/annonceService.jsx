export async function getAnnonces() {
    const res = await fetch("/api/annonces");
    if (!res.ok) throw new Error("Erreur lors du chargement des annonces");
    return res.json();
  }
  
  export async function createAnnonce(data, token) {
    const res = await fetch("/api/annonces", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Erreur lors de la création");
    return res.json();
  }
  