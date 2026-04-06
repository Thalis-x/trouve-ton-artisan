-- =============================================================
-- TROUVE TON ARTISAN - Script d'alimentation de la base de données
-- Source : fichier data.xlsx fourni par la région Auvergne-Rhône-Alpes
-- À exécuter APRÈS le script 01_structure.sql
-- =============================================================

USE trouve_ton_artisan;

-- =============================================================
-- INSERTION DES CATÉGORIES
-- Les 4 grandes catégories d'artisanat de la région
-- =============================================================
INSERT INTO categories (nom) VALUES
  ('Alimentation'),
  ('Bâtiment'),
  ('Fabrication'),
  ('Services');

-- =============================================================
-- INSERTION DES SPÉCIALITÉS
-- On utilise une sous-requête SELECT pour récupérer l'id de la
-- catégorie depuis son nom 
-- =============================================================
INSERT INTO specialites (nom, categorie_id) VALUES
  -- Alimentation
  ('Boucher',      (SELECT id FROM categories WHERE nom = 'Alimentation')),
  ('Boulanger',    (SELECT id FROM categories WHERE nom = 'Alimentation')),
  ('Chocolatier',  (SELECT id FROM categories WHERE nom = 'Alimentation')),
  ('Traiteur',     (SELECT id FROM categories WHERE nom = 'Alimentation')),
  -- Bâtiment
  ('Chauffagiste', (SELECT id FROM categories WHERE nom = 'Bâtiment')),
  ('Electricien',  (SELECT id FROM categories WHERE nom = 'Bâtiment')),
  ('Menuisier',    (SELECT id FROM categories WHERE nom = 'Bâtiment')),
  ('Plombier',     (SELECT id FROM categories WHERE nom = 'Bâtiment')),
  -- Fabrication
  ('Bijoutier',    (SELECT id FROM categories WHERE nom = 'Fabrication')),
  ('Couturier',    (SELECT id FROM categories WHERE nom = 'Fabrication')),
  ('Ferronnier',   (SELECT id FROM categories WHERE nom = 'Fabrication')),
  -- Services
  ('Coiffeur',     (SELECT id FROM categories WHERE nom = 'Services')),
  ('Fleuriste',    (SELECT id FROM categories WHERE nom = 'Services')),
  ('Toiletteur',   (SELECT id FROM categories WHERE nom = 'Services')),
  ('Webdesign',    (SELECT id FROM categories WHERE nom = 'Services'));

