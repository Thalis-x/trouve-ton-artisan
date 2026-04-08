const express           = require('express');
const router            = express.Router();
const artisanController = require('../controllers/artisanController');

// GET /api/artisans/top
// Cette route DOIT être avant /:id
// Sinon Express croit que "top" est un id
router.get('/top', artisanController.getTopArtisans);

// GET /api/artisans
// GET /api/artisans?categorie=batiment
// GET /api/artisans?search=dumont
router.get('/', artisanController.getAllArtisans);

// GET /api/artisans/1
router.get('/:id', artisanController.getArtisanById);

module.exports = router;