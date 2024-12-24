import {
  detectCollisionSide,
  isPointInRotatedPlayer,
} from "../assets/utils/collisions";
import {
  CollisionSide,
  Coord,
  Figures,
  GameMode,
  SquareBorders,
  Vertex,
} from "../types";
import { Game } from "./Game";
import { Obstacle } from "./Obstacle";
import { Player } from "./Player";

interface SquareProps {
  color: string;
  position: Coord;
  allowedCollisionSides?: CollisionSide[]; // Desde qué lado se admiten colisiones sin perder
  allowedCollisionVertexs?: SquareBorders[];
  width?: number;
  height?: number;
  canCollision?: boolean; // Si se debe tener en cuenta las colisiones o no
}

export class Square extends Obstacle {
  allowedCollisionSides: CollisionSide[];
  allowedCollisionVertexs: SquareBorders[];

  readonly figure = Figures.SQUARE; // Propiedad discriminante

  constructor({
    color,
    position,
    allowedCollisionSides = [CollisionSide.TOP, CollisionSide.RIGHT],
    allowedCollisionVertexs = [SquareBorders.TOP_RIGHT],
    width = 1,
    height = 1,
    canCollision = false,
  }: SquareProps) {
    super(color, position, width, height, canCollision);

    this.allowedCollisionSides = allowedCollisionSides;
    this.allowedCollisionVertexs = allowedCollisionVertexs;
  }

  get edges() {
    const { x, y } = this.currentPosition;
    return {
      left: x,
      right: x + this.width,
      top: y,
      bottom: y + this.height,
    };
  }

  get vertexs(): Vertex[] {
    // Obstáculo alineado con los ejes
    const { left, right, top, bottom } = this.edges;

    return [
      {
        position: { x: left, y: top },
        border: SquareBorders.TOP_LEFT,
      },
      {
        position: { x: right, y: top },
        border: SquareBorders.TOP_RIGHT,
      },
      {
        position: { x: right, y: bottom },
        border: SquareBorders.BOTTOM_RIGHT,
      },
      {
        position: { x: left, y: bottom },
        border: SquareBorders.BOTTOM_LEFT,
      },
    ];
  }

  draw(ctx: CanvasRenderingContext2D | null) {
    if (ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(
        this.currentPosition.x,
        this.currentPosition.y,
        this.width,
        this.height
      );
    }
  }

  whichSide(player: Player): CollisionSide | null {
    // Lados del cuadrado
    const { left, right, top, bottom } = this.edges;

    // Verificar si algún vértice del jugador está dentro del obstáculo
    const isVertexInObstacle = (vertex: Coord) =>
      vertex.x >= left &&
      vertex.x <= right &&
      vertex.y >= top &&
      vertex.y <= bottom;

    // Evaluamos si un vértice del JUGADOR entra en el OBSTACULO
    for (const vertex of player.vertexs) {
      if (isVertexInObstacle(vertex)) {
        return detectCollisionSide(vertex, this); // Identificamos si algún vertice entra en el obstáculo
      }
    }

    //En caso de que no tenga un ángulo el JUGADOR, no necesitamos hacer más evaluaciones
    if (player.angle % 90 === 0) return null;

    // Evaluamos si un vértice del OBSTACULO entra en el JUGADOR
    for (const vertex of this.vertexs) {
      // (1) El vértice entra en el jugador y (2) dicho vértice no está permitido
      if (
        isPointInRotatedPlayer(vertex.position, player) &&
        !this.allowedCollisionVertexs.includes(vertex.border)
      ) {
        //console.log(vertex.border);
        return CollisionSide.LEFT; // Siempre devolver LEFT si es el obstáculo el que está dentro del jugador
      }
    }

    return null; // No hay colisión
  }

  checkCollision(game: Game): boolean {
    const { player } = game;
    const collidedSide = this.whichSide(player); // Determinamos por qué lado se colisionó
    //console.log(collidedSide);

    //Esta será cuando colisionemos pero no queramos que actue como un sólido
    if (collidedSide && this.canCollision) {
      return false;
    }

    // (1) Si no hay colisión, devuelve
    if (!collidedSide) return false;

    // (2) Si el lado chocado NO está entre los permitidos por este cubo
    if (!this.allowedCollisionSides.includes(collidedSide)) {
      game.finishGame();
      return true;
    }

    // (3) COLISIONES ARRIBA Y ABAJO
    switch (game.gameMode) {
      case GameMode.DEFAULT: //Si el modo de juego es por defecto
        //ARRIBA. Con este condicional hacemos que no se ejecute una y otra vez
        if (collidedSide === CollisionSide.TOP && player.isMidAir) {
          //console.log(player.isMidAir);
          player.isMidAir = false;
          player.speed.y = 0; //Quitamos la velocidad
          this.positionPlayerOnTop(player); //Ubicamos al jugador encima del suelo
        }
        return true;

      case GameMode.UPSIDE_DOWN:
        return true;

      case GameMode.SHIP:
        return true;
    }
  }

  positionPlayerOnTop(player: Player): void {
    // Altura del obstáculo
    const obstacleTop = this.currentPosition.y;

    // Buscar el vértice más bajo del jugador (el que colisiona con el borde superior del obstáculo)
    let lowestVertex = player.getLowestVertex();

    // Calcular el desplazamiento necesario para alinear el jugador con el borde superior del obstáculo
    const deltaY = lowestVertex.y - obstacleTop;
    player.position.y -= deltaY; // Ajustar la posición del jugador

    //Este será el ángulo que tendremos que reponer para colocar recto nuestro cubo
    player.remainingAngle =
      player.angle <= 45 ? player.angle : player.angle - 90; //Positivo será a la izq, negativo a la der
  }
}
