import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="page-404">
      <h1>404</h1>
      <h2 className="mb-3">Page non trouvée</h2>
      <p className="mb-4 text-muted">
        La page que vous avez demandée n'existe pas ou a été déplacée.
      </p>
      <Link to="/" className="btn btn-primary">
        Retour à l'accueil
      </Link>
    </div>
    
  );
};

export default NotFound;