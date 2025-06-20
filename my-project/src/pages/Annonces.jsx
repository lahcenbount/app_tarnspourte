import { useState, useEffect } from "react";
import { getAnnonces, createAnnonce } from "../services/annonceService";
import { useAuth } from "../context/AuthContext";
import { createDemande } from "../services/demandeService";

export default function Annonces() {
  const [annonces, setAnnonces] = useState([]);
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        const data = await getAnnonces();
        setAnnonces(data);
      } catch (err) {
        setError("Impossible de charger les annonces",err);
      }
    };
    fetchAnnonces();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const data = await createAnnonce({ titre, description }, token);
      setAnnonces([data, ...annonces]);
      setTitre("");
      setDescription("");
      setError("");
    } catch {
      setError("Erreur lors de la création");
    }
  };

  const handleDemande = async (annonceId) => {
    try {
      await createDemande(annonceId, localStorage.getItem("token"));
      alert("Demande envoyée !");
    } catch {
      alert("Erreur lors de la demande");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Annonces</h1>

      {user && (
        <form onSubmit={handleCreate} className="mb-6 bg-gray-100 p-4 rounded">
          <h2 className="mb-2 font-bold text-lg">Créer une annonce</h2>
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <input
            placeholder="Titre"
            className="w-full mb-2 p-2 border rounded"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            className="w-full mb-2 p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Publier
          </button>
        </form>
      )}

      <ul>
        {annonces.map((a) => (
          <li key={a._id} className="mb-4 p-4 border rounded bg-white shadow">
            <h3 className="font-bold text-xl">{a.titre}</h3>
            <p className="text-gray-700">{a.description}</p>
            <div className="text-sm text-gray-500">
              Par {a.proprietaire?.nom} {a.proprietaire?.prenom}
            </div>
            {user && (
              <button
                onClick={() => handleDemande(a._id)}
                className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Demander
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
