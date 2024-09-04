// CardContainer.jsx
import  { useState } from 'react';
import Card from './Card';
import './Card.css';
import Easy from './Easy';
import Insane from './Insane'
import Player from './Player'
const CardContainer = () => {
  const [currentCard, setCurrentCard] = useState(1);

  const cards = {
    1: {
      frontTitle: 'Start',
      frontText:
      ( 
        <>
       <span
       className='span-title'> Welcome </span>to Tik Tak Toe <span
       className='span-title'> Game </span>
        </>
      ),
      buttons: [
        { label: 'Player vs AI', nextCard: 2 },
        { label: 'Player vs Player', nextCard: 3 },
      ],
    },
    2: {
      frontTitle: ' vs AI',
      frontText: 'Select the difficulty.',
      buttons: [
        { label: 'easy 😇', nextCard: 4 },
        { label: 'insane 😈', nextCard: 5 },
        { label: 'back to menu', nextCard: 1 }
      ],
    },
    3: {
      frontTitle: 'vs Player',
      frontText: (
        <>
        <Player />
        </>
      ),
      buttons: [
        { label: 'back to menu', nextCard: 1 },
      ],
    },
    4: {
      frontTitle: 'easy',
      frontText: (
        <>
          <Easy /> {/* Aquí llamas al componente TicTacToe */}
        </>
      ),
      buttons: [
        { label: 'back to menu', nextCard: 1 },
      ],
    },
    
    5: {
      frontTitle: 'insane',
      frontText: (
        <>
        <Insane />
        </>
      ),
      buttons: [
        { label: 'back to menu', nextCard: 1 },
      ],
    },
  };

  const handleButtonClick = (nextCard) => {
    setCurrentCard(nextCard);
  };

  return (
    <>
      <Card content={cards[currentCard]} onButtonClick={handleButtonClick} />
    </>
  );
};

export default CardContainer;
