const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Ce modèle représente la table "categories" en base de données
const Categorie = sequelize.define('Categorie', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  tableName: 'categories', // nom exact de la table dans MySQL
  timestamps: false,       // on n'a pas de createdAt/updatedAt dans cette table
});

module.exports = Categorie;