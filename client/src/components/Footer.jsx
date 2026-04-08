import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer mt-auto">
      <div className="container">
        <div className="row justify-content-center text-center">

          {/* Liens légaux */}
          <div className="col-md-5 mb-4">
            <h6 className="text-uppercase fw-bold mb-3" style={{ color: '#a0aec0' }}>
              Informations légales
            </h6>
            <ul className="list-unstyled">
              <li><Link to="/mentions-legales">Mentions légales</Link></li>
              <li><Link to="/donnees-personnelles">Données personnelles</Link></li>
              <li><Link to="/accessibilite">Accessibilité</Link></li>
              <li><Link to="/cookies">Cookies</Link></li>
            </ul>
          </div>

          {/* Contact antenne Lyon */}
          <div className="col-md-4 mb-4">
            <h6 className="text-uppercase fw-bold mb-3" style={{ color: '#a0aec0' }}>
              Antenne de Lyon
            </h6>
            <address style={{ fontStyle: 'normal' }}>
              <p className="mb-1">101 cours Charlemagne</p>
              <p className="mb-1">CS 20033</p>
              <p className="mb-1">69269 LYON CEDEX 02</p>
              <p className="mb-1">France</p>
              <a href="tel:+33426734000">+33 (0)4 26 73 40 00</a>
            </address>
          </div>

        </div>

        <hr style={{ borderColor: '#ffffff' }} />
        <p className="text-center mb-0" style={{ color: '#a0aec0', fontSize: '0.85rem' }}>
          © {new Date().getFullYear()} Région Auvergne-Rhône-Alpes — Tous droits réservés
        </p>
      </div>
    </footer>
  );
};

export default Footer;