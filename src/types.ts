export interface Position {
  x: number;
  y: number;
}

export interface Speeds {
  x: number;
  y: number;
}

export enum Figures {
  SQUARE = "SQUARE",
  TRIANGLE = "TRIANGLE",
}

export enum GameState {
  ACTIVO = "ACTIVO",
  SUSPENDIDO = "SUSPENDIDO",
  FINALIZADO = "FINALIZADO",
  LISTO = "LISTO",
}

export interface Player {
  posX: number;
  posY: number;
  width: number;
  height: number;
  color: string;
}

export interface Square {
  coordX: number;
  coordY: number;
  width: number;
  height: number;
  figure: Figures.SQUARE;
  color: string;
}

export interface Triangle {
  vertex1: Position;
  vertex2: Position;
  vertex3: Position;
  figure: Figures.TRIANGLE;
  color: string;
}

export type Obstacle = Square | Triangle;

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

export interface Collision {
  obstacleSide: CollisionSide;
  obstacle: Obstacle;
}

export interface Section {
  id: number;
  leftLimit: number;
  rightLimit: number;
  obstacles: Obstacle[];
}

export interface SectionsPair {
  current: Section;
  next: Section | undefined;
}
