// Importation de Sequelize
const { Sequelize } = require('sequelize');

// On crée une instance Sequelize avec les infos du fichier .env
const sequelize = new Sequelize(
  process.env.DB_NAME,     // nom de la BDD
  process.env.DB_USER,     // utilisateur MySQL
  process.env.DB_PASSWORD, // mot de passe
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',       // on précise qu'on utilise MySQL
    logging: false,         // désactive les logs SQL dans le terminal (plus lisible)
     pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,    // libère les connexions inactives après 10 secondes
    },
    dialectOptions: {
      connectTimeout: 60000, // attend 60 secondes avant de timeout
    },
  }
);

module.exports = sequelize;