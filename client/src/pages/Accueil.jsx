import { useEffect, useState } from 'react';
import { getTopArtisans }      from '../services/api';
import ArtisanCard             from '../components/ArtisanCard';

const Accueil = () => {
  const [topArtisans, setTopArtisans] = useState([]);
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    getTopArtisans()
      .then(data => setTopArtisans(data))
      .catch(err => console.error('Erreur :', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* ── Hero ───────────────────────────────────────── */}
      <section
        className="py-5 text-white text-center"
        style={{ background: 'linear-gradient(135deg, #00497c, #0074c7)' }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold mb-2">Trouve ton artisan !</h1>
          <p className="lead">Avec la région Auvergne-Rhône-Alpes</p>
        </div>
      </section>

      {/* ── Comment ça marche ──────────────────────────── */}
      <section className="section-how">
        <div className="container">
          <h2 className="text-center mb-5">Comment trouver mon artisan ?</h2>
          <div className="row text-center">

            <div className="col-md-3 mb-4">
              <div className="step-number">1</div>
              <h5>Choisir la catégorie</h5>
              <p className="text-muted">
                Sélectionnez une catégorie d'artisanat dans le menu de navigation.
              </p>
            </div>

            <div className="col-md-3 mb-4">
              <div className="step-number">2</div>
              <h5>Choisir un artisan</h5>
              <p className="text-muted">
                Parcourez la liste et choisissez l'artisan qui correspond à vos besoins.
              </p>
            </div>

            <div className="col-md-3 mb-4">
              <div className="step-number">3</div>
              <h5>Le contacter</h5>
              <p className="text-muted">
                Envoyez votre demande via le formulaire de contact de l'artisan.
              </p>
            </div>

            <div className="col-md-3 mb-4">
              <div className="step-number">4</div>
              <h5>Réponse sous 48h</h5>
              <p className="text-muted">
                L'artisan vous répondra dans les 48 heures suivant votre demande.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Artisans du mois ───────────────────────────── */}
      <section className="section-top">
        <div className="container">
          <h2 className="text-center mb-5">Les 3 artisans du mois</h2>

          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
            </div>
          ) : (
            <div className="row justify-content-center">
              {topArtisans.map(artisan => (
                <div className="col-md-4 mb-4" key={artisan.id}>
                  <ArtisanCard artisan={artisan} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Accueil;