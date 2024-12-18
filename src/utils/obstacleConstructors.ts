import { GRID_SIZE } from "../constants/initialValues";
import {
  Figures,
  Obstacle,
  Orientation,
  Position,
  Square,
  Triangle,
} from "../types";

export const newSquare = (
  coordX: number,
  coordY: number,
  color: string,
  clonesInX: number = 0,
  clonesInY: number = 0,
  height: number = GRID_SIZE,
  width: number = GRID_SIZE
): Square[] => {
  const squares: Square[] = [];

  for (let x = 0; x <= clonesInX; x++) {
    for (let y = 0; y <= clonesInY; y++) {
      const square: Square = {
        coordX: coordX + x * width,
        coordY: coordY + y * height,
        width,
        height,
        figure: Figures.SQUARE,
        color,
      };
      squares.push(square);
    }
  }

  return squares;
};

export const newTriangle = (
  coordX: number,
  coordY: number,
  color: string,
  clones: number = 0,
  pointsTo: Orientation = Orientation.TOP,
  width: number = GRID_SIZE,
  height: number = GRID_SIZE
) => {
  const triangles: Triangle[] = [];

  for (let i = 0; i <= clones; i++) {
    let newCoordX = coordX;
    let newCoordY = coordY;

    if (pointsTo === Orientation.TOP || pointsTo === Orientation.BOTTOM)
      newCoordX += i * width;
    else newCoordY += i * width;

    const vertex1: Position = { x: newCoordX, y: newCoordY };
    let vertex2: Position;
    let vertex3: Position;

    switch (pointsTo) {
      case Orientation.TOP:
        vertex2 = { x: newCoordX + width / 2, y: newCoordY + height };
        vertex3 = { x: newCoordX - width / 2, y: newCoordY + height };
        break;

      case Orientation.LEFT:
        vertex2 = { x: newCoordX + height, y: newCoordY - width / 2 };
        vertex3 = { x: newCoordX + height, y: newCoordY + width / 2 };
        break;
      case Orientation.RIGHT:
        vertex2 = { x: newCoordX - height, y: newCoordY - width / 2 };
        vertex3 = { x: newCoordX - height, y: newCoordY + width / 2 };
        break;
      case Orientation.BOTTOM:
        vertex2 = { x: newCoordX + width / 2, y: newCoordY - height };
        vertex3 = { x: newCoordX - width / 2, y: newCoordY - height };
        break;
    }

    const triangle: Triangle = {
      vertex1,
      vertex2,
      vertex3,
      figure: Figures.TRIANGLE,
      color,
    };
    triangles.push(triangle);
  }
  return triangles;
};

/* export const patterns = ({
  x,
  y,
  pattern,
}: {
  x: number;
  y: number;
  pattern: number;
}): Obstacle[] => {
  

}; */
