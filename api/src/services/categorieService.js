const { Categorie } = require('../models');

// Récupère toutes les catégories
// Utilisé pour alimenter le menu de navigation depuis la BDD
const getAllCategories = async () => {
  return await Categorie.findAll({
    order: [['nom', 'ASC']], // ordre alphabétique
  });
};

module.exports = { getAllCategories };