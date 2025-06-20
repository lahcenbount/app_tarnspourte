const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { secret, expiresIn } = require('../config/jwtConfig');

// Fonction pour générer un token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, secret, { expiresIn });
};

// Contrôleur d'inscription
const register = async (req, res, next) => {
  try {
    const { nom, prenom, email, motDePasse, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    const user = await User.create({ nom, prenom, email, motDePasse, role });

    res.status(201).json({
      user: {
        _id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role
      },
      token: generateToken(user._id)
    });
  } catch (error) {
    next(error);
  }
};

// Contrôleur de connexion
const login = async (req, res, next) => {
  try {
    const { email, motDePasse } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email ou mot de passe invalide" });
    }

    const isMatch = await user.comparePassword(motDePasse);
    if (!isMatch) {
      return res.status(401).json({ message: "Email ou mot de passe invalide" });
    }

    res.json({
      user: {
        _id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role
      },
      token: generateToken(user._id)
    });
  } catch (error) {
    next(error);
  }
};

// Export des fonctions
module.exports = {
  register,
  login
};
