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
  const [errors, setErrors]       = useState({});

  useEffect(() => {
  getArtisanById(id)
    .then(data => {
      setArtisan(data);
      document.title = `${data.nom} | Trouve ton artisan`;
    })
    .catch(() => setNotFound(true))
    .finally(() => setLoading(false));
}, [id]);

  const validerFormulaire = () => {
    const newErrors = {};
    if (!form.nom.trim())     newErrors.nom     = 'Le nom est obligatoire.';
    if (!form.email.trim())   newErrors.email   = "L'email est obligatoire.";
    else if (!/\S+@\S+\.\S+/.test(form.email))
                              newErrors.email   = "L'email n'est pas valide.";
    if (!form.objet.trim())   newErrors.objet   = "L'objet est obligatoire.";
    if (!form.message.trim()) newErrors.message = 'Le message est obligatoire.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Efface l'erreur du champ modifié en temps réel
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validerFormulaire()) {
      setFormSent(true);
    }
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

      <div className="row">
        {/* ── À propos ─────────────────────────────────── */}
        <div className="col-md-6 mb-4">
          <div className="card p-4">
            <h2 className="h4 mb-3">À propos</h2>
            <p className="text-muted">
              {artisan.a_propos || 'Aucune description disponible.'}
            </p>
          </div>
        </div>

        {/* ── Formulaire de contact ─────────────────────── */}
        <div className="col-md-6 mb-4">
          <div className="card p-4">
            <h2 className="h4 mb-3">Contacter {artisan.nom}</h2>

            {formSent ? (
              <div className="alert alert-success">
                Votre message a bien été envoyé ! L'artisan vous répondra sous 48h.
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="nom" className="form-label">Votre nom</label>
                  <input
                    type="text"
                    className={`form-control ${errors.nom ? 'is-invalid' : ''}`}
                    id="nom"
                    name="nom"
                    value={form.nom}
                    onChange={handleFormChange}
                    required
                    />
                    {errors.nom && <div className="invalid-feedback">{errors.nom}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Votre email</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleFormChange}
                    required
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="objet" className="form-label">Objet</label>
                  <input
                    type="text"
                    className={`form-control ${errors.objet ? 'is-invalid' : ''}`}
                    id="objet"
                    name="objet"
                    value={form.objet}
                    onChange={handleFormChange}
                    required
                  />
                  {errors.objet && <div className="invalid-feedback">{errors.objet}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleFormChange}
                    required
                  />
                  {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Envoyer le message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ── Retour ───────────────────────────────────── */}
      <Link to={-1} className="btn btn-outline-secondary mt-2">
        ← Retour
      </Link>

    </div>
  );
};

export default FicheArtisan;