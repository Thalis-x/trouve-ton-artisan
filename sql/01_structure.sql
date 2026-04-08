-- =============================================================
-- TROUVE TON ARTISAN - Script de création de la base de données
-- Région Auvergne-Rhône-Alpes
-- =============================================================

-- On crée la base si elle n'existe pas encore, et on la sélectionne
CREATE DATABASE IF NOT EXISTS trouve_ton_artisan
  CHARACTER SET utf8mb4       -- utf8mb4 supporte tous les caractères, y compris les emojis et accents
  COLLATE utf8mb4_unicode_ci; -- tri insensible à la casse (a = A = à)

USE trouve_ton_artisan;

-- =============================================================
-- TABLE : categories
-- Représente les 4 grandes catégories d'artisanat
-- Ex : Bâtiment, Services, Fabrication, Alimentation
-- C'est elle qui alimente les liens du menu de navigation
-- =============================================================
CREATE TABLE IF NOT EXISTS categories (
  id  INT          NOT NULL AUTO_INCREMENT, -- clé primaire auto-incrémentée
  nom VARCHAR(100) NOT NULL,                -- nom de la catégorie (ex : "Bâtiment")
  PRIMARY KEY (id),
  UNIQUE KEY uq_categories_nom (nom)        -- un nom de catégorie doit être unique
);

-- =============================================================
-- TABLE : specialites
-- Représente les spécialités rattachées à une catégorie
-- Ex : "Électricien" appartient à "Bâtiment"
-- Règle métier : une spécialité → une seule catégorie
-- =============================================================
CREATE TABLE IF NOT EXISTS specialites (
  id           INT          NOT NULL AUTO_INCREMENT,
  nom          VARCHAR(100) NOT NULL,
  categorie_id INT          NOT NULL, -- clé étrangère vers categories
  PRIMARY KEY (id),
  UNIQUE KEY uq_specialites_nom (nom),
  CONSTRAINT fk_specialites_categorie
    FOREIGN KEY (categorie_id) REFERENCES categories (id)
    ON DELETE RESTRICT   -- on ne peut pas supprimer une catégorie si elle a des spécialités
    ON UPDATE CASCADE    -- si l'id de la catégorie change, la FK se met à jour automatiquement
);

-- =============================================================
-- TABLE : artisans
-- Contient toutes les informations de chaque artisan
-- Règle métier : un artisan → une seule spécialité
-- =============================================================
CREATE TABLE IF NOT EXISTS artisans (
  id            INT            NOT NULL AUTO_INCREMENT,
  nom           VARCHAR(150)   NOT NULL,                    -- nom de l'artisan ou de l'entreprise
  note          DECIMAL(2, 1)  NOT NULL DEFAULT 0.0,        -- note sur 5 avec 1 décimale (ex : 4.5)
  ville         VARCHAR(100)   NOT NULL,
  a_propos      TEXT,                                        -- description longue, peut être NULL
  email         VARCHAR(150)   NOT NULL,
  site_web      VARCHAR(255),                                -- URL du site, optionnelle
  photo         VARCHAR(255),                                -- chemin vers la photo, optionnelle
  top           TINYINT(1)     NOT NULL DEFAULT 0,           -- 1 = artisan du mois, 0 = non
  specialite_id INT            NOT NULL,                     -- clé étrangère vers specialites
  created_at    TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_artisans_specialite
    FOREIGN KEY (specialite_id) REFERENCES specialites (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  -- Index sur specialite_id pour accélérer les jointures et filtres
  INDEX idx_artisans_specialite (specialite_id),
  -- Index sur top pour accélérer la requête "artisans du mois"
  INDEX idx_artisans_top (top),
  -- Vérification que la note est bien entre 0 et 5
  CONSTRAINT chk_note CHECK (note >= 0 AND note <= 5)
);
