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

const minimax = (board, depth, isMaximizing) => {
  const winner = checkWinner(board);

  if (winner === 'X') return -10 + depth;
  if (winner === 'O') return 10 - depth;
  if (isBoardFull(board)) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = 'O';
        const score = minimax(board, depth + 1, false);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = 'X';
        const score = minimax(board, depth + 1, true);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};

const findBestMove = (board) => {
  let bestMove = null;
  let bestScore = -Infinity;
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      board[i] = 'O';
      const moveScore = minimax(board, 0, false);
      board[i] = null;
      if (moveScore > bestScore) {
        bestScore = moveScore;
        bestMove = i;
      }
    }
  }
  return bestMove;
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
      <p>{winner ? (winner === 'Draw' ? 'Draw' : `Win: ${winner}`) : `Turn: ${isPlayerTurn ? 'Player (X)' : 'IA (O)'}`}</p>
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
