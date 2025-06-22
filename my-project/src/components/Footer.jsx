import React from "react";

const Footer = () => {
  return (
    <footer className="bg-indigo-700 text-white py-12 mt-20">
      <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">À propos</h3>
          <p className="text-gray-200 leading-relaxed">
            Plateforme intelligente de transport collaboratif facilitant la connexion entre conducteurs et expéditeurs.
          </p>
        </div>

        {/* Quick Links */}
        <nav aria-label="Liens rapides">
          <h3 className="text-xl font-bold mb-4">Liens rapides</h3>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => window.scrollTo(0, 0)}
                className="hover:underline focus:outline-none"
              >
                Accueil
              </button>
            </li>
            <li>
              <button
                onClick={() => alert("Naviguer vers Conducteur")}
                className="hover:underline focus:outline-none"
              >
                Conducteur
              </button>
            </li>
            <li>
              <button
                onClick={() => alert("Naviguer vers Expéditeur")}
                className="hover:underline focus:outline-none"
              >
                Expéditeur
              </button>
            </li>
            <li>
              <button
                onClick={() => alert("Naviguer vers Contact")}
                className="hover:underline focus:outline-none"
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>

        {/* Contact & Social */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact</h3>
          <address className="not-italic mb-6 text-gray-200">
            123 Rue de Transport<br />
            Casablanca, Maroc<br />
            Téléphone: +212 600 000 000<br />
            Email: contact@transportcollab.com
          </address>
        </div>
      </div>

      <div className="border-t border-indigo-600 mt-12 pt-6 text-center text-gray-300 text-sm select-none">
        &copy; {new Date().getFullYear()} Plateforme intelligente de transport collaboratif. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
