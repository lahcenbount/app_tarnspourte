const Annonce = require('../models/Annonce');

// Créer une annonce
const createAnnonce = async (req, res, next) => {
  try {
    const {
      depart,
      arrivee,
      poids,
      dimention,
      heure,
      prix,
      description
    } = req.body;

    const annonce = await Annonce.create({
      depart,
      arrivee,
      poids,
      dimention,
      heure,
      prix,
      description,
      expediteurId: req.user._id
    });

    res.status(201).json(annonce);
  } catch (error) {
    next(error);
  }
};

// Lister toutes les annonces (avec filtrage optionnel par expediteurId)
const getAnnonces = async (req, res, next) => {
  try {
    const { expediteurId } = req.query;

    // Construire un filtre dynamique
    const filter = {};
    if (expediteurId) {
      filter.expediteurId = expediteurId;
    }

    const annonces = await Annonce.find(filter)
      .populate('expediteurId', 'nom prenom email')
      .sort({ createdAt: -1 });

    res.json(annonces);
  } catch (error) {
    next(error);
  }
};

module.exports = { createAnnonce, getAnnonces };

