import { useEffect } from 'react';

const PageLegale = ({ titre }) => {
  useEffect(() => {
  document.title = `${titre} | Trouve ton artisan`;
}, [titre]);

  return (
    <div className="container my-5">
      <h1 className="mb-4">{titre}</h1>
      <div className="alert alert-info">
        Page en construction — ce contenu sera rempli ultérieurement
        par un cabinet spécialisé.
      </div>
    </div>
  );
};

export default PageLegale;