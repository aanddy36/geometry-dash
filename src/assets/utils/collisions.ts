import { Player } from "../../classes/Player";
import { Square } from "../../classes/Square";
import { CollisionSide, Coord } from "../../types";

// Verificar si un punto está dentro del área del jugador rotado
export function isPointInRotatedPlayer(point: Coord, player: Player): boolean {
  const vertices = player.vertexs;
  let inside = false;

  // Aplicar el algoritmo de cruce de rayos para determinar si el punto está dentro
  for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
    const xi = vertices[i].x,
      yi = vertices[i].y;
    const xj = vertices[j].x,
      yj = vertices[j].y;

    const intersect =
      yi > point.y !== yj > point.y &&
      point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;

    if (intersect) inside = !inside;
  }

  return inside;
}

// Determina el lado más cercano para un vértice dado
export function detectCollisionSide(vertex: Coord, obs: Square): CollisionSide {
  const { left, right, top, bottom } = obs.edges;

  const distToLeft = Math.abs(vertex.x - left);
  const distToRight = Math.abs(vertex.x - right);
  const distToTop = Math.abs(vertex.y - top);
  const distToBottom = Math.abs(vertex.y - bottom);

  const minDist = Math.min(distToLeft, distToRight, distToTop, distToBottom);

  if (minDist === distToLeft) return CollisionSide.LEFT;
  if (minDist === distToRight) return CollisionSide.RIGHT;
  if (minDist === distToTop) return CollisionSide.TOP;
  return CollisionSide.BOTTOM;
}
