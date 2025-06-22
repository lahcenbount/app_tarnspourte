import React, { useState } from "react"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"
import { useNavigate } from "react-router-dom"
import { login } from "../services/authService"  // <-- ton service API

export default function Login({ onNavigate }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    if(error) setError(null)
  }

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError(null);

  try {
    const data = await login({
      email: formData.email,
      motDePasse: formData.password,
    });

    console.log("Connexion réussie:", data);

    // Sauvegarde du token dans localStorage
    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    // Sauvegarde des infos utilisateur (sans le token pour éviter redondance)
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    // Redirection selon le rôle
    if (data.user.role === "conducteur") {
      if (typeof onNavigate === "function") {
        onNavigate("driver_dashboard");
      } else {
        navigate("/driver_dashboard");
      }
    } else if (data.user.role === "expediteur") {
      if (typeof onNavigate === "function") {
        onNavigate("sender_dashboard");
      } else {
        navigate("/sender_dashboard");
      }
    } else {
      navigate("/"); // fallback générique
    }
  } catch (err) {
    setError(err.message || "Erreur inconnue");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 animate-in fade-in duration-300">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Connexion</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium">Adresse email</label>
              <Input
                type="email"
                placeholder="Entrez votre adresse email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Mot de passe</label>
              <Input
                type="password"
                placeholder="Entrez votre mot de passe"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
              disabled={isLoading}
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>
          <p className="text-center text-gray-600 mt-6">
            Pas de compte ?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-blue-600 hover:underline"
            >
              Créer un nouveau compte
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
