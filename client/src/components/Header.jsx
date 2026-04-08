import { useState, useEffect } from 'react';
import { Link, useNavigate }   from 'react-router-dom';
import { getCategories }       from '../services/api';
import logo                    from '../assets/logo.png';

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch]         = useState('');
  const navigate                    = useNavigate();

  // Récupère les catégories depuis l'API au chargement du composant
  // C'est ce qui alimente le menu de navigation dynamiquement
  useEffect(() => {
    getCategories()
      .then(data => setCategories(data))
      .catch(err => console.error('Erreur chargement catégories :', err));
  }, []); // [] = s'exécute une seule fois au montage du composant

  // Gère la soumission de la barre de recherche
  const handleSearch = (e) => {
    e.preventDefault(); // empêche le rechargement de la page
    if (search.trim()) {
      navigate(`/artisans?search=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container">

        {/* Logo avec lien vers l'accueil */}
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Trouve ton artisan" />
        </Link>

        {/* Bouton hamburger pour mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Ouvrir le menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Menu catégories alimenté depuis la BDD */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {categories.map(cat => (
              <li className="nav-item" key={cat.id}>
                <Link
                  className="nav-link"
                  to={`/artisans?categorie=${cat.nom.toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '') // supprime les accents
                  }`}
                >
                  {cat.nom}
                </Link>
              </li>
            ))}
          </ul>

          {/* Barre de recherche */}
          <form className="d-flex mt-2 mt-lg-0" onSubmit={handleSearch} role="search">
            <div className="input-group">
              <input
                className="form-control me-2"
               type="search"
               placeholder="Boucherie..."
               aria-label="Rechercher un artisan"
                value={search}
               onChange={(e) => setSearch(e.target.value)}
             />
              <button className="btn btn-primary" type="submit">
                 Rechercher
              </button>
            </div>
          </form>
        </div>

      </div>
    </nav>
  );
};

export default Header;
