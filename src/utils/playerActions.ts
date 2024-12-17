import {
  Player,
  Speeds,
  GameState,
  CollisionSide,
  Figures,
  Square,
  Position,
  SectionsPair,
} from "../types";
import {
  CAMERA_MOV_START,
  GRAVITY,
  JUMP_SPEED,
} from "../constants/initialValues";
import { checkCollisions, isSquare } from "../utils/collisionsFunctions";

export const movePlayer = (
  speed: Speeds,
  player: Player,
  isMidAirRef: React.MutableRefObject<boolean>,
  finishGame: () => void,
  setPos2: React.Dispatch<React.SetStateAction<Position | undefined>>,
  lowestY: React.MutableRefObject<number>,
  isMapMoving: React.MutableRefObject<boolean>,
  sections: SectionsPair,
  mapSection: number
) => {
  //console.log(isMidAirRef);
  // VERTICAL
  speed.y += GRAVITY; //Aceleramos con la gravedad
  const futurePosY = player.posY + speed.y; // la posición en el futuro
  //HORIZONTAL
  if (!isMapMoving.current) {
    player.posX += speed.x;

    //Una vez alcanzado CAMERA_MOV_START indicamos que se deben mover los obstáculos
    if (player.posX >= CAMERA_MOV_START && mapSection === 1)
      isMapMoving.current = true;
  }

  // Usuario temporal con posición actualizada
  const tempUser = { ...player, posY: futurePosY };

  //Sacamos los obstáculos de las secciones
  const allObstacles = sections.next
    ? [...sections.current.obstacles, ...sections.next.obstacles]
    : [...sections.current.obstacles];

  // Obtenemos el array de obstáculos colisionados para la posición futura. Si no hay, será null.
  const collidedObs = checkCollisions(tempUser, allObstacles);
  //console.log(collidedObs);

  //Si no hay colision
  if (!collidedObs) {
    player.posY = futurePosY;
    isMidAirRef.current = true;
    if (Number(futurePosY) < Number(lowestY.current)) {
      lowestY.current = futurePosY;
    }
  }

  //Si hay colisión...
  else {
    // Buscamos si una de las colisiones fue hecha por un lado no permitido O con un triángulo
    const notAllowedCollision = collidedObs.find(
      (obs) =>
        obs.obstacleSide === CollisionSide.LEFT ||
        obs.obstacleSide === CollisionSide.BOTTOM ||
        obs.obstacle.figure === Figures.TRIANGLE
    );

    //En ese caso se acaba el juego
    if (notAllowedCollision) {
      player.posY = futurePosY;
      isMapMoving.current = false;
      return finishGame();
    }

    // Sino la colisión sólo pudo haber sido por ARRIBA con un RECTANGULO. Ignoramos colisiones derechas
    else {
      // Buscamos la colision hecha por ARRIBA con un RECTANGULO
      const floorObs = collidedObs.find(
        (obs) =>
          obs.obstacleSide === CollisionSide.TOP && isSquare(obs.obstacle)
      );
      //Posicionamos al jugador a la altura del suelo
      if (floorObs) {
        speed.y = 0;
        player.posY = (floorObs.obstacle as Square).coordY - player.height; //Sabemos al 100% que es Square
        //console.log(player.posY);

        if (isMidAirRef.current) {
          setPos2({
            x: player.posX + player.width,
            y: player.posY + player.height,
          });
        }
        isMidAirRef.current = false;
      }
    }
  }
  //console.log(futurePosX - player.posX);
};

// Manejar salto del jugador
export const jump = (
  isMidAirRef: React.MutableRefObject<boolean>,
  gameState: GameState,
  speed: Speeds,
  setPos1: React.Dispatch<React.SetStateAction<Position | undefined>>,
  player: Player
) => {
  if (!isMidAirRef.current && gameState === GameState.ACTIVO) {
    isMidAirRef.current = true;
    setPos1({ x: player.posX + player.width, y: player.posY + player.height });
    speed.y = JUMP_SPEED;
  }
};
