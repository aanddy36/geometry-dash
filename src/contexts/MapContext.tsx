import {
  createContext,
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { GameState, Player, Position, Speeds } from "../types";
import { initialPlayer } from "../constants/initialValues";
import {
  createGrid,
  createPlayer,
  drawObstacles,
  setBoundaries,
} from "../utils/canvasBuild";
import { jump, movePlayer } from "../utils/playerActions";

interface MapContextProps {
  dashboardRef: React.MutableRefObject<HTMLCanvasElement | null>;
  gameState: GameState;
  speed: Speeds;
  player: React.MutableRefObject<Player>;
  isMouseDown: React.MutableRefObject<boolean>;
  startGame: () => void;
  stopGame: () => void;
  finishGame: () => void;
  resetGame: () => void;
  jumpPlayer: () => void;
  drawCanvas: () => void;
}

const MapContext = createContext<MapContextProps>({} as MapContextProps);

interface Props {
  children: React.ReactNode;
}

const initialSpeed: Speeds = {
  x: 3.25,
  y: 0,
};

const MapProvider: FC<Props> = ({ children }) => {
  //REFERENCIAS DEL MAPA
  const dashboardRef = useRef<HTMLCanvasElement | null>(null);
  const gameState = useRef(GameState.LISTO);
  const bgColor = useRef("#c6c6c6"); // Color del fondo
  const speed = useRef(initialSpeed); // velocidad del jugador
  const player = useRef<Player>({ ...initialPlayer }); // jugador
  const isMidAirRef = useRef(false); // Dirá si estamos en el aire o no
  const isMouseDown = useRef(false); //Dirá si se está manteniendo hundido el click para seguir los saltos

  const [pos1, setPos1] = useState<Position>();
  const [pos2, setPos2] = useState<Position>();
  const lowestY = useRef(player.current.posY);

  // ID de la animación. Esta se guarda para poder parar y continuar.
  const [animationId, setAnimationId] = useState<number | null>(null);

  // Animación del mapa. Básicamente es correr drawCanvas() frame por frame.
  const animate = () => {
    //console.log("Corriendo");

    if (isMouseDown.current) {
      jumpPlayer();
    }

    drawCanvas();

    const id = requestAnimationFrame(animate); // Solicita el siguiente cuadro de animación
    setAnimationId(id); // Guarda el ID de la animación
  };

  //Dibujo del juego
  const drawCanvas = () => {
    const map = dashboardRef.current;
    const ctx = map?.getContext("2d");

    if (map && ctx) {
      ctx.clearRect(0, 0, map.width, map.height); // Limpiar el canvas

      setBoundaries(map, ctx, bgColor.current); // Tamaño y color
      createGrid(map, ctx); // Dibujar grilla
      drawObstacles(ctx); //Diseñar el suelo

      //En caso de haber iniciado la partida, movemos al jugador
      if (gameState.current === GameState.ACTIVO) {
        movePlayer(
          speed.current,
          player.current,
          isMidAirRef,
          finishGame,
          setPos2,
          lowestY
        );
      }
      createPlayer(ctx, player.current); // Agregar jugador
    }
  };

  useEffect(() => {
    if (pos1) {
      console.log(`Posicion 1: ${JSON.stringify(pos1)}`);
    }
  }, [pos1]);

  useEffect(() => {
    if (pos2) {
      console.log(`Posicion 2: ${JSON.stringify(pos2)}`);
      console.log(`Mas Alto Y: ${lowestY.current}`);
    }
  }, [pos2]);

  const jumpPlayer = () =>
    jump(
      isMidAirRef,
      gameState.current,
      speed.current,
      setPos1,
      player.current
    );

  // Iniciar el juego
  const startGame = () => {
    if (!animationId) {
      animate();
    }
    bgColor.current = "#88e884"; // Cambiar color de fondo
    gameState.current = GameState.ACTIVO; // Cambiar el estado del juego
  };

  // Pausar el juego
  const stopGame = () => {
    bgColor.current = "#eded77"; // Cambiar color de fondo
    gameState.current = GameState.SUSPENDIDO; // Cambiar el estado del juego
  };

  // Finalizar el juego
  const finishGame = () => {
    bgColor.current = "#e88488"; // Cambiar color de fondo
    gameState.current = GameState.FINALIZADO; // Cambiar el estado del juego
    if (animationId) {
      drawCanvas(); // Redibujar el mapa
      cancelAnimationFrame(animationId); // Cancelar animación
      setAnimationId(null); // Resetear ID de animación
    }
  };

  // Reiniciar el juego
  const resetGame = () => {
    bgColor.current = "#c6c6c6"; // Cambiar color de fondo
    speed.current = initialSpeed; // Resetear velocidad
    player.current.posX = 10; // Resetear posición del jugador
    player.current.posY = 150;
    if (gameState.current === GameState.FINALIZADO) {
      drawCanvas(); // Redibujar el mapa si se finalizó el juego
    }
    gameState.current = GameState.LISTO; // Cambiar estado a listo
  };

  return (
    <MapContext.Provider
      value={{
        dashboardRef,
        gameState: gameState.current,
        speed: speed.current,
        player,
        isMouseDown,
        startGame,
        stopGame,
        finishGame,
        resetGame,
        jumpPlayer,
        drawCanvas,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

const useMap = () => useContext(MapContext);

export { MapProvider, useMap };
