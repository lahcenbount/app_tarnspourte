const mongoose = require('mongoose');

const demandeSchema = new mongoose.Schema({
  annonce: { type: mongoose.Schema.Types.ObjectId, ref: 'Annonce', required: true },
  demandeur: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  statut: { type: String, enum: ['en attente', 'acceptée', 'refusée'], default: 'en attente' },
  dateCreation: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Demande', demandeSchema);
