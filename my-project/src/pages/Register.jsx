import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/Select";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

const USER_ROLES = {
  CONDUCTEUR: "conducteur",
  EXPEDITEUR: "expediteur",
};

export default function Register({ onNavigate }) {
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    // telephone: "",
    role: USER_ROLES.CONDUCTEUR,
    motDePasse: "",
    confirmMotDePasse: "",
  });

  const navigate = useNavigate();
  

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.prenom.trim()) newErrors.prenom = "Le prénom est requis";

    if (!formData.nom.trim()) newErrors.nom = "Le nom est requis";

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }

    // if (!formData.telephone.trim()) {
    //   newErrors.telephone = "Le numéro de téléphone est requis";
    // } else if (!/^(\+212|0)[1-9]\d{8}$/.test(formData.telephone)) {
    //   newErrors.telephone = "Le numéro de téléphone n'est pas valide";
    // }

    if (!formData.role) {
      newErrors.role = "Le rôle est requis";
    } else if (!Object.values(USER_ROLES).includes(formData.role)) {
      newErrors.role = "Rôle invalide sélectionné";
    }

    if (!formData.motDePasse) {
      newErrors.motDePasse = "Le mot de passe est requis";
    } else if (formData.motDePasse.length < 8) {
      newErrors.motDePasse = "Le mot de passe doit contenir au moins 8 caractères";
    }

    if (formData.motDePasse !== formData.confirmMotDePasse) {
      newErrors.confirmMotDePasse = "Les mots de passe ne correspondent pas";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      await register({
        prenom: formData.prenom.trim(),
        nom: formData.nom.trim(),
        email: formData.email.trim(),
        // telephone: formData.telephone.trim(),
        role: formData.role,
        motDePasse: formData.motDePasse,
      });

      // ✅ Redirect to login after successful registration
      // if (typeof onNavigate === "function") {
        // onNavigate("login");
      // }
      // navigation.useNavigate("/login")
      navigate("/login"); // fallback générique
        
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      setErrors({
        general:
          error.message || "Une erreur s'est produite lors de la création du compte.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 animate-in fade-in duration-300">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Créer un nouveau compte</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {errors.general && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
                role="alert"
              >
                {errors.general}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Prénom</label>
                <Input
                  value={formData.prenom}
                  onChange={(e) => handleInputChange("prenom", e.target.value)}
                  className={errors.prenom ? "border-red-500" : ""}
                />
                {errors.prenom && (
                  <p className="text-red-500 text-sm">{errors.prenom}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Nom</label>
                <Input
                  value={formData.nom}
                  onChange={(e) => handleInputChange("nom", e.target.value)}
                  className={errors.nom ? "border-red-500" : ""}
                />
                {errors.nom && (
                  <p className="text-red-500 text-sm">{errors.nom}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Adresse email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* <div className="space-y-2">
              <label className="text-sm font-medium">Téléphone</label>
              <Input
                type="tel"
                placeholder="+212600000000"
                value={formData.telephone}
                onChange={(e) => handleInputChange("telephone", e.target.value)}
                className={errors.telephone ? "border-red-500" : ""}
              />
              {errors.telephone && (
                <p className="text-red-500 text-sm">{errors.telephone}</p>
              )}
            </div> */}

            <div className="space-y-2">
              <label className="text-sm font-medium">Type de compte</label>
              <Select
                onValueChange={(value) => handleInputChange("role", value)}
                value={formData.role}
              >
                <SelectTrigger className={errors.role ? "border-red-500" : ""}>
                  <SelectValue placeholder="Choisissez le type de compte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={USER_ROLES.CONDUCTEUR}>Chauffeur</SelectItem>
                  <SelectItem value={USER_ROLES.EXPEDITEUR}>Expéditeur</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-red-500 text-sm">{errors.role}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Mot de passe</label>
              <Input
                type="password"
                value={formData.motDePasse}
                onChange={(e) => handleInputChange("motDePasse", e.target.value)}
                className={errors.motDePasse ? "border-red-500" : ""}
              />
              {errors.motDePasse && (
                <p className="text-red-500 text-sm">{errors.motDePasse}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Confirmer le mot de passe</label>
              <Input
                type="password"
                value={formData.confirmMotDePasse}
                onChange={(e) =>
                  handleInputChange("confirmMotDePasse", e.target.value)
                }
                className={errors.confirmMotDePasse ? "border-red-500" : ""}
              />
              {errors.confirmMotDePasse && (
                <p className="text-red-500 text-sm">{errors.confirmMotDePasse}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
              disabled={isLoading}
            >
              {isLoading ? "Création du compte..." : "Créer le compte"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
