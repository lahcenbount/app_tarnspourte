const Demande = require('../models/Demande');

// Créer une demande pour une annonce
const createDemande = async (req, res, next) => {
  try {
    const { annonceId } = req.body;
    if (!annonceId) {
      return res.status(400).json({ message: 'Annonce ID requis' });
    }
    const demande = await Demande.create({
      annonce: annonceId,
      demandeur: req.user._id
    });
    res.status(201).json(demande);
  } catch (error) {
    next(error);
  }
};

// Lister les demandes d'un utilisateur
const getDemandesUser = async (req, res, next) => {
  try {
    const demandes = await Demande.find({ demandeur: req.user._id })
      .populate('annonce')
      .populate('demandeur', 'nom prenom email');
    res.json(demandes);
  } catch (error) {
    next(error);
  }
};

module.exports = { createDemande, getDemandesUser };
