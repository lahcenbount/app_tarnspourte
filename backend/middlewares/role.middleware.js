// Middleware pour autoriser certains rôles
const autoriserRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Utilisateur non authentifié'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Rôle ${req.user.role} non autorisé pour cette action`
      });
    }

    next();
  };
};

// Middleware pour vérifier si l'utilisateur est admin
const estAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Utilisateur non authentifié'
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Accès réservé aux administrateurs'
    });
  }

  next();
};

// Middleware pour vérifier si l'utilisateur peut accéder à une ressource
const peutAcceder = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Utilisateur non authentifié'
    });
  }

  // L'admin peut accéder à tout
  if (req.user.role === 'admin') {
    return next();
  }

  // Pour les autres, vérifier s'ils sont propriétaires de la ressource
  const resourceUserId = req.params.userId || req.body.userId || req.user._id;
  
  if (req.user._id.toString() !== resourceUserId.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Accès non autorisé à cette ressource'
    });
  }

  next();
};

// Middleware pour vérifier la propriété d'une annonce
const estProprietaireAnnonce = async (req, res, next) => {
  try {
    const Annonce = require('../models/Annonce');
    const annonce = await Annonce.findById(req.params.id);

    if (!annonce) {
      return res.status(404).json({
        success: false,
        message: 'Annonce non trouvée'
      });
    }

    // L'admin peut modifier toutes les annonces
    if (req.user.role === 'admin') {
      return next();
    }

    // Vérifier si l'utilisateur est le propriétaire
    if (annonce.proprietaire.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Vous n\'êtes pas autorisé à modifier cette annonce'
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la vérification de propriété'
    });
  }
};

// Middleware pour vérifier la propriété d'une demande
const estProprietaireDemande = async (req, res, next) => {
  try {
    const Demande = require('../models/Demande');
    const demande = await Demande.findById(req.params.id);

    if (!demande) {
      return res.status(404).json({
        success: false,
        message: 'Demande non trouvée'
      });
    }

    // L'admin peut modifier toutes les demandes
    if (req.user.role === 'admin') {
      return next();
    }

    // Vérifier si l'utilisateur est le demandeur
    if (demande.demandeur.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Vous n\'êtes pas autorisé à modifier cette demande'
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la vérification de propriété'
    });
  }
};

module.exports = {
  autoriserRoles,
  estAdmin,
  peutAcceder,
  estProprietaireAnnonce,
  estProprietaireDemande
};