const mongoose = require('mongoose');

const demandeSchema = new mongoose.Schema({
  annonce: { type: mongoose.Schema.Types.ObjectId, ref: 'Annonce', required: true },
  demandeur: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  poids: { type: Number, required: true },       // ✅ Poids en kg (par exemple)
  dimention: { type: String, required: true },   // ✅ Dimension)

  dateCreation: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Demande', demandeSchema);
