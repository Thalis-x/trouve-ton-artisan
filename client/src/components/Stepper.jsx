import { useState } from 'react';

const steps = [
  {
    numero: 1,
    titre: 'Choisir la catégorie',
    texte: "Sélectionnez une catégorie d'artisanat dans le menu de navigation : Bâtiment, Services, Fabrication ou Alimentation.",
  },
  {
    numero: 2,
    titre: 'Choisir un artisan',
    texte: "Parcourez la liste des artisans de la catégorie choisie et sélectionnez celui qui correspond à vos besoins.",
  },
  {
    numero: 3,
    titre: 'Le contacter',
    texte: "Envoyez votre demande directement via le formulaire de contact présent sur la fiche de l'artisan.",
  },
  {
    numero: 4,
    titre: 'Réponse sous 48h',
    texte: "L'artisan vous répondra dans les 48 heures suivant votre demande par email.",
  },
];

const Stepper = () => {
  const [etape, setEtape] = useState(0);

  return (
    <div className="stepper text-center">
      {/* Indicateurs d'étapes */}
      <div className="d-flex justify-content-center align-items-center mb-4 gap-2">
        {steps.map((s, i) => (
          <div key={i} className="d-flex align-items-center">
            <div
              className="step-number"
              style={{
                backgroundColor: i === etape ? '#0074c7' : i < etape ? '#82b864' : '#ccc',
                cursor: 'pointer',
              }}
              onClick={() => setEtape(i)}
              aria-label={`Étape ${s.numero}`}
            >
              {i < etape ? '✓' : s.numero}
            </div>
            {/* Ligne entre les étapes */}
            {i < steps.length - 1 && (
              <div style={{
                width: '60px',
                height: '3px',
                backgroundColor: i < etape ? '#82b864' : '#ccc',
                margin: '0 4px',
              }}/>
            )}
          </div>
        ))}
      </div>

      {/* Contenu de l'étape active */}
      <div className="card p-4 mx-auto" style={{ maxWidth: '500px' }}>
        <h3 className="h5 mb-3">{steps[etape].titre}</h3>
        <p className="text-muted">{steps[etape].texte}</p>
      </div>

      {/* Boutons navigation */}
      <div className="d-flex justify-content-center gap-3 mt-4">
        <button
          className="btn btn-outline-secondary"
          onClick={() => setEtape(e => e - 1)}
          disabled={etape === 0}
        >
          ← Retour
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setEtape(e => e + 1)}
          disabled={etape === steps.length - 1}
        >
          Suivant →
        </button>
      </div>
    </div>
  );
};

export default Stepper;