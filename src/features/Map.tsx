import { useEffect } from "react";
import { useMap } from "../contexts/MapContext";
import Frame from "./Frame";

const Map = () => {
  const { dashboardRef, drawCanvas, isMouseDown } = useMap();

  // Dibujamos el mapa apenas entrar
  useEffect(() => {
    drawCanvas();
  }, []);

  return (
    <Frame>
      <canvas
        ref={dashboardRef}
        onMouseDown={() => (isMouseDown.current = true)}
        onMouseUp={() => (isMouseDown.current = false)}
        className="absolute bottom-0 left-0"
      ></canvas>
    </Frame>
  );
};

export default Map;
