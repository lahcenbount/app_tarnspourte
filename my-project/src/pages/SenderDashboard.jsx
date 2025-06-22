import React, { useState, useEffect } from "react";
import { getAnnonces } from "../services/annonceService"; // adapte le chemin si besoin
import { createDemande, getDemandes } from "../services/demandeService";

const Button = ({
  children,
  size = "md",
  variant = "solid",
  className = "",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };
  const variants = {
    solid:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline:
      "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500",
  };
  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = React.forwardRef(({ className = "", ...props }, ref) => (
  <input
    ref={ref}
    className={`border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
    {...props}
  />
));

// Add display name for forwardRef component
Input.displayName = "Input";

const Card = ({ children, className = "" }) => (
  <div className={`bg-white shadow rounded-lg ${className}`}>{children}</div>
);

const CardHeader = ({ children }) => (
  <div className="border-b px-6 py-4">{children}</div>
);

const CardTitle = ({ children }) => (
  <h2 className="text-xl font-bold text-gray-900">{children}</h2>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`px-6 py-4 ${className}`}>{children}</div>
);

const Badge = ({ children, className = "" }) => (
  <span
    className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${className}`}
  >
    {children}
  </span>
);

export default function SenderDashboard() {
  const [searchFilters, setSearchFilters] = useState({
    from: "",
    to: "",
    date: "",
  });
  const [availableTrips, setAvailableTrips] = useState([]);
  const [myRequests, setMyRequests] = useState([]); // Removed const for future updates
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requestsLoading, setRequestsLoading] = useState(false);

  // État pour afficher le formulaire pour un trajet donné
  const [showFormForTrip, setShowFormForTrip] = useState(null);
  // État du formulaire poids/dimension
  const [formData, setFormData] = useState({
    poids: "",
    dimention: "",
  });

  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");
        
        if (!token) {
          throw new Error("Token d'authentification manquant");
        }
        
        if (userData) {
          JSON.parse(userData); // Validate JSON format
        }
        
        const userId = "All";
        const annonces = await getAnnonces(token, userId);
        setAvailableTrips(Array.isArray(annonces) ? annonces : []);
      } catch (error) {
        console.error("Erreur lors du chargement des annonces :", error.message);
        setError("Impossible de charger les annonces. " + error.message);
        setAvailableTrips([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchMyRequests = async () => {
      try {
        setRequestsLoading(true);
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");
        
        if (!token || !userData) {
          return;
        }

        const user = JSON.parse(userData);
        
        // Use your existing getDemandes function
        const userRequests = await getDemandes(token, user.id);
        setMyRequests(Array.isArray(userRequests) ? userRequests : []);
        
      } catch (error) {
        console.error("Erreur lors du chargement des demandes :", error.message);
        // Don't show error for requests, just log it
        setMyRequests([]);
      } finally {
        setRequestsLoading(false);
      }
    };

    fetchAnnonces();
    fetchMyRequests();
  }, []);

  const handleSearchFilterChange = (field, value) => {
    setSearchFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    console.log("Recherche avec filtres:", searchFilters);
    // 🔍 Add filtering logic here
    // You might want to filter availableTrips based on searchFilters
  };

  // Ouvre ou ferme le formulaire pour un trajet donné
  const handleShowForm = (tripId) => {
    if (showFormForTrip === tripId) {
      setShowFormForTrip(null); // fermer si déjà ouvert
    } else {
      setShowFormForTrip(tripId);
      setFormData({ poids: "", dimention: "" }); // reset formulaire
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = async (e, tripId) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const userString = localStorage.getItem("user");

      if (!token || !userString) {
        alert("Session expirée. Veuillez vous reconnecter.");
        window.location.href = "/login";
        return;
      }

      const user = JSON.parse(userString);
      const selectedTrip = availableTrips.find((trip) => trip.id === tripId);
      
      if (!selectedTrip) {
        throw new Error("Trajet non trouvé.");
      }

      // Validation des données
      const poids = parseFloat(formData.poids);
      if (isNaN(poids) || poids <= 0) {
        throw new Error("Le poids doit être un nombre positif.");
      }

      if (!formData.dimention.trim()) {
        throw new Error("La dimension est requise.");
      }

      const newDemande = await createDemande(token, {
        poids: poids,
        dimention: formData.dimention.trim(),
        annonce: tripId,
      });

      console.log("Demande créée:", newDemande);
      alert("Demande envoyée avec succès!");

      // Réinitialiser le formulaire
      setFormData({ poids: "", dimention: "" });
      setShowFormForTrip(null);

      // Update myRequests if the API returns the new request
      // Also refresh the requests list to get the latest data
      if (newDemande) {
        // Refresh the requests list instead of just adding to state
        // This ensures we get the complete data with populated fields
        const token = localStorage.getItem("token");
        const userString = localStorage.getItem("user");
        if (token && userString) {
          const user = JSON.parse(userString);
          const updatedRequests = await getDemandes(token, user.id);
          setMyRequests(Array.isArray(updatedRequests) ? updatedRequests : []);
        }
      }
    } catch (err) {
      console.error("Erreur lors de la création de la demande :", err.message);
      alert("Erreur : " + err.message);
    }
  };

  const getRequestStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: "En attente", className: "bg-yellow-100 text-yellow-800" },
      accepted: { label: "Accepté", className: "bg-green-100 text-green-800" },
      rejected: { label: "Refusé", className: "bg-red-100 text-red-800" },
      "in-transit": { label: "En transit", className: "bg-blue-100 text-blue-800" },
      delivered: { label: "Livré", className: "bg-purple-100 text-purple-800" },
    };
    const config = statusConfig[status] || statusConfig.pending;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getRequestStatusColor = (status) => {
    const colors = {
      pending: "border-yellow-500",
      accepted: "border-green-500",
      rejected: "border-red-500",
      "in-transit": "border-blue-500",
      delivered: "border-purple-500",
    };
    return colors[status] || "border-gray-500";
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-64">
          <div className="text-lg">Chargement des annonces...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Tableau de bord Expéditeur</h1>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          🔍 Rechercher un trajet
        </Button>
      </div>

      {/* Error display */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Recherche */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Rechercher des trajets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <Input
              placeholder="Ville de départ"
              value={searchFilters.from}
              onChange={(e) => handleSearchFilterChange("from", e.target.value)}
            />
            <Input
              placeholder="Ville d'arrivée"
              value={searchFilters.to}
              onChange={(e) => handleSearchFilterChange("to", e.target.value)}
            />
            <Input
              type="date"
              value={searchFilters.date}
              onChange={(e) => handleSearchFilterChange("date", e.target.value)}
            />
            <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
              Rechercher
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Trajets disponibles */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Trajets disponibles ({availableTrips.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {availableTrips.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Aucun trajet disponible pour le moment.
                </div>
              ) : (
                availableTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-all duration-200"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-bold text-lg">
                          {trip.depart} → {trip.arrivee}
                        </h4>
                        <p className="text-gray-600">📅 {trip.heure}</p>
                        <p className="text-sm text-gray-500">
                          👤 Expéditeur: {trip.expediteurId?.nom || 'N/A'} {trip.expediteurId?.prenom || ''}
                        </p>
                        <p className="text-sm text-gray-500">
                          📦 {trip.poids} kg — {trip.dimention}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600 text-xl">{trip.prix} Dhs</p>
                        <Button
                          size="sm"
                          onClick={() => handleShowForm(trip.id)}
                          className="mt-2 bg-blue-600 hover:bg-blue-700"
                        >
                          {showFormForTrip === trip.id ? 'Annuler' : 'Demander expédition'}
                        </Button>
                      </div>
                    </div>

                    {/* Formulaire conditionnel */}
                    {showFormForTrip === trip.id && (
                      <form
                        onSubmit={(e) => handleSubmitForm(e, trip.id)}
                        className="mt-4 p-4 border rounded bg-gray-50 max-w-md"
                      >
                        <div className="mb-4">
                          <label className="block font-semibold mb-1">Poids (kg)</label>
                          <input
                            type="number"
                            name="poids"
                            value={formData.poids}
                            onChange={handleChange}
                            required
                            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            min="0.1"
                            step="0.1"
                            max={trip.poids} // Don't exceed available capacity
                            placeholder="Ex: 12.5"
                          />
                          <small className="text-gray-500">
                            Capacité disponible: {trip.poids} kg
                          </small>
                        </div>

                        <div className="mb-4">
                          <label className="block font-semibold mb-1">Dimension</label>
                          <input
                            type="text"
                            name="dimention"
                            value={formData.dimention}
                            onChange={handleChange}
                            required
                            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ex: 40x30x20 cm"
                          />
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Envoyer
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            className="text-gray-700 border border-gray-400 hover:bg-gray-200"
                            onClick={() => setShowFormForTrip(null)}
                          >
                            Annuler
                          </Button>
                        </div>
                      </form>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Mes demandes */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>
                Mes demandes ({myRequests.length})
                {requestsLoading && <span className="text-sm font-normal text-gray-500 ml-2">Chargement...</span>}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {requestsLoading ? (
                <div className="text-center py-4 text-gray-500">
                  Chargement des demandes...
                </div>
              ) : myRequests.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Aucune demande pour le moment.
                </div>
              ) : (
                myRequests.map((request) => (
                  <div
                    key={request._id}
                    className={`border-l-4 ${getRequestStatusColor(request.statut || request.status || 'pending')} pl-4`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-semibold">
                        {request.annonce?.depart} → {request.annonce?.arrivee}
                      </p>
                      {getRequestStatusBadge(request.statut || request.status || 'pending')}
                    </div>
                    <p className="text-sm text-gray-600">
                      📦 {request.poids} kg - {request.dimention}
                    </p>
                    <p className="text-sm text-gray-500">
                      🕐 Départ à {request.annonce?.heure}
                    </p>
                    <p className="text-xs text-gray-500">
                      📅 Demandé le {new Date(request.createdAt || request.dateCreation).toLocaleDateString('fr-FR')}
                    </p>
                    <p className="text-xs text-gray-500">
                      👤 Transporteur: {request.annonce?.expediteurId || 'N/A'}
                    </p>
                    {(request.statut === "in-transit" || request.status === "in-transit") && (
                      <Button size="sm" variant="outline" className="mt-2 text-xs">
                        📍 Suivre le colis
                      </Button>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}