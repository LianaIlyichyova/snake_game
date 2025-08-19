import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faArrowUp,
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faKeyboard,
  faArrowTurnDown,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { changeStatus } from "../store/gameSlice";

const Help = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const status = useSelector((state: RootState) => state.game.status);
  const dispatch = useDispatch();

  const openPopup = () => {
    setIsPopupOpen(true);
    //Pause game at opening the modal
    if (status === "Pause") {
      dispatch(changeStatus());
    }
  };

  return (
    <>
      <button className="help-button" onClick={openPopup}>
        <FontAwesomeIcon icon={faCircleInfo} size="lg" />
      </button>

      {/* Popup */}
      {isPopupOpen && (
        <div className="help-overlay" onClick={() => setIsPopupOpen(false)}>
          <div className="help-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Game Guide</h2>
            <div className="controls-list">
              <div className="row">
                <div className="controls">
                  <FontAwesomeIcon icon={faArrowUp} />
                  <FontAwesomeIcon icon={faArrowDown} />
                  <FontAwesomeIcon icon={faArrowLeft} />
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
                <p>— Snake controls</p>
              </div>
              <div className="row">
                <div className="controls">
                  <FontAwesomeIcon icon={faKeyboard} />
                  <FontAwesomeIcon
                    icon={faArrowTurnDown}
                    style={{ transform: "rotate(90deg)" }}
                  />
                </div>
                <p>— Start / Restart</p>
              </div>
            </div>
            <button onClick={() => setIsPopupOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Help;
