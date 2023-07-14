import { useState } from "react";
import Popper from "../Popper";
import "./ZoomSelector.scss";
import { ZOOM_BUTTON } from "../../data/selectData.data";

interface PropsType {
  changeSelectorZoom: (item: number) => void;
  zoom: number;
}

const ZoomSelector = ({ changeSelectorZoom, zoom }: PropsType) => {
  const [openSelector, setOpenSelector] = useState(false);

  return (
    <div className="selector">
      <button
        className={openSelector ? "button active" : "button"}
        onClick={() => setOpenSelector(!openSelector)}
      >
        {`${zoom * 100}%`}
      </button>
      {openSelector && (
        <Popper
          open={openSelector}
          onClickOutside={() => setOpenSelector(false)}
        >
          <div className="selectItems">
            {ZOOM_BUTTON.map((but) => (
              <button
                key={but}
                className={zoom === but ? "item active" : "item"}
                onClick={() => changeSelectorZoom(but)}
              >{`${but * 100}%`}</button>
            ))}
          </div>
        </Popper>
      )}
    </div>
  );
};

export default ZoomSelector;
