import { Link } from 'react-router-dom';
import image404   from '../assets/404.svg';
import { useEffect } from 'react';



const NotFound = () => {
  useEffect(() => {
  document.title = 'Page non trouvée | Trouve ton artisan';
}, []);
  return (
    <section
      style={{
        backgroundImage: `url(${image404})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#6698cb',
        minHeight: '80vh',
        overflow: 'hidden',
        position: 'relative',
      }}
      >
  {/* Bouton centré en bas */}
  <div style={{
    position: 'absolute',
    bottom: '10px',
    width: '100%',
    textAlign: 'center',
  }}>
    <Link to="/" className="btn btn-primary">
      Retour à l'accueil
    </Link>
  </div>

  {/* Crédit Freepik en bas à droite */}
  <div style={{
    position: 'absolute',
    bottom: '10px',
    right: '16px',
  }}>
    <a href="http://www.freepik.com" style={{ fontSize: '0.75rem' }} className="text-white">
      Designed by Freepik
    </a>
  </div>
</section>

  );
};

export default NotFound;