// Chargement des variables d'environnement en tout premier
require('dotenv').config();

const express    = require('express');
const cors       = require('cors');
const helmet     = require('helmet');
const rateLimit  = require('express-rate-limit');
const sequelize  = require('./src/config/database');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Sécurité ──────────────────────────────────────────────
// Helmet ajoute des headers HTTP de sécurité automatiquement
app.use(helmet());

// CORS : autorise uniquement le frontend React à appeler l'API
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
}));

// Rate limiting : max 100 requêtes par 15 minutes par IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Trop de requêtes, veuillez réessayer plus tard.' },
});
app.use(limiter);

// ── Parsing ───────────────────────────────────────────────
// Permet à Express de lire le JSON dans le body des requêtes
app.use(express.json());

// ── Routes ────────────────────────────────────────────────
const categoriesRouter = require('./src/routes/categories');
const artisansRouter   = require('./src/routes/artisans');

app.use('/api/categories', categoriesRouter);
app.use('/api/artisans',   artisansRouter);

// ── Route 404 pour les endpoints inexistants ──────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint non trouvé.' });
});

// ── Gestion globale des erreurs ───────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur interne du serveur.' });
});

// ── Connexion BDD puis démarrage du serveur ───────────────
const connectWithRetry = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion MySQL réussie');
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Connexion échouée, nouvelle tentative dans 5 secondes...', err.message);
    setTimeout(connectWithRetry, 5000);
  }
};

connectWithRetry();