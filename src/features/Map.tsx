import { useEffect, useState } from "react";
import { useMap } from "../contexts/MapContext";
import Frame from "./Frame";

const Map = () => {
  const { dashboardRef, drawCanvas, isMouseDown, player, speed, gameState } =
    useMap();

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
        className="absolute bottom-0"
      ></canvas>
    </Frame>
  );
};

export default Map;
