import { Map } from "./classes/Map";
import { Section } from "./classes/Section";
import { Square } from "./classes/Square";
import { Triangle } from "./classes/Triangle";

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
  new Square({ position: { x: 10, y: 8 } }),
  new Square({ color: "#000", position: { x: 11, y: 8 } }),
  new Square({ position: { x: 12, y: 8 } }),
];

export const initialSections = [
  new Section({
    id: 1,
    leftLimit: 0,
    rightLimit: 20,
    obstacles: [
      new Square({
        color: "#000",
        position: { x: -5, y: 10 },
        height: 3,
        width: Map.N_CELLS_X + Map.N_CELLS_X / 4,
      }),
    ],
  }),
  {
    id: 2,
    leftLimit: 40,
    rightLimit: 60,
    obstacles: [
      new Square({
        color: "#fff",
        position: { x: 20, y: 10 },
        height: 3,
        width: Map.N_CELLS_X,
      }),

      /* TRIANGULO Y CUADRADO */
      new Triangle({ position: { x: 20.5, y: 9 } }),
      new Square({ position: { x: 21, y: 9 } }),

      /* 2 CUADRADOS VERTICALES */
      new Square({ position: { x: 25, y: 8 } }),
      new Square({ position: { x: 25, y: 9 } }),

      /* UNICO CUADRADO */
      new Square({ position: { x: 30, y: 9 } }),

      /* UNICO TRIANGULO */
      new Triangle({ position: { x: 37.5, y: 9 } }),
    ],
  },
  new Section({
    id: 2,
    leftLimit: 20,
    rightLimit: 40,
    obstacles: [
      new Square({
        color: "#000",
        position: { x: 20, y: 10 },
        height: 3,
        width: Map.N_CELLS_X,
      }),

      /* 2 TRIANGULOS */
      new Triangle({ position: { x: 25.5, y: 9 } }),
      new Triangle({ position: { x: 26.5, y: 9 } }),

      /* TRIANGULO ENCIMA DE CUADRADO INCOMPLETO */
      new Square({ position: { x: 30, y: 9.375 }, height: 0.625 }),
      new Triangle({ position: { x: 30.5, y: 8.375 } }),

      /* ÚNICO TRIÁNGULO */
      new Triangle({ position: { x: 39.5, y: 9 } }),
    ],
  }),
  new Section({
    id: 3,
    leftLimit: 40,
    rightLimit: 60,
    obstacles: [
      new Square({
        color: "#fff",
        position: { x: 20, y: 10 },
        height: 3,
        width: Map.N_CELLS_X,
      }),

      /* TRIANGULO Y CUADRADO */
      new Triangle({ position: { x: 20.5, y: 9 } }),
      new Square({ position: { x: 21, y: 9 } }),

      /* 2 CUADRADOS VERTICALES */
      new Square({ position: { x: 25, y: 8 } }),
      new Square({ position: { x: 25, y: 9 } }),

      /* UNICO CUADRADO */
      new Square({ position: { x: 30, y: 9 } }),

      /* UNICO TRIANGULO */
      new Triangle({ position: { x: 37.5, y: 9 } }),
    ],
  }),
];
