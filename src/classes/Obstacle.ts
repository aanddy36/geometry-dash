import { Coord, Figures } from "../types";
import { Map } from "./Map";
import { Square } from "./Square";
import { Triangle } from "./Triangle";

// Obstacle es abstract ya que NO debe ser instanciada
export abstract class Obstacle {
  color: string;
  abstract figure: Figures; // Propiedad discriminante que deben tener las clases hijas
  currentPosition: Coord;
  readonly originalPosition: Coord;
  width: number;
  height: number;
  canCollision?: boolean;

  constructor(
    color: string,
    position: Coord,
    width: number,
    height: number,
    canCollision = true
  ) {
    this.color = color;
    this.currentPosition = {
      x: position.x * Map.CELL_SIZE,
      y: position.y * Map.CELL_SIZE,
    };
    this.originalPosition = {
      x: position.x * Map.CELL_SIZE,
      y: position.y * Map.CELL_SIZE,
    };
    this.width = width * Map.CELL_SIZE;
    this.height = height * Map.CELL_SIZE;

    this.canCollision = canCollision;
  }

  resetPosition() {
    this.currentPosition = this.originalPosition;
  }

  move(speedX: number) {
    this.currentPosition.x -= speedX;
  }

  static isSquare(obstacle: Obstacle): obstacle is Square {
    return obstacle.figure === Figures.SQUARE;
  }

  static isTriangle(obstacle: Obstacle): obstacle is Triangle {
    return obstacle.figure === Figures.TRIANGLE;
  }
}
