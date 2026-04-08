# Trouve ton artisan

Plateforme dédiée aux artisans de la région Auvergne-Rhône-Alpes, 
permettant aux particuliers de trouver un artisan et de le contacter facilement.

---

## Prérequis

Avant de lancer le projet, assurez-vous d'avoir installé :

- [Node.js](https://nodejs.org/) v18 ou supérieur
- [MySQL](https://www.mysql.com/fr/) v8 ou supérieur
- [Git](https://git-scm.com/)

---

## Installation

### 1. Cloner le repository

```bash
git clone https://github.com/Thalis-x/trouve-ton-artisan
cd trouve-ton-artisan
```

### 2. Base de données

- Ouvrir MySQL Workbench
- Exécuter le script de création des tables :
```bash
sql/01_structure.sql
```
- Exécuter le script d'alimentation des données :
```bash
sql/02_donnees.sql
```

### 3. API (Backend)

```bash
cd api
npm install
```

Créer un fichier `.env` dans le dossier `api/` :

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3308
DB_NAME=trouve_ton_artisan
DB_USER=root
DB_PASSWORD=votremotdepasse

JWT_SECRET=une_chaine_longue_et_aleatoire
CORS_ORIGIN=http://localhost:3000
```

Lancer le serveur :

```bash
npm run dev
```

Le serveur démarre sur `http://localhost:5000`

### 4. Frontend (Client)

```bash
cd client
npm install
npm run dev
```

Le site est accessible sur `http://localhost:3000`

---

## Structure du projet

trouve-ton-artisan/
├── api/                        # Backend Node.js/Express
│   ├── src/
│   │   ├── config/             # Configuration base de données
│   │   ├── controllers/        # Gestion des requêtes HTTP
│   │   ├── middlewares/        # Authentification, validation
│   │   ├── models/             # Modèles Sequelize
│   │   ├── routes/             # Définition des endpoints
│   │   └── services/           # Logique métier
│   ├── .env                    # Variables d'environnement (non versionné)
│   └── server.js               # Point d'entrée du serveur
│
├── client/                     # Frontend React
│   ├── src/
│   │   ├── assets/             # Images et ressources
│   │   ├── components/         # Composants réutilisables
│   │   ├── pages/              # Pages de l'application
│   │   ├── services/           # Appels API
│   │   └── styles/             # Fichiers Sass
│   └── vite.config.js
│
├── sql/                        # Scripts SQL
│   ├── 01_structure.sql        # Création des tables
│   └── 02_donnees.sql          # Alimentation des données
│
└── README.md

---

## Endpoints API

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/categories` | Récupère toutes les catégories |
| GET | `/api/artisans` | Récupère tous les artisans |
| GET | `/api/artisans/top` | Récupère les 3 artisans du mois |
| GET | `/api/artisans?categorie=batiment` | Filtre par catégorie |
| GET | `/api/artisans?search=dumont` | Recherche par nom |
| GET | `/api/artisans/:id` | Récupère la fiche d'un artisan |

---

## Technologies utilisées

**Frontend**
- ReactJS + Vite
- Bootstrap 5
- Sass
- React Router DOM
- Axios

**Backend**
- Node.js
- Express
- Sequelize (ORM)
- MySQL2

**Sécurité**
- Helmet
- CORS
- Express Rate Limit

**Outils**
- Git & GitHub
- MySQL Workbench
- Visual Studio Code

---

## Auteur

Projet réalisé dans le cadre d'une formation en développement web.  
Région Auvergne-Rhône-Alpes — 2026