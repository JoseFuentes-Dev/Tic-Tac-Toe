// Card.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ content, onButtonClick }) => {
  const [flipped, setFlipped] = useState(false);

  const handleClick = (nextCard) => {
    setFlipped(true);
    setTimeout(() => {
      onButtonClick(nextCard);
      setFlipped(false); // Volver al estado inicial después del giro
    }, 300); // Duración de la animación en ms
  };


  return (
    <div className={`card ${flipped ? 'flipped' : ''}`}>
      <div className="card-front">
        <h2>{content.frontTitle}</h2>
        <p>{content.frontText}</p>
        <div className="buttons">
        {content.buttons.map((button, index) => (
          <button key={index} onClick={() => handleClick(button.nextCard)}>
            {button.label}
          </button>
        ))}
        </div>
      </div>
    </div>
  );
};

// Definición de las PropTypes para validar las propiedades
Card.propTypes = {
  content: PropTypes.shape({
    frontTitle: PropTypes.string.isRequired,
    frontText: PropTypes.string.isRequired,
    buttons: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        nextCard: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default Card;
