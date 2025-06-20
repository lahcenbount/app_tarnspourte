import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginService } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginService({ email, motDePasse });
      login(res.user, res.token); // stocker dans le contexte
      navigate("/profile");
    } catch (err) {
      const message =
        err?.message || "Erreur de connexion. Veuillez vérifier vos identifiants.";
      alert(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-2 w-full mb-4"
        autoComplete="email"
      />
      <input
        type="password"
        name="motDePasse"
        id="motDePasse"
        placeholder="Mot de passe"
        value={motDePasse}
        onChange={(e) => setMotDePasse(e.target.value)}
        required
        className="border p-2 w-full mb-4"
        autoComplete="current-password"
      />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">
        Se connecter
      </button>
    </form>
  );
}
