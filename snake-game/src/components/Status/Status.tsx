import { useDispatch, useSelector } from "react-redux";
import {
  changeStatus,
  moveSnake,
  setDirection,
  checkApple,
  checkBestScore,
  updateValues,
} from "../../store/gameSlice";

import type { AppDispatch, RootState } from "../../store";
import { useRef } from "react";

const Status = () => {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.game.status);

  const timer = useRef<number | null>(null);
  const update = () => {
    dispatch(setDirection());
    dispatch(checkApple());
    dispatch(moveSnake());
  };

  const startTimer = () => (timer.current = setInterval(() => update(), 700));

  const stopTimer = () => {
    if (timer.current !== null) {
      clearInterval(timer.current);
    }
  };

  const clickHandler = () => {
    if (status !== "Pause") {
      startTimer();
    } else {
      stopTimer();
      dispatch(checkBestScore());
      dispatch(updateValues());
    }
    dispatch(changeStatus());
  };

  return (
    <button className="start-button" onClick={clickHandler}>
      {status}
    </button>
  );
};

export default Status;
