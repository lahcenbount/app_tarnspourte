import React from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

const HomePage = ({ showPage }) => {
  return (
    <div className="animate-in fade-in duration-300">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Plateforme intelligente de transport collaboratif</h1>
          <p className="text-xl mb-8">Connectez facilement et en toute sécurité les conducteurs et les expéditeurs</p>
          <div className="flex justify-center space-x-4 space-x-reverse">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => showPage("driver-dashboard")}
            >
              Démarrer en tant que conducteur
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
              onClick={() => showPage("sender-dashboard")}
            >
              Trouver un trajet
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Comment ça fonctionne ?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold mb-4">Publiez votre trajet</h3>
              <p className="text-gray-600">Les conducteurs publient leurs trajets avec les détails</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-4">Recherchez et demandez</h3>
              <p className="text-gray-600">Les expéditeurs recherchent et envoient des demandes</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-4">Livraison confirmée</h3>
              <p className="text-gray-600">Confirmation de la livraison et évaluation du service</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
