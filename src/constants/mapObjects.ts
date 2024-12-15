import { Figures, Obstacle } from "../types";
import { GRID_SIZE, N_GRID_X } from "./initialValues";

export const obstacles: Obstacle[] = [
  {
    coordX: 0,
    coordY: 10 * GRID_SIZE,
    width: GRID_SIZE * N_GRID_X,
    height: 150,
    figure: Figures.SQUARE,
    color: "#a855f7",
  },

  /* 2 RECTANGULOS VERTICALES */
  {
    coordX: 600,
    coordY: 8 * GRID_SIZE,
    width: GRID_SIZE,
    height: GRID_SIZE * 2,
    figure: Figures.SQUARE,
    color: "#a855f7",
  },
  /* {
    coordX: 550,
    coordY: 5 * GRID_SIZE,
    width: GRID_SIZE * 3,
    height: GRID_SIZE,
    figure: Figures.SQUARE,
    color: "#a855f7",
  }, */

  /* 3 TRIANGULOS */
  /* {
    vertex1: { x: 8 * GRID_SIZE + GRID_SIZE / 2, y: 9 * GRID_SIZE },
    vertex2: { x: 9 * GRID_SIZE, y: 10 * GRID_SIZE },
    vertex3: { x: 8 * GRID_SIZE, y: 10 * GRID_SIZE },
    figure: Figures.TRIANGLE,
    color: "#a855f7",
  },
  {
    vertex1: { x: 9 * GRID_SIZE + GRID_SIZE / 2, y: 9 * GRID_SIZE },
    vertex2: { x: 10 * GRID_SIZE, y: 10 * GRID_SIZE },
    vertex3: { x: 9 * GRID_SIZE, y: 10 * GRID_SIZE },
    figure: Figures.TRIANGLE,
    color: "#a855f7",
  },
  {
    vertex1: { x: 10 * GRID_SIZE + GRID_SIZE / 2, y: 9 * GRID_SIZE },
    vertex2: { x: 11 * GRID_SIZE, y: 10 * GRID_SIZE },
    vertex3: { x: 10 * GRID_SIZE, y: 10 * GRID_SIZE },
    figure: Figures.TRIANGLE,
    color: "#a855f7",
  }, */
];
