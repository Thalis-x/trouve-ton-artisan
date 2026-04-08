const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


// Ce modèle représente la table "specialites" en base de données
const Specialite = sequelize.define('Specialite', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  categorie_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'specialites', // nom exact de la table dans MySQL
  timestamps: false, // on n'a pas de createdAt/updatedAt dans cette table
});

module.exports = Specialite;