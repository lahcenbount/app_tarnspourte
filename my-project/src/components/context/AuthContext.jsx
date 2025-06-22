import { createContext, useContext, useState, useEffect } from "react";
import { getProfile } from "../services/userService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Fonction pour vérifier si le token est valide (optionnel: vérifier l'expiration)
  const isTokenValid = (tokenToCheck) => {
    if (!tokenToCheck) return false;
    
    try {
      // Si votre token est un JWT, vous pouvez décoder et vérifier l'expiration
      // const payload = JSON.parse(atob(tokenToCheck.split('.')[1]));
      // const now = Date.now() / 1000;
      // return payload.exp > now;
      
      // Pour l'instant, on considère que le token est valide s'il existe
      return true;
    // eslint-disable-next-line no-unreachable
    } catch (error) {
      console.error("Erreur lors de la validation du token:", error);
      return false;
    }
  };

  // Fonction pour récupérer et valider le token depuis localStorage
  const getStoredToken = () => {
    try {
      const storedToken = localStorage.getItem("token");
      if (storedToken && isTokenValid(storedToken)) {
        return storedToken;
      }
      // Si le token n'est pas valide, le supprimer
      if (storedToken) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
      return null;
    } catch (error) {
      console.error("Erreur lors de la récupération du token:", error);
      return null;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      
      try {
        const storedToken = getStoredToken();
        
        if (storedToken) {
          setToken(storedToken);
          
          // Essayer de récupérer le profil utilisateur
          try {
            const userProfile = await getProfile(storedToken);
            setUser(userProfile);
          } catch (profileError) {
            console.error("Erreur lors de la récupération du profil:", profileError);
            
            // Si erreur d'authentification, nettoyer le localStorage
            if (profileError.message.includes("authentification") || 
                profileError.message.includes("token") ||
                profileError.message.includes("401")) {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              setToken(null);
              setUser(null);
            }
          }
        } else {
          // Pas de token valide, vérifier s'il y a des données utilisateur stockées
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            try {
              const userData = JSON.parse(storedUser);
              // Si on a des données utilisateur mais pas de token valide, nettoyer
              localStorage.removeItem("user");
            } catch (error) {
              console.error("Erreur lors du parsing des données utilisateur:", error);
              localStorage.removeItem("user");
            }
          }
        }
      } catch (error) {
        console.error("Erreur lors de l'initialisation de l'authentification:", error);
        // En cas d'erreur, nettoyer le localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (userData, userToken) => {
    try {
      if (!userToken || !userData) {
        throw new Error("Token ou données utilisateur manquants");
      }

      // Stocker le token
      localStorage.setItem("token", userToken);
      setToken(userToken);
      
      // Stocker les données utilisateur
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      
      console.log("Utilisateur connecté avec succès:", userData);
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error;
    }
  };

  const logout = () => {
    try {
      // Nettoyer le localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      
      // Réinitialiser l'état
      setToken(null);
      setUser(null);
      
      console.log("Utilisateur déconnecté");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  const updateUser = (userData) => {
    try {
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données utilisateur:", error);
    }
  };

  // Fonction pour obtenir le token actuel
  const getToken = () => {
    return token || getStoredToken();
  };

  // Fonction pour vérifier si l'utilisateur est authentifié
  const isAuthenticated = () => {
    return !!user && !!getToken();
  };

  // Fonction pour vérifier le rôle de l'utilisateur
  const hasRole = (role) => {
    return user?.role === role;
  };

  const contextValue = {
    user,
    token: getToken(),
    loading,
    login,
    logout,
    updateUser,
    getToken,
    isAuthenticated,
    hasRole
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }
  
  return context;
}

// Hook personnalisé pour vérifier l'authentification
export function useRequireAuth() {
  const { isAuthenticated, loading } = useAuth();
  
  return {
    isAuthenticated: isAuthenticated(),
    loading
  };
}

// Hook personnalisé pour les rôles
export function useRole(requiredRole) {
  const { hasRole, isAuthenticated, loading } = useAuth();
  
  return {
    hasRequiredRole: hasRole(requiredRole),
    isAuthenticated: isAuthenticated(),
    loading
  };
}