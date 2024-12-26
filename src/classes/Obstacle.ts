import { Coord, Figures, GameState } from "../types";
import { Game } from "./Game";
import { Map } from "./Map";
import { Square } from "./Square";
import { Triangle } from "./Triangle";

// Obstacle es abstract ya que NO debe ser instanciada
export abstract class Obstacle {
  color: string;
  abstract figure: Figures; // Propiedad discriminante que deben tener las clases hijas
  currentPosition: Coord;
  readonly originalPositionX: number;
  readonly originalPositionY: number;
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
    this.originalPositionX = position.x * Map.CELL_SIZE;
    this.originalPositionY = position.y * Map.CELL_SIZE;

    this.width = width * Map.CELL_SIZE;
    this.height = height * Map.CELL_SIZE;

    this.canCollision = canCollision;
  }

  resetPosition() {
    this.currentPosition.x = this.originalPositionX;
    this.currentPosition.y = this.originalPositionY;
  }

  move(game: Game) {
    //Solo movemos el obstáculo si (1) se está moviendo el mapa y (2) está activo el juego
    if (game.map.isMapMoving && game.gameState === GameState.ACTIVO) {
      this.currentPosition.x -= game.player.speed.x;
    }
  }

  static isSquare(obstacle: Obstacle): obstacle is Square {
    return obstacle.figure === Figures.SQUARE;
  }

  static isTriangle(obstacle: Obstacle): obstacle is Triangle {
    return obstacle.figure === Figures.TRIANGLE;
  }
}
