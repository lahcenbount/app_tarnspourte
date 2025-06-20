const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { secret } = require('../config/jwtConfig');

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Pas de token, accès refusé' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = await User.findById(decoded.id).select('-motDePasse');
    if (!req.user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide' });
  }
};

module.exports = { protect };
