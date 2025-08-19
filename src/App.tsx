import useGameControls from "./hooks/useGameControls";

import Header from "./components/Header";
import Board from "./components/Board";
import Status from "./components/Status";

import "./App.scss";

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
