import { useNavigate } from 'react-router-dom';
import Stars           from './Stars';

const ArtisanCard = ({ artisan }) => {
  const navigate = useNavigate();

  return (
    <div
      className="card artisan-card h-100"
      onClick={() => navigate(`/artisans/${artisan.id}`)}
      role="button"
      tabIndex={0} // accessibilité clavier
      aria-label={`Voir la fiche de ${artisan.nom}`}
      onKeyDown={(e) => {
        // accessibilité : permet d'activer la card avec Entrée ou Espace
        if (e.key === 'Enter' || e.key === ' ') {
          navigate(`/artisans/${artisan.id}`);
        }
      }}
    >
      <div className="card-body">
        <h5 className="card-title">{artisan.nom}</h5>
        <Stars note={parseFloat(artisan.note)} />
        {artisan.specialite && (
          <p className="card-specialite mt-2 mb-1">
            {artisan.specialite.nom}
          </p>
        )}
        <p className="card-ville">
        {artisan.ville}
        </p>
      </div>
    </div>
  );
};

export default ArtisanCard;