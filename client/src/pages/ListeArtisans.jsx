import { useEffect, useState }                from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { getArtisans }                        from '../services/api';
import ArtisanCard                            from '../components/ArtisanCard';

// Correspondance slug URL → nom affiché
const slugMap = {
  'batiment'    : 'Bâtiment',
  'services'    : 'Services',
  'fabrication' : 'Fabrication',
  'alimentation': 'Alimentation',
};

const ListeArtisans = () => {
  const navigate                          = useNavigate();
  const [artisans, setArtisans]           = useState([]);
  const [loading, setLoading]             = useState(true);
  const [searchParams]                    = useSearchParams();

  // Récupère les paramètres de l'URL (?categorie=... ou ?search=...)
  const categorie = searchParams.get('categorie');
  const search    = searchParams.get('search');

  // Si la catégorie dans l'URL n'existe pas → redirige vers 404
  useEffect(() => {
    if (categorie && !slugMap[categorie.toLowerCase()]) {
      navigate('/404');
    }
  }, [categorie]);

  useEffect(() => {
    setLoading(true);
    getArtisans({ categorie, search })
      .then(data => setArtisans(data))
      .catch(err => console.error('Erreur :', err))
      .finally(() => setLoading(false));
  }, [categorie, search]); // se relance à chaque changement de filtre

  // Titre dynamique selon le filtre actif
  const titre = search
    ? `Résultats pour "${search}"`
    : categorie
      ? slugMap[categorie.toLowerCase()]
      : 'Tous les artisans';

  useEffect(() => {
    document.title = `${titre} | Trouve ton artisan`;
  }, [titre]);

  return (
    <div className="container my-5">
      <h1 className="mb-4">{titre}</h1>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      ) : artisans.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted mb-3">Aucun artisan trouvé.</p>
          <Link to="/" className="btn btn-primary">
            Retour à l'accueil
          </Link>
        </div>
      ) : (
        <div className="row">
          {artisans.map(artisan => (
            <div className="col-sm-6 col-lg-4 mb-4" key={artisan.id}>
              <ArtisanCard artisan={artisan} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListeArtisans;