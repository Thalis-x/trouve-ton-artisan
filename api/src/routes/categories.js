const express            = require('express');
const router             = express.Router();
const categorieController = require('../controllers/categorieController');

// GET /api/categories
// Retourne toutes les catégories pour alimenter le menu de navigation
router.get('/', categorieController.getCategories);

module.exports = router;