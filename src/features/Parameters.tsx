import { ChangeEvent, useEffect, useState } from "react";
import { useMap } from "../contexts/MapContext";
import { GameState } from "../types";

const Parameters = () => {
  const { speed, player, drawCanvas, gameState } = useMap();

  const [posX, setPosX] = useState(player.current.posX);
  const [posY, setPosY] = useState(player.current.posY);

  const handlePositionX = (e: ChangeEvent<HTMLInputElement>) => {
    if (gameState === GameState.LISTO) {
      player.current.posX = Number(e.target.value);
    }
  };

  const handlePositionY = (e: ChangeEvent<HTMLInputElement>) => {
    if (gameState === GameState.LISTO) {
      player.current.posY = Number(e.target.value);
    }
  };

  // Volvemos a dibujar el canvas cada vez que cambiemos la posición SOLO si estamos en estado LISTO
  useEffect(() => {
    if (gameState === GameState.LISTO) {
      drawCanvas();
    }
    setPosY(player.current.posY);
    setPosX(player.current.posX);
  }, [player.current.posX, player.current.posY]);

  return (
    <div className=" flex flex-col items-center gap-4">
      <h4 className=" text-2xl font-semibold">Posición inicial</h4>
      <div className=" grid grid-cols-2 gap-2 ">
        <div className=" flex flex-col gap-1">
          <h5>Posición X</h5>
          <input
            className=" border border-black rounded-md py-1.5 px-3 disabled:bg-[#c6c6c6]/20 disabled:opacity-65
             disabled:cursor-not-allowed"
            type="number"
            placeholder="Posicion X"
            disabled={gameState !== GameState.LISTO}
            value={posX}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handlePositionX(e)}
          />
        </div>

        <div className=" flex flex-col gap-1">
          <h5>Posición Y</h5>
          <input
            className=" border border-black rounded-md py-1.5 px-3 disabled:bg-[#c6c6c6]/20 disabled:opacity-65
             disabled:cursor-not-allowed"
            type="number"
            placeholder="Posicion y"
            disabled={gameState !== GameState.LISTO}
            value={posY}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handlePositionY(e)}
          />
        </div>

        <div className=" flex flex-col gap-1">
          <h5>Velocidad X</h5>
          <input
            className=" border border-black rounded-md py-1.5 px-3 disabled:bg-[#c6c6c6]/20 disabled:opacity-65
             disabled:cursor-not-allowed"
            type="number"
            placeholder="Velocidad y"
            value={speed.x}
            disabled
          />
        </div>

        <div className=" flex flex-col gap-1">
          <h5>Velocidad Y</h5>
          <input
            className=" border border-black rounded-md py-1.5 px-3 disabled:bg-[#c6c6c6]/20 disabled:opacity-65
             disabled:cursor-not-allowed"
            type="number"
            placeholder="Velocidad y"
            value={speed.y}
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default Parameters;
