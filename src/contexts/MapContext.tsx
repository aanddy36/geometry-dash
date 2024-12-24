import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Game } from "../classes/Game";
import { GameState, PlayerStats } from "../types";
import { Player } from "../classes/Player";

interface MapContextProps {
  canvas: React.MutableRefObject<HTMLCanvasElement | null>;
  gameState: GameState;
  playerStats: PlayerStats;
  setIsMousePressed: React.Dispatch<React.SetStateAction<boolean>>;
  startGame: () => void;
  continueGame: () => void;
  stopGame: () => void;
  resetGame: () => void;
  finishGame: () => void;
}

const MapContext = createContext<MapContextProps>({} as MapContextProps);

interface Props {
  children: React.ReactNode;
}

const MapProvider: FC<Props> = ({ children }) => {
  const canvas = useRef<HTMLCanvasElement | null>(null); // Esta será la referencia al HTML <canvas>
  let game = useRef<Game>(); // Una instancia de Game.
  let player = useRef<Player>();

  //Los estados los creamos para controlar la animación desde fuera
  const [gameState, setGameState] = useState<GameState>(GameState.LISTO); // Actualizar el estado del juego
  const [isMousePressed, setIsMousePressed] = useState(false); // Manejamos si se hunde click para saltar o no.
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    positionX: 0,
    positionY: 0,
    speedX: 0,
    speedY: 0,
    angle: 0,
    rotationRate: 0,
  });

  useEffect(() => {
    if (canvas.current) {
      game.current = new Game(canvas.current, updatePlayerStats);
      game.current.update();

      player.current = game.current.player;
    }
  }, []);

  const updatePlayerStats = useCallback((stats: PlayerStats) => {
    setPlayerStats(stats);
  }, []);

  /* useEffect(() => {
    console.log(playerStats);
  }, [playerStats]); */

  //Cada vez que cambie isMousePressed, cambiamos el estado del juego
  useEffect(() => {
    if (game.current) {
      game.current.player.isMousePressed = isMousePressed;
    }
  }, [isMousePressed]);

  const startGame = () => {
    if (game.current) {
      game.current.startGame(); // Llamamos al método startGame
      setGameState(GameState.ACTIVO); // Actualizamos el gameState cuando se inicia el juego
    }
  };

  const continueGame = () => {
    if (game.current) {
      game.current.continueGame(); // Llamamos al método startGame
      setGameState(GameState.ACTIVO); // Actualizamos el gameState cuando se inicia el juego
    }
  };

  const stopGame = () => {
    if (game.current) {
      game.current.stopGame(); // Llamamos al método startGame
      setGameState(GameState.SUSPENDIDO); // Actualizamos el gameState cuando se inicia el juego
    }
  };

  const resetGame = () => {
    if (game.current) {
      game.current.resetGame(); // Llamamos al método startGame
      setGameState(GameState.LISTO); // Actualizamos el gameState cuando se inicia el juego
    }
  };

  const finishGame = () => {
    if (game.current) {
      game.current.finishGame(); // Llamamos al método startGame
      setGameState(GameState.FINALIZADO); // Actualizamos el gameState cuando se inicia el juego
    }
  };

  return (
    <MapContext.Provider
      value={{
        canvas,
        gameState,
        playerStats,
        setIsMousePressed,
        startGame,
        continueGame,
        stopGame,
        resetGame,
        finishGame,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

const useMap = () => useContext(MapContext);

export { MapProvider, useMap };
