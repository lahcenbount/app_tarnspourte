require('dotenv').config();
const express = require('express');
const cors = require('cors'); // ✅ Ajouter cette ligne
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const annonceRoutes = require('./routes/annonceRoutes');
const demandeRoutes = require('./routes/demandeRoutes');
const { errorHandler } = require('./middlewares/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connexion à MongoDB
connectDB();

// ✅ Middlewares
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Autoriser uniquement le frontend
app.use(express.json());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/annonces', annonceRoutes);
app.use('/api/demandes', demandeRoutes);

// ✅ Middleware de gestion des erreurs
app.use(errorHandler);

// ✅ Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
