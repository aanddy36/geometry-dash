import { Map } from "./classes/Map";
import { Square } from "./classes/Square";

export const CELL_SIZE = 50;
// Tamaño del mapa (20x11)
export const N_GRID_X = 20;
export const N_GRID_Y = 13;

export const initialObstacles = [
  new Square({
    color: "#fff",
    position: { x: -5, y: 10 },
    height: 3,
    width: Map.N_CELLS_X + Map.N_CELLS_X / 4,
  }),
  new Square({
    color: "#a855f7",
    position: { x: 7, y: 8 },
  }),
  new Square({
    color: "#000",
    position: { x: 8, y: 8 },
  }),
  new Square({
    color: "#a855f7",
    position: { x: 9, y: 8 },
  }),
  new Square({
    color: "#a855f7",
    position: {
      x: 12.5,
      y: 8,
    },
  }),
  /* 
  new Triangle({
    color: "#a855f7",
    position: { x: 13 * Map.CELL_SIZE, y: 7 * Map.CELL_SIZE },
  }), */
  /*   new Triangle({
    color: "#a855f7",
    position: { x: 14 * Map.CELL_SIZE, y: 9 * Map.CELL_SIZE },
  }), */
];
