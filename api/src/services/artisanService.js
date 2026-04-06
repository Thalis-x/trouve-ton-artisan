const { Op }      = require('sequelize');
const { Artisan, Specialite, Categorie } = require('../models');

// Champs à inclure dans toutes les requêtes "liste"
// On exclut a_propos et created_at pour alléger la réponse
const ARTISAN_LIST_FIELDS = [
  'id', 'nom', 'note', 'ville', 'photo', 'top', 'specialite_id'
];

// Inclusion Sequelize pour récupérer la spécialité ET la catégorie
// en une seule requête (jointure automatique)
const INCLUDE_SPECIALITE = {
  model: Specialite,
  as: 'specialite',
  attributes: ['id', 'nom'],
  include: [{
    model: Categorie,
    as: 'categorie',
    attributes: ['id', 'nom'],
  }],
};

// ── Récupère les 3 artisans du mois (top = 1) ────────────
// Utilisé sur la page d'accueil
const getTopArtisans = async () => {
  return await Artisan.findAll({
    where: { top: 1 },
    attributes: ARTISAN_LIST_FIELDS,
    include: [INCLUDE_SPECIALITE],
    limit: 3,
  });
};

// ── Récupère tous les artisans avec filtres optionnels ────
// - par slug de catégorie (ex: "batiment")
// - par recherche sur le nom
const getAllArtisans = async ({ categorie, search } = {}) => {
  // Construction dynamique du filtre WHERE
  const where = {};

  // Filtre par nom si une recherche est tapée
  if (search) {
    where.nom = { [Op.like]: `%${search}%` };
  }

  // Filtre par catégorie si un slug est fourni
  // On adapte le slug URL vers le nom en BDD
  // ex: "batiment" → "Bâtiment"
  const categorieFilter = {};
  if (categorie) {
    const slugMap = {
      'batiment'    : 'Bâtiment',
      'services'    : 'Services',
      'fabrication' : 'Fabrication',
      'alimentation': 'Alimentation',
    };
    const nomCategorie = slugMap[categorie.toLowerCase()];
    if (nomCategorie) {
      categorieFilter.nom = nomCategorie;
    }
  }

  return await Artisan.findAll({
    where,
    attributes: ARTISAN_LIST_FIELDS,
    include: [{
      model: Specialite,
      as: 'specialite',
      attributes: ['id', 'nom'],
      include: [{
        model: Categorie,
        as: 'categorie',
        attributes: ['id', 'nom'],
        where: Object.keys(categorieFilter).length ? categorieFilter : undefined,
      }],
    }],
    order: [['nom', 'ASC']],
  });
};

// ── Récupère un artisan par son id (fiche complète) ───────
const getArtisanById = async (id) => {
  return await Artisan.findByPk(id, {
    include: [INCLUDE_SPECIALITE],
  });
};

module.exports = { getTopArtisans, getAllArtisans, getArtisanById };