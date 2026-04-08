import { useState, useEffect } from 'react';
import { useNavigate }         from 'react-router-dom';
import { getCategories, getArtisans } from '../services/api';
import Stars from './Stars';

const STEPS = ['Choisir la catégorie', 'Choisir un artisan', 'Nous contacter'];

const Stepper = () => {
  const navigate = useNavigate();

  // État du stepper
  const [etape, setEtape]               = useState(0);

  // Étape 1 — catégories
  const [categories, setCategories]     = useState([]);
  const [categorieChoisie, setCategorieChoisie] = useState('');

  // Étape 2 — artisans
  const [artisans, setArtisans]         = useState([]);
  const [artisanChoisi, setArtisanChoisi] = useState('');
  const [loadingArtisans, setLoadingArtisans] = useState(false);

  // Étape 3 — formulaire
  const [form, setForm]                 = useState({ nom: '', email: '', objet: '', message: '' });
  const [errors, setErrors]             = useState({});
  const [formSent, setFormSent]         = useState(false);

  // Charge les catégories au montage
  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  // Charge les artisans quand une catégorie est choisie
  useEffect(() => {
    if (!categorieChoisie) return;
    setLoadingArtisans(true);
    setArtisanChoisi('');
    const slug = categorieChoisie
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    getArtisans({ categorie: slug })
      .then(setArtisans)
      .catch(console.error)
      .finally(() => setLoadingArtisans(false));
  }, [categorieChoisie]);

  // Valide le formulaire
  const validerFormulaire = () => {
    const newErrors = {};
    if (!form.nom.trim())     newErrors.nom     = 'Le nom est obligatoire.';
    if (!form.email.trim())   newErrors.email   = 'L\'email est obligatoire.';
    else if (!/\S+@\S+\.\S+/.test(form.email))
                              newErrors.email   = 'L\'email n\'est pas valide.';
    if (!form.objet.trim())   newErrors.objet   = 'L\'objet est obligatoire.';
    if (!form.message.trim()) newErrors.message = 'Le message est obligatoire.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Efface l'erreur du champ modifié
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validerFormulaire()) {
      setFormSent(true);
    }
  };

  // Le bouton Suivant est actif seulement si la sélection est faite
  const peutAvancer =
    (etape === 0 && categorieChoisie !== '') ||
    (etape === 1 && artisanChoisi !== '');

  const artisanSelectionne = artisans.find(a => a.id === parseInt(artisanChoisi));

  return (
    <div className="stepper text-center">

      {/* ── Indicateurs d'étapes ── */}
      <div className="d-flex justify-content-center align-items-center mb-4 gap-2">
        {STEPS.map((label, i) => (
          <div key={i} className="d-flex align-items-center">
            <div style={{ textAlign: 'center' }}>
              <div
                className="step-number mx-auto"
                style={{
                  backgroundColor: i === etape ? '#0074c7' : i < etape ? '#82b864' : '#ccc',
                }}
              >
                {i < etape ? '✓' : i + 1}
              </div>
              <small style={{ fontSize: '0.75rem', color: i === etape ? '#0074c7' : '#aaa' }}>
                {label}
              </small>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{
                width: '60px',
                height: '3px',
                backgroundColor: i < etape ? '#82b864' : '#ccc',
                margin: '0 8px 18px',
              }}/>
            )}
          </div>
        ))}
      </div>

      {/* ── Contenu de l'étape ── */}
      <div className="card p-4 mx-auto" style={{ maxWidth: '520px' }}>

        {/* Étape 1 — Choisir la catégorie */}
        {etape === 0 && (
          <>
            <h3 className="h5 mb-3">Choisissez votre catégorie d'artisanat</h3>
            <select
              className="form-select"
              value={categorieChoisie}
              onChange={e => setCategorieChoisie(e.target.value)}
              aria-label="Choisir une catégorie"
            >
              <option value="">-- Sélectionnez une catégorie --</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.nom}>{cat.nom}</option>
              ))}
            </select>
          </>
        )}

        {/* Étape 2 — Choisir un artisan */}
        {etape === 1 && (
          <>
            <h3 className="h5 mb-3">Choisissez votre artisan</h3>
            {loadingArtisans ? (
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
            ) : (
              <select
                className="form-select"
                value={artisanChoisi}
                onChange={e => setArtisanChoisi(e.target.value)}
                aria-label="Choisir un artisan"
              >
                <option value="">-- Sélectionnez un artisan --</option>
                {artisans.map(a => (
                  <option key={a.id} value={a.id}>
                    {a.nom} — {a.ville} ({a.note}/5)
                  </option>
                ))}
              </select>
            )}

            {/* Aperçu de l'artisan sélectionné */}
            {artisanSelectionne && (
              <div className="mt-3 p-3 rounded" style={{ background: '#f1f8fc' }}>
                <strong>{artisanSelectionne.nom}</strong><br />
                <Stars note={parseFloat(artisanSelectionne.note)} />
                <p className="mb-0 mt-1 text-muted" style={{ fontSize: '0.85rem' }}>
                  {artisanSelectionne.ville}
                </p>
              </div>
            )}
          </>
        )}

        {/* Étape 3 — Formulaire de contact */}
        {etape === 2 && (
          <>
            {formSent ? (
              <div className="alert alert-success mb-0">
                Votre message a bien été envoyé !<br />
                {artisanSelectionne?.nom} vous répondra sous 48h.
              </div>
            ) : (
              <>
                <h3 className="h5 mb-3">
                  Contacter {artisanSelectionne?.nom}
                </h3>
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3 text-start">
                    <label htmlFor="s-nom" className="form-label">Votre nom *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.nom ? 'is-invalid' : ''}`}
                      id="s-nom"
                      name="nom"
                      value={form.nom}
                      onChange={handleFormChange}
                    />
                    {errors.nom && <div className="invalid-feedback">{errors.nom}</div>}
                  </div>

                  <div className="mb-3 text-start">
                    <label htmlFor="s-email" className="form-label">Votre email *</label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      id="s-email"
                      name="email"
                      value={form.email}
                      onChange={handleFormChange}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  <div className="mb-3 text-start">
                    <label htmlFor="s-objet" className="form-label">Objet *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.objet ? 'is-invalid' : ''}`}
                      id="s-objet"
                      name="objet"
                      value={form.objet}
                      onChange={handleFormChange}
                    />
                    {errors.objet && <div className="invalid-feedback">{errors.objet}</div>}
                  </div>

                  <div className="mb-3 text-start">
                    <label htmlFor="s-message" className="form-label">Message *</label>
                    <textarea
                      className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                      id="s-message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleFormChange}
                    />
                    {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    Envoyer le message
                  </button>
                </form>
              </>
            )}
          </>
        )}
      </div>

      {/* ── Boutons navigation ── */}
      {!formSent && (
        <div className="d-flex justify-content-center gap-3 mt-4">
          <button
            className="btn btn-outline-secondary"
            onClick={() => setEtape(e => e - 1)}
            disabled={etape === 0}
          >
            ← Retour
          </button>

          {etape < STEPS.length - 1 ? (
            <button
              className="btn btn-primary"
              onClick={() => setEtape(e => e + 1)}
              disabled={!peutAvancer}
            >
              Suivant →
            </button>
          ) : (
            // À la dernière étape le bouton Suivant disparaît
            // c'est le bouton Submit du formulaire qui prend le relais
            null
          )}
        </div>
      )}

      {/* Lien vers la fiche complète de l'artisan */}
      {etape === 1 && artisanSelectionne && (
        <button
          className="btn btn-link mt-2"
          onClick={() => navigate(`/artisans/${artisanSelectionne.id}`)}
        >
          Voir la fiche complète →
        </button>
      )}
    </div>
  );
};

export default Stepper;