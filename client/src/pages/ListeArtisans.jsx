import { useEffect, useState }    from 'react';
import { useSearchParams, Link }  from 'react-router-dom';
import { getArtisans }            from '../services/api';
import ArtisanCard                from '../components/ArtisanCard';

const ListeArtisans = () => {
  const [artisans, setArtisans]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [searchParams]                = useSearchParams();

  // Récupère les paramètres de l'URL (?categorie=... ou ?search=...)
  const categorie = searchParams.get('categorie');
  const search    = searchParams.get('search');

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
      ? categorie.charAt(0).toUpperCase() + categorie.slice(1)
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