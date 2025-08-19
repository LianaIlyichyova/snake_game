import Board from "./components/Board";

import Status from "./components/Status";

import useGameControls from "./hooks/useGameControls";

import "./App.scss";
import Header from "./components/Header";

function App() {
  const { clickHandler } = useGameControls();
  return (
    <div className="app">
      <Header />
      <Board />
      <Status clickHandler={clickHandler} />
    </div>
  );
}

export default App;
