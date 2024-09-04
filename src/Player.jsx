import { useState } from 'react';
import './TicTacToe.css';

const initialBoard = Array(9).fill(null);

const checkWinner = (board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

const isBoardFull = (board) => {
  return board.every(square => square !== null);
};

const TicTacToe = () => {
  const [board, setBoard] = useState(initialBoard);
  const [isPlayerXTurn, setIsPlayerXTurn] = useState(true); // Mantiene el turno del jugador
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isPlayerXTurn ? 'X' : 'O';
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else if (isBoardFull(newBoard)) {
      setWinner('Draw');
    } else {
      setIsPlayerXTurn(!isPlayerXTurn); // Cambia de turno
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setIsPlayerXTurn(true);
    setWinner(null);
  };

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  return (
    <div className="tic-tac-toe">
      <p>{winner ? (winner === 'Draw' ? 'Draw' : `Win: ${winner}`) : `Turn: ${isPlayerXTurn ? 'Player X' : 'Player O'}`}</p>
      <div className="board">
        <div className="row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button className="reset-button" onClick={resetGame}>Reset</button>
    </div>
  );
};

export default TicTacToe;
