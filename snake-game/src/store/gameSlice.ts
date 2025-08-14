// store/gameSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const BOARD_SIZE = 10;

const gameSlice = createSlice({
  name: "game",
  initialState: {
    // Game status
    status: "Start",
    statusValues: {
      Start: "Pause",
      Pause: "Resume",
      Resume: "Pause",
      Restart: "Pause",
    },
    // Game objects
    snake: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ],
    snakeHead: { x: 1, y: 0 },
    snakeSize: 2,
    bestScore: 0,
    apple: { x: 1, y: 1 },
    // Direction controller
    direction: "ArrowRight",
    stopKeyCombinations: [
      ["ArrowUp", "ArrowDown"],
      ["ArrowDown", "ArrowUp"],
      ["ArrowLeft", "ArrowRight"],
      ["ArrowRight", "ArrowLeft"],
    ],
    savedKey: "ArrowRight",
  },
  reducers: {
    // Game status actions
    changeStatus(state) {
      const key = state.status as keyof typeof state.statusValues;
      state.status = state.statusValues[key];
    },

    // Game objects actions
    moveSnake(state) {
      let { x, y } = state.snakeHead;

      // 1. Определяем новые координаты головы
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

      // 2. Проверка выхода за границы
      if (x < 0 || x >= BOARD_SIZE || y < 0 || y >= BOARD_SIZE) {
        state.status = "Restart";
        return;
      }

      // 3. Проверка столкновения с телом
      if (state.snake.some((segment) => segment.x === x && segment.y === y)) {
        state.status = "Restart";
        return;
      }

      // 4. Двигаем змею
      state.snakeHead = { x, y };
      state.snake.push({ x, y });
      state.snake = state.snake.slice(-state.snakeSize);
    },

    checkBestScore(state) {
      if (state.status === "Restart") {
        const currentScore = state.snake.length;
        console.log(currentScore);
        if (currentScore > state.bestScore) {
          state.bestScore = currentScore;
        }
      }
    },

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
    },

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
      }
    },

    // Direction controller actions
    saveKey(state, action) {
      for (const [a, b] of state.stopKeyCombinations) {
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
