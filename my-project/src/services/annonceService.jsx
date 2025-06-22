const API = "http://127.0.0.1:5000/api";

// 🔹 GET : Récupérer toutes les annonces
export async function getAnnonces(token, userId) {
  try {
    if (!token) throw new Error("Token d'authentification manquant");

    const res = await fetch(`${API}/annonces${userId=="All" ?  "" : `?expediteurId=${userId}`}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Erreur ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    if (!Array.isArray(data)) throw new Error("Format de données invalide reçu du serveur");

    return data.map(mapAnnonce);
  } catch (error) {
    console.error("Erreur dans getAnnonces:", error);
    throw error;
  }
}

// 🔹 GET : Récupérer les annonces d'un utilisateur spécifique
export async function getUserAnnonces(token, userId = null) {
  try {
    if (!token) throw new Error("Token d'authentification manquant");

    const res = await fetch(`${API}/annonces/${userId ? `user/${userId}` : "me"}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Erreur lors du chargement des annonces utilisateur");
    }

    const data = await res.json();
    if (!Array.isArray(data)) throw new Error("Format de données invalide reçu du serveur");

    return data.map(mapAnnonce);
  } catch (error) {
    console.error("Erreur dans getUserAnnonces:", error);
    throw error;
  }
}

// 🔹 POST : Créer une annonce
export async function createAnnonce(data, token) {
  try {
    if (!token) throw new Error("Token d'authentification manquant");

    const requiredFields = ['depart', 'arrivee', 'poids', 'dimention', 'heure', 'prix'];
    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
      throw new Error(`Champs obligatoires manquants : ${missingFields.join(", ")}`);
    }

    const res = await fetch(`${API}/annonces`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...data, dateCreation: new Date().toISOString() }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Erreur lors de la création de l'annonce");
    }

    const createdAnnonce = await res.json();
    return mapAnnonce(createdAnnonce);
  } catch (error) {
    console.error("Erreur dans createAnnonce:", error);
    throw error;
  }
}

// 🔹 PUT : Mettre à jour une annonce
export async function updateAnnonce(annonceId, data, token) {
  try {
    if (!token) throw new Error("Token d'authentification manquant");
    if (!annonceId) throw new Error("ID de l'annonce manquant");

    const res = await fetch(`${API}/annonces/${annonceId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Erreur lors de la mise à jour de l'annonce");
    }

    const updatedAnnonce = await res.json();
    return mapAnnonce(updatedAnnonce);
  } catch (error) {
    console.error("Erreur dans updateAnnonce:", error);
    throw error;
  }
}

// 🔹 DELETE : Supprimer une annonce
export async function deleteAnnonce(annonceId, token) {
  try {
    if (!token) throw new Error("Token d'authentification manquant");
    if (!annonceId) throw new Error("ID de l'annonce manquant");

    const res = await fetch(`${API}/annonces/${annonceId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Erreur lors de la suppression");
    }

    return { success: true, message: "Annonce supprimée avec succès" };
  } catch (error) {
    console.error("Erreur dans deleteAnnonce:", error);
    throw error;
  }
}

// 🔁 Mapper une annonce depuis l'API
function mapAnnonce(annonce) {
  return {
    id: annonce._id || annonce.id,
    expediteurId: annonce.expediteurId,
    depart: annonce.depart,
    arrivee: annonce.arrivee,
    poids: annonce.poids,
    dimention: annonce.dimention || annonce.dimension || "",
    heure: annonce.heure,
    dateCreation: annonce.dateCreation || new Date().toISOString(),
    statut: annonce.statut || "active",
    prix: annonce.prix || 0,
    description: annonce.description || "",
  };
}
