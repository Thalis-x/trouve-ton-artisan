const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Ce modèle représente la table "artisans" en base de données
const Artisan = sequelize.define('Artisan', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  note: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: false,
    defaultValue: 0.0,
  },
  ville: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  a_propos: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  site_web: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  photo: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  top: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
  },
  specialite_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'artisans', // nom exact de la table dans MySQL
  timestamps: false,     // on n'a pas de createdAt/updatedAt dans cette table
});

module.exports = Artisan;