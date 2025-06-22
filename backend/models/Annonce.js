const mongoose = require('mongoose');

const annonceSchema = new mongoose.Schema({
  expediteurId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  depart: {
    type: String,
    required: true,
  },
  arrivee: {
    type: String,
    required: true,
  },
  poids: {
    type: Number, // en kg
    required: true,
  },
  dimention: {
    type: String, // ex: "50x30x20"
    required: true,
  },
  heure: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  prix: {
    type: Number,
    default: 0,
    required: true,
  },
  dateCreation: {
    type: Date,
    default: Date.now,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Annonce', annonceSchema);
