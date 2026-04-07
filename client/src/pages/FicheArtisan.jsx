import { useEffect, useState } from 'react';
import { useParams, Link }     from 'react-router-dom';
import { getArtisanById }      from '../services/api';
import Stars                   from '../components/Stars';

const FicheArtisan = () => {
  const { id }                    = useParams();
  const [artisan, setArtisan]     = useState(null);
  const [loading, setLoading]     = useState(true);
  const [notFound, setNotFound]   = useState(false);

  // États du formulaire de contact
  const [form, setForm]           = useState({ nom: '', email: '', objet: '', message: '' });
  const [formSent, setFormSent]   = useState(false);

  useEffect(() => {
    getArtisanById(id)
      .then(data => setArtisan(data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Pour l'instant on simule l'envoi
    // L'envoi d'email réel sera branché côté API plus tard
    setFormSent(true);
  };

  if (loading) return (
    <div className="text-center my-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Chargement...</span>
      </div>
    </div>
  );

  if (notFound) return (
    <div className="container my-5 text-center">
      <h2>Artisan non trouvé</h2>
      <Link to="/" className="btn btn-primary mt-3">Retour à l'accueil</Link>
    </div>
  );

  return (
    <div className="container my-5 fiche-artisan">

      {/* ── En-tête de la fiche ──────────────────────── */}
      <div className="row align-items-center mb-5">
        <div className="col-auto">
          {artisan.photo ? (
            <img
              src={artisan.photo}
              alt={artisan.nom}
              className="fiche-photo"
            />
          ) : (
            <div className="fiche-photo-placeholder" aria-hidden="true">
            </div>
          )}
        </div>

        <div className="col">
          <h1 className="mb-1">{artisan.nom}</h1>
          <Stars note={parseFloat(artisan.note)} />
          {artisan.specialite && (
            <p className="mt-2 mb-1" style={{ color: '#0074c7', fontWeight: 500 }}>
              {artisan.specialite.nom} — {artisan.specialite.categorie?.nom}
            </p>
          )}
          <p className="text-muted">{artisan.ville}</p>
          {artisan.site_web && (
            <a
              href={artisan.site_web}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-primary btn-sm"
            >
              Visiter le site web
            </a>
          )}
        </div>
      </div>
