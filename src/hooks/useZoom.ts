import { useEffect, useRef, useState } from "react";

export const useZoom = () => {
  const [zoom, setZoom] = useState(1);

  const zoomContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (zoomContainerRef.current) {
      zoomContainerRef.current.style.transform = `scale(${zoom})`;
      zoomContainerRef.current.style.transformOrigin = "center";
    }
  }, [zoom]);

  const handleZoomIn = (array: number[]) => {
    const currentIndex = array.indexOf(zoom);
    const nextIndex = Math.min(currentIndex + 1, array.length - 1);
    const nextZoom = array[nextIndex];
    setZoom(nextZoom);
  };

  const handleZoomOut = (array: number[]) => {
    const currentIndex = array.indexOf(zoom);
    const prevIndex = Math.max(currentIndex - 1, 0);
    const prevZoom = array[prevIndex];
    setZoom(prevZoom);
  };

  const changeSelectorZoom = (item: number) => {
    setZoom(item);
  };

  return {
    zoomContainerRef,
    handleZoomIn,
    handleZoomOut,
    changeSelectorZoom,
    zoom,
  };
};
