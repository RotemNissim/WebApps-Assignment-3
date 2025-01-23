import React, { useState } from 'react';
import './styles/App.css';
import Square from './components/Square';

const App = () => {
  const [squares, setSquares] = useState<Array<string | null>>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameStatus, setGameStatus] = useState<string>('');

  const handleClick = (index: number) => {
    if (squares[index] || gameStatus) return; // Prevent click if square is filled or game is over
  
    const newSquares = squares.slice();
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  
    // Check for game status (win or draw) asynchronously
    setTimeout(() => {
      const status = checkGameStatus(newSquares);
      if (status) {
        setGameStatus(status); // Set the game status after checking
      }
    }, 0); // Set a timeout with a delay of 0ms to let React update the board first
  };
  

  const checkGameStatus = (squares: (string | null)[]): string | null => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Check for a winner
    for (const [a, b, c] of winningCombinations) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        alert(`${squares[a]} wins!`); // Show the alert for a winner
        return `${squares[a]} wins!`; // Return the winner status
      }
    }

    // Check for a draw
    if (!squares.includes(null)) {
      alert("It's a draw!"); // Show the draw alert
      return 'It\'s a draw!'; // Return draw status
    }

    return null; // No winner yet
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setGameStatus('');
  };

  return (
    <div className="app">
      <div>
        <button className="reset-button" onClick={handleReset}>
          Reset Game
        </button>
        <div className="board">
          {squares.map((square, index) => (
            <Square key={index} value={square} onClick={() => handleClick(index)} />
          ))}
        </div>
        {gameStatus && (
          <button className="play-again" onClick={handleReset}>
            Play Again
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
