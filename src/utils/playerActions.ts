import {
  Player,
  Speeds,
  GameState,
  CollisionSide,
  Figures,
  Square,
  Position,
} from "../types";
import { gravity, jumpSpeed } from "../constants/initialValues";
import { checkCollisions, isSquare } from "../utils/collisionsFunctions";

export const movePlayer = (
  speed: Speeds,
  player: Player,
  isMidAirRef: React.MutableRefObject<boolean>,
  finishGame: () => void,
  setPos2: React.Dispatch<React.SetStateAction<Position | undefined>>,
  lowestY: React.MutableRefObject<number>
) => {
  //console.log(isMidAirRef);
  // VERTICAL
  speed.y += gravity; //Aceleramos con la gravedad
  const futurePosY = player.posY + speed.y; // la posición en el futuro

  //HORIZONTAL
  const futurePosX = player.posX + speed.x;

  // Usuario temporal con posición actualizada
  const tempUser = { ...player, posY: futurePosY, posX: futurePosX };

  // Obtenemos el array de obstáculos colisionados para la posición futura. Si no hay, será null.
  const collidedObs = checkCollisions(tempUser);
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
        if (isMidAirRef.current) {
          setPos2({ x: player.posX + player.width, y: player.posY + player.height });
        }
        isMidAirRef.current = false;
      }
    }
  }

  player.posX = futurePosX; //En todos los escenarios movemos a la derecha
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
    speed.y = jumpSpeed;
  }
};
