import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { getAnnonces } from "../services/annonceService";
import { getAllDemandes } from "../services/demandeService"; // ✅ Import
import { useNavigate } from "react-router-dom";

export default function DriverDashboard() {
  const [publishedTrips, setPublishedTrips] = useState([]);
  const [newRequests, setNewRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        if (!token) {
          setError("Utilisateur non authentifié");
          navigate("/login");
          return;
        }

        const user_json = JSON.parse(user);

        // ✅ 1. Récupérer les annonces du chauffeur
        const annonces = await getAnnonces(token, user_json._id);

        const annonceIds = annonces.map(a => a._id);

        setPublishedTrips(
          annonces.map((a) => ({
            id: a._id,
            route: `${a.depart} → ${a.arrivee}`,
            date: new Date(a.dateCreation).toLocaleString("fr-FR", {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }),
            capacity: `${a.poids} kg | ${a.dimention}`,
            prix: a.prix,
            status: "active",
            requestCount: 0,
            heure: a.heure
          }))
        );

        // ✅ 2. Récupérer toutes les demandes
        const demandes = await getAllDemandes(token);

        // ✅ 3. Filtrer les demandes liées aux annonces du chauffeur
        // Filtrer par expediteurId sur l'annonce
        const filteredByExpediteur = demandes.filter((d) =>
          d.annonce.expediteurId === user_json._id
        );


        // ✅ 4. Préparer les données à afficher
        setNewRequests(
          filteredByExpediteur.map((d) => ({
            id: d._id,
            route: `${d.annonce.depart} → ${d.annonce.arrivee}`,
            description: `${d.poids} kg - ${d.dimention}`,
            sender: `${d.demandeur.prenom} ${d.demandeur.nom}`,
          }))
        );

      } catch (e) {
        console.error("Erreur lors du chargement des données:", e);
        if (e.message.includes("authentification") || e.message.includes("token")) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        } else {
          setError(e.message || "Erreur lors du chargement des données");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [navigate]);

  const handleAcceptRequest = (requestId) => {
    console.log("Demande acceptée:", requestId);
    // TODO: Appeler l'API pour accepter la demande
  };

  const handleRejectRequest = (requestId) => {
    console.log("Demande refusée:", requestId);
    // TODO: Appeler l'API pour refuser la demande
  };

  const handleAddNewTrip = () => {
    navigate("/create-annonce");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { label: "Actif", className: "bg-green-100 text-green-800" },
      scheduled: { label: "Programmé", className: "bg-blue-100 text-blue-800" },
      completed: { label: "Terminé", className: "bg-gray-100 text-gray-800" },
    };

    const config = statusConfig[status] || statusConfig.active;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg">Chargement des données...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Réessayer</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Tableau de bord Chauffeur</h1>
          <p className="text-gray-600 mt-2">Gérez vos trajets et les demandes d'expédition</p>
        </div>
        <div className="flex space-x-4">
          <Button 
            onClick={handleAddNewTrip}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition"
          >
            + Ajouter un nouveau trajet
          </Button>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="border-red-300 text-red-600 hover:bg-red-50"
          >
            Déconnexion
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">{publishedTrips.length}</div>
            <p className="text-gray-600">Trajets actifs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">{newRequests.length}</div>
            <p className="text-gray-600">Nouvelles demandes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-purple-600">0</div>
            <p className="text-gray-600">Trajets terminés</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Nouvelles demandes */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                Nouvelles demandes
                {newRequests.length > 0 && (
                  <Badge className="ml-2 bg-red-100 text-red-800">
                    {newRequests.length}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {newRequests.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Aucune nouvelle demande</p>
              ) : (
                newRequests.map((request) => (
                  <div key={request.id} className="border-l-4 border-blue-500 pl-4 bg-blue-50 p-3 rounded-r">
                    <p className="font-semibold">Demande d&apos;expédition - {request.route}</p>
                    <p className="text-sm text-gray-600">{request.description}</p>
                    <p className="text-xs text-gray-500">De: {request.sender}</p>
                    <div className="flex space-x-2 mt-3">
                      <Button
                        size="sm"
                        onClick={() => handleAcceptRequest(request.id)}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        Accepter
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRejectRequest(request.id)}
                      >
                        Refuser
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Trajets publiés */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Mes trajets publiés</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {publishedTrips.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Aucun trajet publié</p>
                  <Button 
                    onClick={handleAddNewTrip}
                    className="bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    Publier votre premier trajet
                  </Button>
                </div>
              ) : (
                publishedTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-bold text-lg">{trip.route}</h4>
                        <p className="text-gray-600">Publié le: {trip.date}</p>
                        {trip.heure && (
                          <p className="text-sm text-blue-600">Date de départ: {trip.heure}</p>
                        )}
                        <p className="text-sm text-gray-500">Capacité disponible: {trip.capacity}</p>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(trip.status)}
                        <p className="text-sm text-gray-600 mt-1">{trip.requestCount} demande(s)</p>
                        <p className="text-sm text-green-600 font-medium">{trip.prix} Dhs</p>
                      </div>
                    </div>
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
