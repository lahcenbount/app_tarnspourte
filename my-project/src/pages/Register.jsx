import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register as registerService } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({ nom: "", prenom: "", email: "", motDePasse: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await registerService(form);
      login(data, data.token);
      navigate("/");
    } catch (err) {
      setError("Erreur lors de l'inscription",err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Inscription</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <input name="nom" placeholder="Nom" className="w-full mb-2 p-2 border" value={form.nom} onChange={handleChange} required />
      <input name="prenom" placeholder="Prénom" className="w-full mb-2 p-2 border" value={form.prenom} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" className="w-full mb-2 p-2 border" value={form.email} onChange={handleChange} required />
      <input name="motDePasse" type="password" placeholder="Mot de passe" className="w-full mb-4 p-2 border" value={form.motDePasse} onChange={handleChange} required />
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">S'inscrire</button>
    </form>
  );
}