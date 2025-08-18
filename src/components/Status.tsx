// components/Status.tsx
import { useSelector } from "react-redux";

import type { RootState } from "../store";

const Status = ({ clickHandler }: { clickHandler: () => void }) => {
  const status = useSelector((state: RootState) => state.game.status);

  return (
    <button className="start-button" onClick={clickHandler}>
      {status}
    </button>
  );
};

export default Status;
