import { useEffect, useState } from "react";
import { useMap } from "../contexts/MapContext";
import Frame from "./Frame";
import { CAMERA_MOV_START, GRID_SIZE } from "../constants/initialValues";
import { GameState } from "../types";

const Map = () => {
  const { dashboardRef, drawCanvas, isMouseDown, player, speed, gameState } =
    useMap();

  const initialCameraPosition = GRID_SIZE * -5;

  const [canvasPosX, setCanvasPosX] = useState(initialCameraPosition);
  const [canvasPosY, setCanvasPosY] = useState(0);

  // Dibujamos el mapa apenas entrar
  useEffect(() => {
    drawCanvas();
  }, []);

  // Cada vez que player.current.posX cambie, lo chequeamos
  useEffect(() => {
    if (
      player.current.posX <= CAMERA_MOV_START &&
      gameState === GameState.LISTO
    ) {
      setCanvasPosX(initialCameraPosition);
    }
    if (player.current.posX >= CAMERA_MOV_START) {
      setCanvasPosX((prev) => prev - speed.x);
    }
  }, [player.current.posX]);

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
