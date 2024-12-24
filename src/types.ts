export enum GameState {
  ACTIVO = "ACTIVO",
  SUSPENDIDO = "SUSPENDIDO",
  FINALIZADO = "FINALIZADO",
  LISTO = "LISTO",
}

export interface Coord {
  x: number;
  y: number;
}

export enum Figures {
  SQUARE = "SQUARE",
  TRIANGLE = "TRIANGLE",
}

export enum CollisionSide {
  TOP = "TOP",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  BOTTOM = "BOTTOM",
}

export enum Orientation {
  TOP = "TOP",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  BOTTOM = "BOTTOM",
}

export enum GameMode {
  DEFAULT,
  UPSIDE_DOWN,
  SHIP,
}

export interface PlayerStats {
  positionX: number;
  positionY: number;
  speedX: number;
  speedY: number;
  angle: number;
  rotationRate: number;
}

export enum SquareBorders {
  TOP_LEFT = "TOP_LEFT",
  TOP_RIGHT = "TOP_RIGHT",
  BOTTOM_LEFT = "BOTTOM_LEFT",
  BOTTOM_RIGHT = "BOTTOM_RIGHT",
}

export interface Vertex {
  position: Coord;
  border: SquareBorders;
}
