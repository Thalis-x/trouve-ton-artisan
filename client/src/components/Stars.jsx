// Affiche les étoiles pleines, demi-étoiles et vides selon la note
const Stars = ({ note }) => {
  const etoiles = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(note)) {
      etoiles.push(<span key={i}>★</span>); // étoile pleine
    } else if (i === Math.ceil(note) && note % 1 >= 0.5) {
      etoiles.push(<span key={i}>½</span>); // demi étoile
    } else {
      etoiles.push(<span key={i} style={{opacity: 0.3}}>★</span>); // étoile vide
    }
  }

  return (
    <span className="stars" aria-label={`Note : ${note} sur 5`}>
      {etoiles} <small>({note}/5)</small>
    </span>
  );
};

export default Stars;