import "./CategoriesMain.scss";
import useCategories from "../../hooks/useCategories";
import Category from "../../components/Category";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDraggable } from "../../hooks/useDraggble";

const CategoriesMain = () => {
  const handleDrag = useCallback(
    ({ x, y }: { x: number; y: number }) => ({
      x: Math.max(-1000, x),
      y: Math.max(0, y),
    }),
    []
  );

  const [ref] = useDraggable({
    onDrag: handleDrag,
  });

  //-------------------

  const [zoom, setZoom] = useState(1);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transform = `scale(${zoom})`;
      containerRef.current.style.transformOrigin = "top left";
    }
  }, [zoom]);

  const handleZoomIn = () => {
    setZoom((prevZoom) => prevZoom + 0.1);
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.1));
  };

  // const handleZoom = (event: WheelEvent) => {
  //   event.preventDefault();

  //   const zoomFactor = event.deltaY > 0 ? 0.1 : -0.1;
  //   setZoom((prevZoom) => Math.max(prevZoom + zoomFactor, 0.1));
  // };

  // useEffect(() => {
  //   if (containerRef.current) {
  //     containerRef.current.addEventListener("wheel", handleZoom);

  //     return () => {
  //       containerRef.current?.removeEventListener("wheel", handleZoom);
  //     };
  //   }
  // }, []);

  //--------------

  const { addCategory, categoryGraph, editCategory, removeCategory } =
    useCategories();

  if (!categoryGraph.length) return null;

  return (
    <div ref={containerRef}>
      <div className="categoryMain" ref={ref}>
        <button onClick={handleZoomIn}>Zoom In</button>
        <button onClick={handleZoomOut}>Zoom Out</button>
        <Category
          addCategory={addCategory}
          editCategory={editCategory}
          removeCategory={removeCategory}
          isInputView={true}
          {...categoryGraph[0]}
        />
      </div>
    </div>
  );
};

export default CategoriesMain;
