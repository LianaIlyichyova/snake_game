import Board from "./components/Board";
import Score from "./components/Score";

import Status from "./components/Status";

import useGameControls from "./hooks/useGameControls";

import "./App.css";

function App() {
  const { clickHandler } = useGameControls();
  return (
    <div className="app">
      <Score />
      <Board />
      <Status clickHandler={clickHandler} />
    </div>
  );
}

export default App;
