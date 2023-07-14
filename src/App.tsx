import "./App.scss";
import CategoriesMain from "./views/CategoriesMain";
import Header from "./components/Header";
import { useCallback } from "react";
import { useDraggable } from "./hooks/useDraggble";
import { useZoom } from "./hooks/useZoom";
import ScrollButton from "./components/ScrollButton";

function App() {
  const handleDrag = useCallback(
    ({ x, y }: { x: number; y: number }) => ({
      x: Math.max(-1000, x),
      y: Math.max(0, y),
    }),
    []
  );

  const { legacyRef, handleReset } = useDraggable({
    onDrag: handleDrag,
  });

  const {
    zoomContainerRef,
    handleZoomIn,
    handleZoomOut,
    changeSelectorZoom,
    zoom,
  } = useZoom();

  return (
    <div className="App">
      <ScrollButton direction="up" />
      <ScrollButton direction="down" />
      <ScrollButton direction="right" />
      <ScrollButton direction="left" />
      <Header
        handleReset={handleReset}
        handleZoomIn={handleZoomIn}
        handleZoomOut={handleZoomOut}
        changeSelectorZoom={changeSelectorZoom}
        zoom={zoom}
      />
      <CategoriesMain
        legacyRef={legacyRef}
        zoomContainerRef={zoomContainerRef}
      />
    </div>
  );
}

export default App;
