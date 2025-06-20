const Annonce = require('../models/Annonce');

// Créer une annonce
const createAnnonce = async (req, res, next) => {
  try {
    const { titre, description } = req.body;
    const annonce = await Annonce.create({
      titre,
      description,
      proprietaire: req.user._id
    });
    res.status(201).json(annonce);
  } catch (error) {
    next(error);
  }
};

// Lister toutes les annonces
const getAnnonces = async (req, res, next) => {
  try {
    const annonces = await Annonce.find().populate('proprietaire', 'nom prenom email');
    res.json(annonces);
  } catch (error) {
    next(error);
  }
};

module.exports = { createAnnonce, getAnnonces };
