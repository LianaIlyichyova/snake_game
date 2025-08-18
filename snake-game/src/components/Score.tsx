// components/Status.tsx
import { useSelector } from "react-redux";

import type { RootState } from "../store";

const Score = () => {
  const bestScore = useSelector((state: RootState) => state.game.bestScore);

  return <span>Best Score: {bestScore}</span>;
};

export default Score;
