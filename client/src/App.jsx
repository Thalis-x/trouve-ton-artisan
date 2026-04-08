import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header       from './components/Header';
import Footer       from './components/Footer';
import Accueil      from './pages/Accueil';
import ListeArtisans from './pages/ListeArtisans';
import FicheArtisan from './pages/FicheArtisan';
import PageLegale   from './pages/PageLegale';
import NotFound     from './pages/NotFound';

// Remonte en haut de la page à chaque changement de route
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Header />

        <main className="flex-grow-1">
          <Routes>
            <Route path="/"                    element={<Accueil />} />
            <Route path="/artisans"            element={<ListeArtisans />} />
            <Route path="/artisans/:id"        element={<FicheArtisan />} />
            <Route path="/mentions-legales"    element={<PageLegale titre="Mentions légales" />} />
            <Route path="/donnees-personnelles" element={<PageLegale titre="Données personnelles" />} />
            <Route path="/accessibilite"       element={<PageLegale titre="Accessibilité" />} />
            <Route path="/cookies"             element={<PageLegale titre="Cookies" />} />
            {/* Toute URL non reconnue affiche la page 404 */}
            <Route path="*"                    element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
