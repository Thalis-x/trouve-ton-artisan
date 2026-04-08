//Fichier qui définit les associations entre les tables (l'équivalent des clés étrangères en JavaScript)

const Categorie = require('./categorie');
const Specialite = require('./specialite');
const Artisan    = require('./artisan');

// Une catégorie a plusieurs spécialités
// C'est l'équivalent JS de la FK categorie_id dans la table specialites
Categorie.hasMany(Specialite, {
  foreignKey: 'categorie_id',
  as: 'specialites',
});
Specialite.belongsTo(Categorie, {
  foreignKey: 'categorie_id',
  as: 'categorie',
});

// Une spécialité a plusieurs artisans
Specialite.hasMany(Artisan, {
  foreignKey: 'specialite_id',
  as: 'artisans',
});
Artisan.belongsTo(Specialite, {
  foreignKey: 'specialite_id',
  as: 'specialite',
});

module.exports = { Categorie, Specialite, Artisan };