import { useSelector } from "react-redux";

import type { RootState } from "../store";
import Help from "./Help";

const Header = () => {
  const bestScore = useSelector((state: RootState) => state.game.bestScore);
  const currentScore = useSelector((state: RootState) => state.game.snakeSize);

  return (
    <div className="header">
      <span className="best-score">Best Score: {bestScore}</span>
      <span>Current Score: {currentScore}</span>
      <Help />
    </div>
  );
};

export default Header;
