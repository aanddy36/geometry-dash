import { isPointInRotatedPlayer } from "../assets/utils/collisions";
import { Coord, Figures, Orientation } from "../types";
import { Game } from "./Game";
import { Obstacle } from "./Obstacle";

interface TriangleProps {
  color?: string;
  position: Coord; // Posición del primer vértice
  orientation?: Orientation; // Indica hacia donde apunta el triángulo
  width?: number;
  height?: number;
  canCollision?: boolean; // Si se debe tener en cuenta las colisiones o no
}

export class Triangle extends Obstacle {
  orientation: Orientation;

  readonly figure = Figures.TRIANGLE; // Propiedad discriminante

  constructor({
    color = "#a855f7",
    position,
    width = 1,
    height = 1,
    orientation = Orientation.TOP,
    canCollision = true,
  }: TriangleProps) {
    super(color, position, width, height, canCollision);

    this.orientation = orientation;
  }

  get vertexs(): { vertex1: Coord; vertex2: Coord; vertex3: Coord } {
    const { x, y } = this.currentPosition;
    const vertexs = {
      vertex1: { x, y },
      vertex2: { x, y },
      vertex3: { x, y },
    };
    switch (this.orientation) {
      case Orientation.TOP:
        vertexs.vertex2 = { x: x + this.width / 2, y: y + this.height };
        vertexs.vertex3 = { x: x - this.width / 2, y: y + this.height };
        break;

      case Orientation.BOTTOM:
        vertexs.vertex2 = { x: x + this.width / 2, y: y - this.height };
        vertexs.vertex3 = { x: x - this.width / 2, y: y - this.height };
        break;

      case Orientation.LEFT:
        vertexs.vertex2 = { x: x + this.height, y: y - this.width / 2 };
        vertexs.vertex3 = { x: x + this.height, y: y + this.width / 2 };
        break;

      case Orientation.RIGHT:
        vertexs.vertex2 = { x: x - this.height, y: y - this.width / 2 };
        vertexs.vertex3 = { x: x - this.height, y: y + this.width / 2 };
        break;
    }
    return vertexs;
  }

  draw(ctx: CanvasRenderingContext2D | null) {
    if (ctx) {
      ctx.fillStyle = this.color;
      const { vertex1, vertex2, vertex3 } = this.vertexs;

      // Dibujar el triángulo
      ctx.beginPath();
      ctx.moveTo(vertex1.x, vertex1.y); // Primer vértice (fijo)
      ctx.lineTo(vertex2.x, vertex2.y); // Segundo vértice
      ctx.lineTo(vertex3.x, vertex3.y); // Tercer vértice
      ctx.closePath();
      ctx.fill();
    }
  }

  checkCollision(
    game: Game,
    collisionState: {
      illegalCollision: boolean;
    }
  ): boolean {
    const { player } = game;

    // Vértices del triángulo
    const triangleVertexs = [
      this.vertexs.vertex1,
      this.vertexs.vertex2,
      this.vertexs.vertex3,
    ];

    // Evaluamos si un vértice del OBSTACULO entra en el JUGADOR
    for (const vertex of triangleVertexs) {
      // El vértice entra en el jugador
      if (isPointInRotatedPlayer(vertex, player)) {
        //game.finishGame();
        collisionState.illegalCollision = true;
        return true;
      }
    }

    // Evaluamos si un vértice del JUGADOR entra en el OBSTÁCULO
    for (const vertex of player.vertexs) {
      // El vértice entra en el jugador
      if (this.isPointInTriangle(vertex)) {
        //game.finishGame();
        collisionState.illegalCollision = true;
        return true;
      }
    }

    //Sino devolvemos
    return false;
  }

  // Verifica si un punto está dentro de un triángulo usando áreas
  isPointInTriangle = (point: Coord): boolean => {
    const { vertex1, vertex2, vertex3 } = this.vertexs;

    const area = (a: Coord, b: Coord, c: Coord) =>
      Math.abs((a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y)) / 2);

    const areaABC = area(vertex1, vertex2, vertex3); // Área del triángulo completo
    const areaPAB = area(point, vertex1, vertex2); // Área con el punto P
    const areaPBC = area(point, vertex2, vertex3);
    const areaPCA = area(point, vertex3, vertex1);

    // Si la suma de las áreas parciales es igual al área total, el punto está dentro
    return Math.abs(areaABC - (areaPAB + areaPBC + areaPCA)) < 0.001;
  };
}
