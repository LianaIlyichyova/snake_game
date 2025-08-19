import { useRef, useEffect, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  changeStatus,
  moveSnake,
  setDirection,
  checkApple,
  checkBestScore,
  updateValues,
  saveKey,
} from "../store/gameSlice";

import type { AppDispatch, RootState } from "../store";

import { DIRECTION_KEYS, STATUS_KEYS } from "../constants";

const useGameControls = () => {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.game.status);
  const speed = useSelector((state: RootState) => state.game.speed);

  // keep timer id, so we can stop it later
  const timer = useRef<number | null>(null);

  // one tick
  const update = useCallback(() => {
    dispatch(setDirection());
    dispatch(checkApple());
    dispatch(moveSnake());
  }, [dispatch]);

  const stopTimer = () => {
    if (timer.current !== null) {
      clearInterval(timer.current);
      timer.current = null;
    }
  };

  const startTimer = useCallback(() => {
    stopTimer();
    timer.current = window.setInterval(update, speed);
  }, [speed, update]);

  // restart timer when speed changes
  useEffect(() => {
    if (timer.current !== null) {
      startTimer();
    }
  }, [speed, startTimer]);

  // stop timer if game is over or paused
  useEffect(() => {
    if (status === "Restart" || status === "Resume") {
      stopTimer();
    }
  }, [status]);

  // stop timer when component is destroyed
  useEffect(() => {
    return () => stopTimer();
  }, []);

  const clickHandler = useCallback(() => {
    if (status === "Restart") {
      stopTimer();
      dispatch(checkBestScore());
      dispatch(updateValues());
      startTimer();
      dispatch(changeStatus());
      return;
    }

    if (status === "Start" || status === "Resume") {
      startTimer();
    } else if (status === "Pause") {
      stopTimer();
    }

    dispatch(changeStatus());
  }, [status, dispatch, startTimer]);

  // listen for keyboards (Space or Enter) to handle start or pause
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (STATUS_KEYS.includes(event.key)) {
        event.preventDefault();
        clickHandler();
      }

      if (DIRECTION_KEYS.includes(event.key)) {
        event.preventDefault();
        dispatch(saveKey(event.key));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [clickHandler, dispatch]);

  return { clickHandler };
};

export default useGameControls;
