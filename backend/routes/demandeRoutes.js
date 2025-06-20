const express = require('express');
const router = express.Router();
const { createDemande, getDemandesUser } = require('../controllers/demandeController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .post(protect, createDemande)
  .get(protect, getDemandesUser);

module.exports = router;
