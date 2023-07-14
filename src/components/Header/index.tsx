import "./Header.scss";
import Reset from "../../assets/goToCenter.svg";
import Plus from "../../assets/plus2.svg";
import Minus from "../../assets/minus2.svg";
import ZoomSelector from "../ZoomSelector";
import { ZOOM_BUTTON } from "../../data/selectData.data";

interface PropsType {
  handleReset: () => void;
  handleZoomOut: (array: number[]) => void;
  handleZoomIn: (array: number[]) => void;
  changeSelectorZoom: (item: number) => void;
  zoom: number;
}

const Header = ({
  handleReset,
  handleZoomOut,
  handleZoomIn,
  changeSelectorZoom,
  zoom,
}: PropsType) => {
  return (
    <div className="header">
      <button className="button resetButton" onClick={handleReset}>
        <img className="logoButton" src={Reset} alt="reset" />
      </button>
      <button className="button" onClick={() => handleZoomIn(ZOOM_BUTTON)}>
        <img className="logoButton" src={Plus} alt="plus" />
      </button>
      <ZoomSelector changeSelectorZoom={changeSelectorZoom} zoom={zoom} />
      <button className="button" onClick={() => handleZoomOut(ZOOM_BUTTON)}>
        <img className="logoButton" src={Minus} alt="minus" />
      </button>
    </div>
  );
};

export default Header;
