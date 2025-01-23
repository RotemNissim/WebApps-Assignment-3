
import React from 'react';
import '../styles/Square.css'; 

interface SquareProps {
  value: string | null;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value === 'X' && <img src="/x-image.png" alt="X" />}
      {value === 'O' && <img src="/o-image.png" alt="O" />}
    </button>
  );
};

export default Square;
