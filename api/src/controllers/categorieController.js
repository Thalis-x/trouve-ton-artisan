const categorieService = require('../services/categorieService');

// Répond à GET /api/categories
const getCategories = async (req, res, next) => {
  try {
    const categories = await categorieService.getAllCategories();
    res.json(categories);
  } catch (err) {
    // On passe l'erreur au middleware de gestion d'erreurs de server.js
    next(err);
  }
};

module.exports = { getCategories };