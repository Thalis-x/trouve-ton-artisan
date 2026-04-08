const artisanService = require('../services/artisanService');

// Répond à GET /api/artisans/top
const getTopArtisans = async (req, res, next) => {
  try {
    const artisans = await artisanService.getTopArtisans();
    res.json(artisans);
  } catch (err) {
    next(err);
  }
};

// Répond à GET /api/artisans
// Accepte les query params : ?categorie=batiment et ?search=dumont
const getAllArtisans = async (req, res, next) => {
  try {
    const { categorie, search } = req.query;
    const artisans = await artisanService.getAllArtisans({ categorie, search });
    res.json(artisans);
  } catch (err) {
    next(err);
  }
};

// Répond à GET /api/artisans/:id
const getArtisanById = async (req, res, next) => {
  try {
    const artisan = await artisanService.getArtisanById(req.params.id);
    // Si l'artisan n'existe pas en BDD, on renvoie un 404 propre
    if (!artisan) {
      return res.status(404).json({ error: 'Artisan non trouvé.' });
    }
    res.json(artisan);
  } catch (err) {
    next(err);
  }
};

module.exports = { getTopArtisans, getAllArtisans, getArtisanById };