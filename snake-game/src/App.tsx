import { useDispatch } from "react-redux";
import { saveKey } from "./store/gameSlice";
import Board from "./components/Board";

import type { AppDispatch } from "./store";
import Status from "./components/Status";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    dispatch(saveKey(event.key));
  };
  return (
    <div className="main-content" onKeyDownCapture={keyDownHandler}>
      <Board />
      <Status />
    </div>
  );
}

export default App;
