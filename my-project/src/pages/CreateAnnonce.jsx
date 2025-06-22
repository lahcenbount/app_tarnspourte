import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAnnonce } from "../services/annonceService";
import { Button } from "../components/ui/Button";

export default function CreateAnnonce() {
  const now = new Date();
  const defaultDate = now.toISOString().split("T")[0];
  const defaultTime = now.toTimeString().slice(0, 5);

  const [form, setForm] = useState({
    depart: "",
    arrivee: "",
    poids: "",
    longueur: "",
    largeur: "",
    hauteur: "",
    date: defaultDate,
    time: defaultTime,
    description: "",
    prix: 0,
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!token || !user) {
        navigate("/login");
        return;
      }

      const heure = `${form.date}T${form.time}`;
      const dimention = `${form.longueur}x${form.largeur}x${form.hauteur}`;

      const newAnnonce = await createAnnonce(
        {
          ...form,
          heure,
          dimention,
          expediteurId: user._id,
        },
        token
      );

      console.log("Annonce créée:", newAnnonce);
      navigate("/driver_dashboard");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Créer un nouveau trajet</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="depart" placeholder="Départ" onChange={handleChange} required className="w-full border p-2" />
        <input name="arrivee" placeholder="Arrivée" onChange={handleChange} required className="w-full border p-2" />
        <input name="poids" placeholder="Poids (kg)" type="number" onChange={handleChange} required className="w-full border p-2" />

        {/* ✅ Dimensions en ligne */}
        <div className="flex space-x-2">
          <input
            name="longueur"
            type="number"
            placeholder="Longueur (cm)"
            onChange={handleChange}
            required
            className="w-1/3 border p-2"
          />
          <input
            name="largeur"
            type="number"
            placeholder="Largeur (cm)"
            onChange={handleChange}
            required
            className="w-1/3 border p-2"
          />
          <input
            name="hauteur"
            type="number"
            placeholder="Hauteur (cm)"
            onChange={handleChange}
            required
            className="w-1/3 border p-2"
          />
        </div>

        {/* ✅ Date + Heure */}
        <div className="flex space-x-2">
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
            className="w-1/2 border p-2"
          />
          <input
            name="time"
            type="time"
            value={form.time}
            onChange={handleChange}
            required
            className="w-1/2 border p-2"
          />
        </div>

        <input name="prix" placeholder="Prix (MAD)" type="number" onChange={handleChange} required className="w-full border p-2" />
        <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full border p-2" />

        <Button type="submit" className="bg-blue-600 text-white">
          Publier
        </Button>
      </form>
    </div>
  );
}
