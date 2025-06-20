import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Annonces from "./pages/Annonces";
import Profile from "./pages/Profile";
import Demandes from "./pages/Demandes";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import SenderDashboard from "./pages/SenderDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import { useAuth } from "./context/AuthContext";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto mt-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/demandes" element={<PrivateRoute><Demandes /></PrivateRoute>} />

          {/* Nouveaux tableaux de bord */}
          <Route path="/admin-dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
          <Route path="/sender-dashboard" element={<PrivateRoute><SenderDashboard /></PrivateRoute>} />
          <Route path="/driver-dashboard" element={<PrivateRoute><DriverDashboard /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}
