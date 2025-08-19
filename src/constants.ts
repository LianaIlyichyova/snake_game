const BOARD_SIZE = 10;

const STATUS_KEYS = ["Enter", " "];

const DIRECTION_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

const STOP_KEY_COMBINATIONS = [
  ["ArrowUp", "ArrowDown"],
  ["ArrowDown", "ArrowUp"],
  ["ArrowLeft", "ArrowRight"],
  ["ArrowRight", "ArrowLeft"],
];

const STATUS_VALUES = {
  Start: "Pause",
  Pause: "Resume",
  Resume: "Pause",
  Restart: "Pause",
};

export {
  BOARD_SIZE,
  STATUS_KEYS,
  DIRECTION_KEYS,
  STOP_KEY_COMBINATIONS,
  STATUS_VALUES,
};
