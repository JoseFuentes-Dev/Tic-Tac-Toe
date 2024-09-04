import { useState } from 'react';
import './TIcTacToe.css';

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

const findBestMove = (board) => {
  const availableMoves = board
    .map((value, index) => (value === null ? index : null))
    .filter((val) => val !== null);
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
};

const TicTacToe = () => {
  const [board, setBoard] = useState(initialBoard);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner || !isPlayerTurn) return;

    const newBoard = board.slice();
    newBoard[index] = 'X';
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else if (isBoardFull(newBoard)) {
      setWinner('Draw');
    } else {
      setIsPlayerTurn(false);
      setTimeout(() => {
        aiMove(newBoard);
      }, 500); // Pequeña demora para simular el pensamiento de la IA
    }
  };

  const aiMove = (board) => {
    const aiMoveIndex = findBestMove(board);
    if (aiMoveIndex !== null) {
      board[aiMoveIndex] = 'O';
      setBoard([...board]);

      const gameWinner = checkWinner(board);
      if (gameWinner) {
        setWinner(gameWinner);
      } else if (isBoardFull(board)) {
        setWinner('Draw');
      } else {
        setIsPlayerTurn(true);
      }
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setIsPlayerTurn(true);
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
      <p>{winner ? (winner === 'Draw' ? 'Draw' : `Win: ${winner}`) : `Turn: ${isPlayerTurn ? 'Player (X)' : 'AI (O)'}`}</p>
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