-- =============================================================
-- INSERTION DES ARTISANS
-- Même logique : on retrouve l'id de la spécialité par son nom
-- =============================================================
INSERT INTO artisans (nom, note, ville, a_propos, email, site_web, top, specialite_id) VALUES

  -- ALIMENTATION
  (
    'Boucherie Dumont', 4.5, 'Lyon',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
    'boucherie.dumond@gmail.com', NULL, 0,
    (SELECT id FROM specialites WHERE nom = 'Boucher')
  ),
  (
    'Au pain chaud', 4.8, 'Montélimar',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
    'aupainchaud@hotmail.com', NULL, 1,
    (SELECT id FROM specialites WHERE nom = 'Boulanger')
  ),
  (
    'Chocolaterie Labbé', 4.9, 'Lyon',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
    'chocolaterie-labbe@gmail.com', 'https://chocolaterie-labbe.fr', 1,
    (SELECT id FROM specialites WHERE nom = 'Chocolatier')
  ),
  (
    'Traiteur Truchon', 4.1, 'Lyon',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
    'contact@truchon-traiteur.fr', 'https://truchon-traiteur.fr', 0,
    (SELECT id FROM specialites WHERE nom = 'Traiteur')
  ),

  -- BÂTIMENT
  (
    'Orville Salmons', 5.0, 'Evian',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
    'o-salmons@live.com', NULL, 1,
    (SELECT id FROM specialites WHERE nom = 'Chauffagiste')
  ),
  (
    'Mont Blanc Électricité', 4.5, 'Chamonix',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
    'contact@mont-blanc-electricite.com', 'https://mont-blanc-electricite.com', 0,
    (SELECT id FROM specialites WHERE nom = 'Electricien')
  ),
  (
    'Boutot & fils', 4.7, 'Bourg-en-Bresse',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
    'boutot-menuiserie@gmail.com', 'https://boutot-menuiserie.com', 0,
    (SELECT id FROM specialites WHERE nom = 'Menuisier')
  ),
  (
    'Vallis Bellemare', 4.0, 'Vienne',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
    'v.bellemare@gmail.com', 'https://plomberie-bellemare.com', 0,
    (SELECT id FROM specialites WHERE nom = 'Plombier')
  ),

  -- FABRICATION
  (
    'Claude Quinn', 4.2, 'Aix-les-Bains',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
    'claude.quinn@gmail.com', NULL, 0,
    (SELECT id FROM specialites WHERE nom = 'Bijoutier')
  ),
  (
    'Amitee Lécuyer', 4.5, 'Annecy',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
    'a.amitee@hotmail.com', 'https://lecuyer-couture.com', 0,
    (SELECT id FROM specialites WHERE nom = 'Couturier')
  ),
  (
    'Ernest Carignan', 5.0, 'Le Puy-en-Velay',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
    'e-carigan@hotmail.com', NULL, 0,
    (SELECT id FROM specialites WHERE nom = 'Ferronnier')
  ),

  -- SERVICES
  (
    'Royden Charbonneau', 3.8, 'Saint-Priest',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
    'r.charbonneau@gmail.com', NULL, 0,
    (SELECT id FROM specialites WHERE nom = 'Coiffeur')
  ),
  (
    'Leala Dennis', 3.8, 'Chambéry',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
    'l.dennos@hotmail.fr', 'https://coiffure-leala-chambery.fr', 0,
    (SELECT id FROM specialites WHERE nom = 'Coiffeur')
  ),
  (
    'C''est sup''hair', 4.1, 'Romans-sur-Isère',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
    'sup-hair@gmail.com', 'https://sup-hair.fr', 0,
    (SELECT id FROM specialites WHERE nom = 'Coiffeur')
  ),
  (
    'Le monde des fleurs', 4.6, 'Annonay',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
    'contact@le-monde-des-fleurs-annonay.fr', 'https://le-monde-des-fleurs-annonay.fr', 0,
    (SELECT id FROM specialites WHERE nom = 'Fleuriste')
  ),
  (
    'Valérie Laderoute', 4.5, 'Valence',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
    'v-laredoute@gmail.com', NULL, 0,
    (SELECT id FROM specialites WHERE nom = 'Toiletteur')
  ),
  (
    'CM Graphisme', 4.4, 'Valence',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
    'contact@cm-graphisme.com', 'https://cm-graphisme.com', 0,
    (SELECT id FROM specialites WHERE nom = 'Webdesign')
  );

-- =============================================================
-- VÉRIFICATION RAPIDE : ces requêtes doivent renvoyer les bons totaux
-- Décommentez-les pour tester après l'import
-- =============================================================
-- SELECT COUNT(*) AS nb_categories  FROM categories;   -- doit retourner 4
-- SELECT COUNT(*) AS nb_specialites FROM specialites;  -- doit retourner 15
-- SELECT COUNT(*) AS nb_artisans    FROM artisans;     -- doit retourner 17
-- SELECT COUNT(*) AS artisans_top   FROM artisans WHERE top = 1; -- doit retourner 3

-- Vérification de la jointure complète
-- SELECT a.nom, s.nom AS specialite, c.nom AS categorie
-- FROM artisans a
-- JOIN specialites s ON a.specialite_id = s.id
-- JOIN categories c  ON s.categorie_id  = c.id
-- ORDER BY c.nom, s.nom, a.nom;
