import React, { useState, useEffect } from "react";
import { Menu, X, Home, LogIn, UserPlus, Truck, Package, Shield, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Simule un état d'authentification
  const [user, setUser] = useState(null); // null = non connecté, ou un objet user

  const navigate = useNavigate();

  // Exemple : récupérer l'user depuis localStorage (ou un contexte auth)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    // Suppression des infos user (token, etc)
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  // Définir les items communs
  const navItemsCommon = [
    { key: "HOME", label: "Accueil", icon: Home, to: "/" },
  ];

  // Items affichés quand utilisateur non connecté
  const navItemsLoggedOut = [
    { key: "LOGIN", label: "Connexion", icon: LogIn, to: "/login" },
    { key: "REGISTER", label: "Inscription", icon: UserPlus, to: "/register" },
  ];

  // Items affichés quand connecté (exemple ici : tous les dashboards)
  const navItemsLoggedIn = [
    // { key: "DRIVER_DASHBOARD", label: "Tableau Chauffeur", icon: Truck, to: "/driver_dashboard" },
    // { key: "SENDER_DASHBOARD", label: "Tableau Expéditeur", icon: Package, to: "/sender_dashboard" },
    // { key: "ADMIN_DASHBOARD", label: "Tableau Admin", icon: Shield, to: "/admin-dashboard" },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer">
              Transport
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {[...navItemsCommon,
                ...(user ? navItemsLoggedIn : navItemsLoggedOut)
              ].map(({ key, label, icon: Icon, to }) => (
                <NavLink
                  key={key}
                  to={to}
                  end
                  className={({ isActive }) =>
                    `
                    px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out
                    flex items-center space-x-2 hover:scale-105 transform
                    ${isActive
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }
                  `
                  }
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </NavLink>
              ))}

              {/* Bouton déconnexion si connecté */}
              {user && (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-100 flex items-center space-x-2"
                >
                  <LogOut size={16} />
                  <span>Déconnexion</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              aria-label={isMobileMenuOpen ? "Fermer menu" : "Ouvrir menu"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
              {[...navItemsCommon,
                ...(user ? navItemsLoggedIn : navItemsLoggedOut)
              ].map(({ key, label, icon: Icon, to }) => (
                <NavLink
                  key={key}
                  to={to}
                  end
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `
                    w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium
                    transition-all duration-200 ease-in-out
                    ${isActive
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }
                  `
                  }
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </NavLink>
              ))}

              {/* Bouton déconnexion mobile */}
              {user && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-100"
                >
                  <LogOut size={18} />
                  <span>Déconnexion</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
