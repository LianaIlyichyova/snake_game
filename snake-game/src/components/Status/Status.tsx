// components/Status.tsx
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

  const startTimer = () => {
    stopTimer();
    timer.current = setInterval(() => update(), 700);
  };

  const stopTimer = () => {
    if (timer.current !== null) {
      clearInterval(timer.current);
      timer.current = null;
    }
  };

  const clickHandler = () => {
    if (status === "Restart") {
      stopTimer();
      dispatch(checkBestScore());
      dispatch(updateValues());
      startTimer();
      dispatch(changeStatus());
      return;
    }

    if (status !== "Pause") {
      startTimer();
    } else {
      stopTimer();
    }

    dispatch(changeStatus());
  };

  if (status === "Restart") {
    stopTimer();
  }

  return (
    <button className="start-button" onClick={clickHandler}>
      {status}
    </button>
  );
};

export default Status;
