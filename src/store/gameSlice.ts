import { createSlice } from "@reduxjs/toolkit";
import { STATUS_VALUES, BOARD_SIZE, STOP_KEY_COMBINATIONS } from "../constants";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    status: "Start",

    snake: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ],
    snakeHead: { x: 1, y: 0 },
    snakeSize: 2,
    bestScore: 2,
    speed: 900,
    apple: { x: 1, y: 1 },
    direction: "ArrowRight",

    savedKey: "ArrowRight",
  },
  reducers: {
    // switch to next status (Start → Pause → Resume → Restart)
    changeStatus(state) {
      const key = state.status as keyof typeof STATUS_VALUES;
      state.status = STATUS_VALUES[key];
    },

    // move snake in current direction, check walls and self-hit
    moveSnake(state) {
      let { x, y } = state.snakeHead;

      switch (state.direction) {
        case "ArrowRight":
          x += 1;
          break;
        case "ArrowLeft":
          x -= 1;
          break;
        case "ArrowUp":
          y -= 1;
          break;
        case "ArrowDown":
          y += 1;
          break;
      }

      // game over if snake goes out of board
      if (x < 0 || x >= BOARD_SIZE || y < 0 || y >= BOARD_SIZE) {
        state.status = "Restart";
        return;
      }

      // game over if snake bites itself
      if (state.snake.some((segment) => segment.x === x && segment.y === y)) {
        state.status = "Restart";
        return;
      }

      // move head forward
      state.snakeHead = { x, y };
      state.snake.push({ x, y });
      state.snake = state.snake.slice(-state.snakeSize);
    },

    // save best score
    checkBestScore(state) {
      if (state.status === "Restart") {
        if (state.snakeSize > state.bestScore) {
          state.bestScore = state.snakeSize;
        }
      }
    },

    // reset values when restart
    updateValues(state) {
      state.snake = [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
      ];
      state.snakeHead = { x: 1, y: 0 };
      state.snakeSize = 2;
      state.apple = { x: 1, y: 1 };
      state.direction = "ArrowRight";
      state.savedKey = "ArrowRight";
      state.speed = 700;
    },

    // check if snake eats apple - grow  + faster speed
    checkApple(state) {
      const { apple, snakeHead, snake } = state;
      if (apple.x === snakeHead.x && apple.y === snakeHead.y) {
        let isOnSnake;
        do {
          apple.x = Math.floor(Math.random() * BOARD_SIZE);
          apple.y = Math.floor(Math.random() * BOARD_SIZE);
          isOnSnake = snake.find((s) => s.x === apple.x && s.y === apple.y);
        } while (isOnSnake);
        state.apple = { ...apple };
        state.snakeSize++;
        state.speed -= 25;
      }
    },

    // save last pressed arrow key handle last direction at pause
    saveKey(state, action) {
      for (const [a, b] of STOP_KEY_COMBINATIONS) {
        if (a === state.direction && b === action.payload) return;
      }
      state.savedKey = action.payload;
    },

    setDirection(state) {
      state.direction = state.savedKey;
    },
  },
});

export const {
  changeStatus,
  moveSnake,
  saveKey,
  setDirection,
  checkApple,
  checkBestScore,
  updateValues,
} = gameSlice.actions;

export const gameReducer = gameSlice.reducer;
