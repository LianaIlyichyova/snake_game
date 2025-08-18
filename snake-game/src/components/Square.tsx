import { useSelector } from "react-redux";
import type { RootState } from "../store";

interface SquareProps {
  x: number;
  y: number;
  index?: string;
}

const Square = ({ square }: { square: SquareProps }) => {
  const { x, y } = square;
  const snake = useSelector((store: RootState) => store.game.snake);
  const apple = useSelector((store: RootState) => store.game.apple);

  const isSnake = snake.some((s) => s.x === x && s.y === y);
  const isApple = x === apple.x && y === apple.y;
  let buttonStyle = "";

  if ((isSnake && isApple) || isSnake) {
    buttonStyle = "snake";
  } else if (isApple) {
    buttonStyle = "apple";
  }

  return <button className={`square ${buttonStyle}`}></button>;
};

export default Square;
