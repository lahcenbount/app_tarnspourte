const User = require('../models/User');

// Récupérer profil utilisateur connecté
const getProfile = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Non authentifié' });
    }
    res.json(req.user);
  } catch (error) {
    next(error);
  }
};

module.exports = { getProfile };
