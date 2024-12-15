import { obstacles } from "../constants/mapObjects";
import {
  Collision,
  CollisionSide,
  Figures,
  Obstacle,
  Player,
  Position,
  Square,
  Triangle,
} from "../types";

export function isSquare(obstacle: Obstacle): obstacle is Square {
  return obstacle.figure === Figures.SQUARE;
}

export function isTriangle(obstacle: Obstacle): obstacle is Triangle {
  return obstacle.figure === Figures.TRIANGLE;
}

const checkSquareCollision = (
  player: Player,
  obstacle: Square
): Collision | null => {
  const myLeft = player.posX;
  const myRight = myLeft + player.width;
  const myTop = player.posY;
  const myBottom = myTop + player.height;

  const theirLeft = obstacle.coordX;
  const theirRight = theirLeft + obstacle.width;
  const theirTop = obstacle.coordY;
  const theirBottom = theirTop + obstacle.height;

  if (
    myBottom < theirTop || // Por encima
    myTop > theirBottom || // Por debajo
    myRight < theirLeft || // A la izquierda
    myLeft > theirRight // A la derecha
  ) {
    return null; // Sin colisión
  }

  // Si hay colisión, calcular penetraciones
  const overlapX =
    myRight < theirRight
      ? myRight - theirLeft // Penetración desde la izquierda
      : theirRight - myLeft; // Penetración desde la derecha

  const overlapY =
    myBottom < theirBottom
      ? myBottom - theirTop // Penetración desde arriba
      : theirBottom - myTop; // Penetración desde abajo

  let obstacleSide: CollisionSide;

  // Determinar el lado del obstáculo según la menor penetración
  if (overlapX < overlapY) {
    obstacleSide =
      myRight < theirRight ? CollisionSide.LEFT : CollisionSide.RIGHT; // Izquierda o derecha
  } else {
    obstacleSide =
      myBottom < theirBottom ? CollisionSide.TOP : CollisionSide.BOTTOM; // Arriba o abajo
  }

  return { obstacleSide, obstacle };
};

const checkTriangleCollision = (
  player: Player,
  obstacle: Triangle
): Collision | null => {
  const myLeft = player.posX;
  const myRight = myLeft + player.width;
  const myTop = player.posY;
  const myBottom = myTop + player.height;

  // Vértices del cuadrado
  const squareVertexs = [
    { x: myLeft, y: myTop }, // Top-left
    { x: myRight, y: myTop }, // Top-right
    { x: myLeft, y: myBottom }, // Bottom-left
    { x: myRight, y: myBottom }, // Bottom-right
  ];

  // Vértices del triángulo
  const triangleVertexs = [
    obstacle.vertex1,
    obstacle.vertex2,
    obstacle.vertex3,
  ];

  // Verifica si algún vértice del triángulo está dentro del cuadrado
  const isTriangleInSquare = triangleVertexs.some(
    (v) => v.x >= myLeft && v.x <= myRight && v.y >= myTop && v.y <= myBottom
  );

  // Verifica si algún vértice del cuadrado está dentro del triángulo
  const isSquareInTriangle = squareVertexs.some((p) =>
    isPointInTriangle(p, obstacle)
  );

  if (isTriangleInSquare || isSquareInTriangle) {
    return { obstacle, obstacleSide: CollisionSide.TOP };
  }

  return null;
};

const isObstacleThere = (
  player: Player,
  obstacle: Obstacle
): Collision | null => {
  //Si es un cuadrado
  if (isSquare(obstacle)) {
    return checkSquareCollision(player, obstacle);
  }

  //Si es un triángulo
  else if (isTriangle(obstacle)) {
    return checkTriangleCollision(player, obstacle);
  }

  return null;
};

export const checkCollisions = (player: Player): Collision[] | null => {
  const collisions: Collision[] = [];

  // Iterar sobre los obstáculos y verificar colisiones
  for (const obstacle of obstacles) {
    const collision = isObstacleThere(player, obstacle);
    if (collision) collisions.push(collision);
  }

  // Si no hay colisiones, devolver null
  return collisions.length ? collisions : null;
};

// Verifica si un punto está dentro de un triángulo usando áreas
const isPointInTriangle = (point: Position, triangle: Triangle): boolean => {
  const { vertex1, vertex2, vertex3 } = triangle;

  const area = (a: Position, b: Position, c: Position) =>
    Math.abs((a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y)) / 2);

  const areaABC = area(vertex1, vertex2, vertex3); // Área del triángulo completo
  const areaPAB = area(point, vertex1, vertex2); // Área con el punto P
  const areaPBC = area(point, vertex2, vertex3);
  const areaPCA = area(point, vertex3, vertex1);

  // Si la suma de las áreas parciales es igual al área total, el punto está dentro
  return Math.abs(areaABC - (areaPAB + areaPBC + areaPCA)) < 0.001;
};
