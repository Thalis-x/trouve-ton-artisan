import { useEffect, useState } from 'react';
import { getTopArtisans }      from '../services/api';
import ArtisanCard             from '../components/ArtisanCard';
import Stepper                 from '../components/Stepper';

const Accueil = () => {
  const [topArtisans, setTopArtisans] = useState([]);
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    getTopArtisans()
      .then(data => setTopArtisans(data))
      .catch(err => console.error('Erreur :', err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
  document.title = 'Trouve ton artisan | Région Auvergne-Rhône-Alpes';
}, []);

  return (
    <>
      {/* ── Comment ça marche (Stepper) ────────────────── */}
      <section className="section-how">
        <div className="container">
          <h2 className="text-center mb-5">Comment trouver mon artisan ?</h2>
          <Stepper />
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