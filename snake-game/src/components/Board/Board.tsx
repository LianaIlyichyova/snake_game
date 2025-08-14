import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import Square from "../Square";

const Board = () => {
  const [gameOver, setGameOver] = useState(false);
  const status = useSelector((state: RootState) => state.game.status);

  // Update gameOver when status changes
  useEffect(() => {
    setGameOver(status === "Restart");
  }, [status]);

  // Precompute squares once
  const squares = Array.from({ length: 10 * 10 }, (_, index) => {
    const x = index % 10;
    const y = Math.floor(index / 10);
    return { x, y, index: `${x}${y}` };
  });

  return (
    <div className={`board ${gameOver ? "game-over" : ""}`}>
      {squares.map((square) => (
        <span key={square.index}>
          <Square square={square} />
        </span>
      ))}
    </div>
  );
};

export default Board;
