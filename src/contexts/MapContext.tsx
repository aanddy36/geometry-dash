import {
  createContext,
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  GameState,
  Player,
  Position,
  Section,
  SectionsPair,
  Speeds,
} from "../types";
import {
  CAMERA_MOV_START,
  initialPlayer,
  initialSpeed,
  MAP_WIDTH,
} from "../constants/initialValues";
import {
  createGrid,
  createPlayer,
  drawObstacles,
  setBoundaries,
} from "../utils/canvasBuild";
import { jump, movePlayer } from "../utils/playerActions";
import { generateInitialSections } from "../utils/obstacleConstructors";

interface MapContextProps {
  dashboardRef: React.MutableRefObject<HTMLCanvasElement | null>;
  gameState: GameState;
  speed: Speeds;
  player: React.MutableRefObject<Player>;
  isMouseDown: React.MutableRefObject<boolean>;
  isMapMoving: React.MutableRefObject<boolean>;
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

let allSections: Section[] = generateInitialSections();

const INITIAL_OBS: SectionsPair = {
  current: allSections[0],
  next: allSections[1],
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
  const isMapMoving = useRef(false); //Dirá si el frame debe moverse o no
  //const obstacles = useRef(initialObstacles); //Los obstáculos del mapa
  const sections = useRef<SectionsPair>(INITIAL_OBS); //La sección actual y la siguiente (contienen los obstaculos)
  const mapSection = useRef(1); // En qué sección vamos
  const distanceTracker = useRef(0); // Llevará el total de la distancia en X transladada

  const [pos1, setPos1] = useState<Position>();
  const [pos2, setPos2] = useState<Position>();
  const lowestY = useRef(player.current.posY);

  // ID de la animación. Esta se guarda para poder parar y continuar.
  const [animationId, setAnimationId] = useState<number | null>(null);

  // Animación del mapa. Básicamente es correr drawCanvas() frame por frame.
  const animate = () => {
    //console.log("Corriendo");

    //Saltamos
    if (isMouseDown.current) {
      jumpPlayer();
    }

    //Llevamos el seguimiento de en qué sección vamos
    if (gameState.current === GameState.ACTIVO && isMapMoving.current) {
      moveCamera(); //Con esto dividimos el mapa en partes, ya que no es viable renderizar todo el mapa
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
      ctx.clearRect(0, 0, map.width, map.height); // 1. Limpiar el canvas

      setBoundaries(map, ctx, bgColor.current); // 2. Tamaño y color del canvas
      createGrid(map, ctx); // 3. Dibujar grilla

      // 4.5. Después del PUNTO DE CÁMARA, se moverán los obstáculos en el eje X.
      drawObstacles(ctx, speed.current, isMapMoving.current, sections); // 4. Diseñar obstáculos

      //5. Movimiento del jugador y evaluación de colisión.
      if (gameState.current === GameState.ACTIVO) {
        movePlayer(
          speed.current,
          player.current,
          isMidAirRef,
          finishGame,
          setPos2,
          lowestY,
          isMapMoving,
          sections.current
        );
      }
      createPlayer(ctx, player.current); // 6. Agregar jugador
    }
  };

  useEffect(() => {
    if (pos1) {
      //console.log(`Posicion 1: ${JSON.stringify(pos1)}`);
    }
  }, [pos1]);

  useEffect(() => {
    if (pos2) {
      //console.log(`Posicion 2: ${JSON.stringify(pos2)}`);
      //console.log(`Mas Alto Y: ${lowestY.current}`);
    }
  }, [pos2]);

  // Con esta función indicaremos en qué sección vamos y por ende qué obstáculos escoger.
  // La idea es siempre estar analizando los obstáculos de la sección actual y de la siguiente
  function moveCamera() {
    const distanceLimit = MAP_WIDTH; // El límite de la sección será 20 * GRID_SIZE
    distanceTracker.current += speed.current.x; // Cada avance lo acumulamos.

    //Si superamos el límite, cambiamos de sección. Lo hará cuando la sección actual desaparezca.
    if (distanceTracker.current > distanceLimit) {
      mapSection.current += 1; //Subimos de sección
      distanceTracker.current = 0; //Reiniciamos el contador
      console.log(mapSection.current);

      //Este if no lo pasará si es la última sección
      if (sections.current.next) {
        sections.current.current = sections.current.next; // Indicamos que ACTUALMENTE vamos en esta sección
        sections.current.next = allSections[mapSection.current]; // Esta será la SIGUIENTE sección
      }
      //console.log(sections.current);
    }
  }

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
    isMapMoving.current = false;
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
    speed.current.y = 0;
    player.current.posX = CAMERA_MOV_START; // Resetear posición del jugador
    player.current.posY = initialPlayer.posY;
    distanceTracker.current = 0;
    mapSection.current = 1;

    allSections = generateInitialSections();
    sections.current = {
      current: allSections[0],
      next: allSections[1],
    };

    console.log(sections.current);
    isMapMoving.current = false;
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
        isMapMoving,
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
