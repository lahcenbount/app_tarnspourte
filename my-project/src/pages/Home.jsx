import React from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

const HomePage = ({ showPage }) => {
  return (
    <div className="animate-in fade-in duration-300 font-sans bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-24 shadow-lg">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h1 className="text-6xl font-extrabold mb-8 drop-shadow-md">
            Plateforme intelligente de transport collaboratif
          </h1>
          <p className="text-2xl mb-12 tracking-wide drop-shadow-sm">
            Connectez facilement et en toute sécurité les conducteurs et les expéditeurs
          </p>
          <div className="flex justify-center gap-6">
            <Button
              size="lg"
              className="bg-white text-indigo-700 font-semibold shadow-md hover:shadow-xl hover:scale-105 transition-transform rounded-xl px-8 py-4"
              onClick={() => showPage("driver-dashboard")}
              aria-label="Démarrer en tant que conducteur"
            >
              Démarrer en tant que conducteur
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white font-semibold hover:bg-white hover:text-indigo-700 hover:scale-105 transition-transform rounded-xl px-8 py-4"
              onClick={() => showPage("sender_dashboard")}
              aria-label="Trouver un trajet"
            >
              Trouver un trajet
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-20 max-w-6xl">
        <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-800">
          Comment ça fonctionne ?
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[{
            emoji: "📋",
            title: "Publiez votre trajet",
            desc: "Les conducteurs publient leurs trajets avec les détails"
          },{
            emoji: "🔍",
            title: "Recherchez et demandez",
            desc: "Les expéditeurs recherchent et envoient des demandes"
          },{
            emoji: "✅",
            title: "Livraison confirmée",
            desc: "Confirmation de la livraison et évaluation du service"
          }].map(({ emoji, title, desc }) => (
            <Card
              key={title}
              className="rounded-3xl shadow-lg hover:shadow-2xl transition-shadow cursor-pointer bg-white"
              role="region"
              tabIndex={0}
            >
              <CardContent className="p-10 text-center">
                <div
                  className="text-7xl mb-6 select-none"
                  aria-hidden="true"
                >
                  {emoji}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
