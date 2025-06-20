const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },
  role: { type: String,
     enum: ['user', 'admin'],
      default: 'user' },
}, { timestamps: true });

// Hash du mot de passe avant sauvegarde
userSchema.pre('save', async function(next) {
  if (!this.isModified('motDePasse')) return next();
  this.motDePasse = await bcrypt.hash(this.motDePasse, 10);
  next();
});

// Méthode pour comparer mot de passe
userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.motDePasse);
};

module.exports = mongoose.model('User', userSchema);
