import React, { useRef } from "react";
import "./ScrollButton.scss";
import Scroll from "../../assets/scroll.svg";

interface ScrollButtonProps {
  direction: "up" | "down" | "left" | "right";
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ direction }) => {
  const scrollTimeoutRef = useRef<number | null>(null);

  const startScroll = () => {
    if (!scrollTimeoutRef.current) {
      scrollTimeoutRef.current = window.requestAnimationFrame(handleScroll);
    }
  };

  const stopScroll = () => {
    if (scrollTimeoutRef.current) {
      window.cancelAnimationFrame(scrollTimeoutRef.current);
      scrollTimeoutRef.current = null;
    }
  };

  const handleScroll = () => {
    switch (direction) {
      case "up":
        window.scrollBy({ top: -5 });
        break;
      case "down":
        window.scrollBy({ top: 5 });
        break;
      case "left":
        window.scrollBy({ left: -5 });
        break;
      case "right":
        window.scrollBy({ left: 5 });
        break;
      default:
        break;
    }

    scrollTimeoutRef.current = window.requestAnimationFrame(handleScroll);
  };

  return (
    <button
      className={`scrollButton ${direction}`}
      onMouseDown={startScroll}
      onMouseUp={stopScroll}
      onMouseLeave={stopScroll}
    >
      <img className="logoScroll" src={Scroll} alt="scroll" />
    </button>
  );
};

export default ScrollButton;
