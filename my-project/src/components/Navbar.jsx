import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-green-600 via-green-700 to-emerald-800 shadow-lg backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-white font-bold text-2xl hover:text-green-300 transition-all duration-300 transform hover:scale-105 relative group"
            >
              <span className="relative z-10">Annonces</span>
              <div className="absolute inset-0 bg-white/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></div>
            </Link>

            {user && (
              <div className="hidden md:flex space-x-6">
                <Link
                  to="/demandes"
                  className="text-white/90 hover:text-white transition-all duration-300 py-2 px-3 rounded-lg hover:bg-white/10"
                >
                  Mes demandes
                </Link>

                {user.role === "admin" && (
                  <Link
                    to="/admin-dashboard"
                    className="text-white/90 hover:text-white py-2 px-3 rounded-lg hover:bg-white/10"
                  >
                    Admin Dashboard
                  </Link>
                )}
                {user.role === "conducteur" && (
                  <Link
                    to="/driver-dashboard"
                    className="text-white/90 hover:text-white py-2 px-3 rounded-lg hover:bg-white/10"
                  >
                    Tableau Conducteur
                  </Link>
                )}
                {user.role === "expediteur" && (
                  <Link
                    to="/sender-dashboard"
                    className="text-white/90 hover:text-white py-2 px-3 rounded-lg hover:bg-white/10"
                  >
                    Tableau Expéditeur
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user.nom?.charAt(0)}{user.prenom?.charAt(0)}
                  </div>
                  <span className="text-white font-medium">
                    {user.nom} {user.prenom}
                  </span>
                </div>

                <Link
                  to="/profile"
                  className="text-white/90 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transform hover:scale-105"
                >
                  Profil
                </Link>

                <button
                  onClick={logout}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-red-300 focus:outline-none"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-white/90 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transform hover:scale-105"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium border border-white/30 hover:border-white/50"
                >
                  Inscription
                </Link>
              </div>
            )}
          </div>

          {/* Burger menu - Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-green-300 p-2"
            >
              <div className="space-y-1">
                <div className={`w-6 h-0.5 bg-current transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-current transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-current transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="py-4 space-y-3 border-t border-white/20">
            {user && (
              <>
                <Link
                  to="/demandes"
                  className="block text-white/90 hover:text-white py-2 px-3 rounded-lg hover:bg-white/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mes demandes
                </Link>

                {user.role === "admin" && (
                  <Link
                    to="/admin-dashboard"
                    className="block text-white/90 hover:text-white py-2 px-3 rounded-lg hover:bg-white/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                {user.role === "conducteur" && (
                  <Link
                    to="/driver-dashboard"
                    className="block text-white/90 hover:text-white py-2 px-3 rounded-lg hover:bg-white/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Tableau Conducteur
                  </Link>
                )}
                {user.role === "expediteur" && (
                  <Link
                    to="/sender-dashboard"
                    className="block text-white/90 hover:text-white py-2 px-3 rounded-lg hover:bg-white/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Tableau Expéditeur
                  </Link>
                )}
              </>
            )}

            {user ? (
              <>
                <Link
                  to="/profile"
                  className="block text-white/90 hover:text-white py-2 px-3 rounded-lg hover:bg-white/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profil
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-2 rounded-lg font-medium"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-white/90 hover:text-white py-2 px-3 rounded-lg hover:bg-white/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="block bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg font-medium border border-white/30"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
