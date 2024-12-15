import Button from "../components/Button";
import { useMap } from "../contexts/MapContext";
import { GameState } from "../types";

const Actions = () => {
  const { startGame, stopGame, resetGame, finishGame, gameState } = useMap();

  return (
    <div className=" flex flex-col gap-4 items-center">
      {/* Estado del juego */}
      <div className=" flex flex-col items-center gap-4">
        <h4 className=" text-2xl font-semibold">Estado del juego</h4>
        <div className="flex gap-3">
          <Button
            handleClick={startGame}
            text={gameState === GameState.SUSPENDIDO ? "Reanudar" : "Iniciar"}
            disabled={
              gameState === GameState.ACTIVO ||
              gameState === GameState.FINALIZADO
            }
          />
          <Button
            handleClick={stopGame}
            text="Detener"
            disabled={
              gameState === GameState.SUSPENDIDO ||
              gameState === GameState.LISTO ||
              gameState === GameState.FINALIZADO
            }
          />
          <Button
            handleClick={resetGame}
            text="Resetear"
            disabled={gameState === GameState.LISTO}
          />
          <Button
            handleClick={finishGame}
            text="Terminar"
            disabled={
              gameState === GameState.FINALIZADO ||
              gameState === GameState.LISTO
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Actions;
