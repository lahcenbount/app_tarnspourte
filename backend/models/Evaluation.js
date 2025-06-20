const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
  evaluateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  evalue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  annonce: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Annonce'
  },
  demande: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Demande'
  },
  note: {
    type: Number,
    required: [true, 'La note est requise'],
    min: [1, 'La note minimum est 1'],
    max: [5, 'La note maximum est 5']
  },
  commentaire: {
    type: String,
    trim: true,
    maxlength: [500, 'Le commentaire ne peut pas dépasser 500 caractères']
  },
  criteres: {
    communication: { type: Number, min: 1, max: 5 },
    ponctualite: { type: Number, min: 1, max: 5 },
    qualite: { type: Number, min: 1, max: 5 },
    conformite: { type: Number, min: 1, max: 5 }
  },
  typeTransaction: {
    type: String,
    enum: ['achat', 'vente', 'service'],
    required: true
  },
  statut: {
    type: String,
    enum: ['active', 'cachee', 'signale'],
    default: 'active'
  },
  signalements: [{
    utilisateur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    raison: {
      type: String,
      enum: ['inapproprie', 'faux', 'spam', 'autre']
    },
    commentaire: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  reponseProprietaire: {
    texte: {
      type: String,
      maxlength: [300, 'La réponse ne peut pas dépasser 300 caractères']
    },
    date: {
      type: Date,
      default: Date.now
    }
  }
}, {
  timestamps: true
});

// ✅ Index pour éviter les évaluations en double
evaluationSchema.index(
  { evaluateur: 1, evalue: 1, annonce: 1 },
  { unique: true, partialFilterExpression: { annonce: { $exists: true } } }
);

evaluationSchema.index(
  { evaluateur: 1, evalue: 1, demande: 1 },
  { unique: true, partialFilterExpression: { demande: { $exists: true } } }
);

// ✅ Autres index utiles
evaluationSchema.index({ evalue: 1, statut: 1 });
evaluationSchema.index({ evaluateur: 1 });
evaluationSchema.index({ note: 1 });
evaluationSchema.index({ createdAt: -1 });

// ✅ Validation personnalisée
evaluationSchema.pre('save', function (next) {
  if (!this.annonce && !this.demande) {
    return next(new Error('Une évaluation doit être liée soit à une annonce soit à une demande.'));
  }
  next();
});

const Evaluation = mongoose.model('Evaluation', evaluationSchema);

module.exports = Evaluation;
