import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Square from "./Square";

import type { RootState } from "../store";

import { BOARD_SIZE } from "../constants";

const Board = () => {
  const [gameOver, setGameOver] = useState(false);
  const status = useSelector((state: RootState) => state.game.status);
  const squares = [];

  useEffect(() => {
    setGameOver(status === "Restart");
  }, [status]);

  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      squares.push({ x, y, index: `${x}${y}` });
    }
  }

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
