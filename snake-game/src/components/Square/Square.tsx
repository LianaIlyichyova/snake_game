import { useSelector } from "react-redux";
import type { RootState } from "../../store";

interface Square {
  x: number;
  y: number;
}

const Square = ({ square }: { square: Square }) => {
  const { x, y } = square;
  const snake = useSelector((store: RootState) => store.game.snake);
  const apple = useSelector((store: RootState) => store.game.apple);

  let buttonStyle = "";
  for (const s of snake) {
    if (s.x === x && s.y === y) buttonStyle = "snake";
  }
  if (x === apple.x && y === apple.y) buttonStyle = "apple";

  return (
    <span className="square">
      <button className={buttonStyle}></button>
    </span>
  );
};

export default Square;
