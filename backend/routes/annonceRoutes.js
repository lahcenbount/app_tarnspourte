const express = require('express');
const router = express.Router();
const { createAnnonce, getAnnonces } = require('../controllers/annonceController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .get(getAnnonces)
  .post(protect, createAnnonce);

module.exports = router;
