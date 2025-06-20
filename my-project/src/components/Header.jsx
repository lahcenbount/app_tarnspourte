// src/components/Header.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Header = () => {
  const { currentUser, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">ColisPartage</Link>
        
        <nav className="hidden md:flex space-x-6">
          {currentUser?.role === 'driver' && <Link to="/driver">Espace Conducteur</Link>}
          {currentUser?.role === 'sender' && <Link to="/sender">Espace Expéditeur</Link>}
          {currentUser?.role === 'admin' && <Link to="/admin">Administration</Link>}
          <Link to="/profile">Profil</Link>
        </nav>

        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <span>Bonjour, {currentUser.firstName}</span>
              <button 
                onClick={handleLogout}
                className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100">
              Connexion
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;