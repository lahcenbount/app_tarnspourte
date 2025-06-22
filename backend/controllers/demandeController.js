// backend/controllers/demandeController.js

const Demande = require("../models/Demande");

// ✅ Déclaration des fonctions d'abord
const createDemande = async (req, res) => {
  try {
    const { annonce, poids, dimention } = req.body;
    const demande = new Demande({
      annonce: annonce,
      demandeur: req.user.id,
      poids: poids,
      dimention: dimention,
    });

    const saved = await demande.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la création.", err });
  }
};

const getDemandesUser = async (req, res) => {
  try {
    const demandes = await Demande.find()
      .populate("annonce")
      .populate("demandeur");

    res.json(demandes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors du chargement." });
  }
};

// ✅ Export correct
module.exports = { createDemande, getDemandesUser };
