const mongoose = require('mongoose');

const annonceSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String },
  proprietaire: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dateCreation: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Annonce', annonceSchema);
