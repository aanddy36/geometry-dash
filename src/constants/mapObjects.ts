import { Figures, Obstacle, Orientation } from "../types";
import { newSquare, newTriangle } from "../utils/obstacleConstructors";
import { GRID_SIZE, MAP_WIDTH } from "./initialValues";

export const initialObstacles: Obstacle[] = [
  {
    coordX: -5 * GRID_SIZE,
    coordY: 10 * GRID_SIZE,
    width: MAP_WIDTH + 5 * GRID_SIZE,
    height: 3 * GRID_SIZE,
    figure: Figures.SQUARE,
    color: "#FFF",
  },
  {
    coordX: 20 * GRID_SIZE,
    coordY: 10 * GRID_SIZE,
    width: MAP_WIDTH,
    height: 3 * GRID_SIZE,
    figure: Figures.SQUARE,
    color: "#000",
  },
  {
    coordX: 40 * GRID_SIZE,
    coordY: 10 * GRID_SIZE,
    width: MAP_WIDTH,
    height: 3 * GRID_SIZE,
    figure: Figures.SQUARE,
    color: "#FFF",
  },

  /* 2 TRIANGULOS */
  ...newTriangle(25 * GRID_SIZE + GRID_SIZE / 2, 9 * GRID_SIZE, "#a855f7", 1),

  /* TRIANGULO ENCIMA DE CUADRADO INCOMPLETO */
  ...newSquare(
    30 * GRID_SIZE,
    9 * GRID_SIZE + GRID_SIZE * 0.375,
    "#a855f7",
    undefined,
    undefined,
    0.625 * GRID_SIZE
  ),
  ...newTriangle(
    30 * GRID_SIZE + GRID_SIZE / 2,
    8 * GRID_SIZE + GRID_SIZE * 0.375,
    "#a855f7"
  ),

  /* 2 TRIANGULOS Y CUADRADO */
  ...newTriangle(39 * GRID_SIZE + GRID_SIZE / 2, 9 * GRID_SIZE, "#a855f7", 1),
  ...newSquare(41 * GRID_SIZE, 9 * GRID_SIZE, "#a855f7"),

  /* 2 CUADRADOS VERTICALES */
  ...newSquare(45 * GRID_SIZE, 8 * GRID_SIZE, "#a855f7", undefined, 1),

  /* UNICO CUADRADO */
  ...newSquare(50 * GRID_SIZE, 9 * GRID_SIZE, "#a855f7"),

  /* UNICO TRIANGULO */
  ...newTriangle(57 * GRID_SIZE + GRID_SIZE / 2, 9 * GRID_SIZE, "#a855f7"),

  /* 2 TRIANGULOS A LA IZQ Y 2 CUADRADOS VERTICALES */
  ...newTriangle(
    60 * GRID_SIZE + GRID_SIZE / 2,
    7 * GRID_SIZE + GRID_SIZE / 2,
    "#a855f7",
    1,
    Orientation.LEFT
  ),
  ...newSquare(
    61 * GRID_SIZE + GRID_SIZE / 2,
    7 * GRID_SIZE,
    "#a855f7",
    undefined,
    1
  ),

  /* UNICO TRIANGULO */
  ...newTriangle(66 * GRID_SIZE, 9 * GRID_SIZE, "#a855f7"),

  /* TRIANGULO ENCIMA DE CUADRADO INCOMPLETO */
  ...newSquare(
    74 * GRID_SIZE,
    9 * GRID_SIZE + GRID_SIZE * 0.375,
    "#a855f7",
    undefined,
    undefined,
    0.625 * GRID_SIZE
  ),
  ...newTriangle(
    74 * GRID_SIZE + GRID_SIZE / 2,
    8 * GRID_SIZE + GRID_SIZE * 0.375,
    "#a855f7"
  ),

  /* TRIANGULO ENCIMA DE CUADRADO INCOMPLETO */
  ...newSquare(
    79 * GRID_SIZE,
    9 * GRID_SIZE + GRID_SIZE * 0.375,
    "#a855f7",
    undefined,
    undefined,
    0.625 * GRID_SIZE
  ),
  ...newTriangle(
    79 * GRID_SIZE + GRID_SIZE / 2,
    8 * GRID_SIZE + GRID_SIZE * 0.375,
    "#a855f7"
  ),

  /* UNICO CUADRADO */
  ...newSquare(80 * GRID_SIZE + GRID_SIZE / 2, 9 * GRID_SIZE, "#a855f7"),

  /* 2 CUADRADOS VERTICALES */
  ...newSquare(
    84 * GRID_SIZE + GRID_SIZE / 2,
    8 * GRID_SIZE,
    "#a855f7",
    undefined,
    1
  ),

  /* 2 TRIANGULOS A LA IZQ Y 2 CUADRADOS VERTICALES */
  ...newTriangle(
    87 * GRID_SIZE + GRID_SIZE / 2,
    5 * GRID_SIZE + GRID_SIZE / 2,
    "#a855f7",
    1,
    Orientation.LEFT
  ),
  ...newSquare(
    88 * GRID_SIZE + GRID_SIZE / 2,
    5 * GRID_SIZE,
    "#a855f7",
    undefined,
    1
  ),

  /* 2 TRIANGULOS Y CUADRADO */
  ...newTriangle(92 * GRID_SIZE + GRID_SIZE / 2, 9 * GRID_SIZE, "#a855f7", 1),
  ...newSquare(94 * GRID_SIZE, 9 * GRID_SIZE, "#a855f7"),

  /* 3 CUADRADOS VERTICALES */
  ...newSquare(97 * GRID_SIZE, 7 * GRID_SIZE, "#a855f7", undefined, 2),

  /* 2 TRIANGULOS A LA IZQ Y 2 CUADRADOS VERTICALES */
  ...newTriangle(
    100 * GRID_SIZE,
    4 * GRID_SIZE + GRID_SIZE / 2,
    "#a855f7",
    1,
    Orientation.LEFT
  ),
  ...newSquare(101 * GRID_SIZE, 4 * GRID_SIZE, "#a855f7", undefined, 1),

  /* UN CUADRADO Y TRES TRIANGULOS SEGUIDOS */
  ...newSquare(100 * GRID_SIZE, 9 * GRID_SIZE, "#a855f7"),
  ...newTriangle(101 * GRID_SIZE + GRID_SIZE / 2, 9 * GRID_SIZE, "#a855f7", 2),

  /* 2 TRIANGULOS */
  ...newTriangle(109 * GRID_SIZE + GRID_SIZE / 2, 9 * GRID_SIZE, "#a855f7", 1),

  /* TRIANGULO ENCIMA DE CUADRADO INCOMPLETO */
  ...newSquare(
    114 * GRID_SIZE,
    9 * GRID_SIZE + GRID_SIZE * 0.375,
    "#a855f7",
    undefined,
    undefined,
    0.625 * GRID_SIZE
  ),
  ...newTriangle(
    114 * GRID_SIZE + GRID_SIZE / 2,
    8 * GRID_SIZE + GRID_SIZE * 0.375,
    "#a855f7"
  ),
];
const temp = [
  /* 2 TRIANGULOS */
  ...newTriangle(25 * GRID_SIZE + GRID_SIZE / 2, 9 * GRID_SIZE, "#a855f7", 1),

  /* TRIANGULO ENCIMA DE CUADRADO INCOMPLETO */
  ...newSquare(
    30 * GRID_SIZE,
    9 * GRID_SIZE + GRID_SIZE * 0.375,
    "#a855f7",
    undefined,
    undefined,
    0.625 * GRID_SIZE
  ),
  ...newTriangle(
    30 * GRID_SIZE + GRID_SIZE / 2,
    8 * GRID_SIZE + GRID_SIZE * 0.375,
    "#a855f7"
  ),

  /* 2 TRIANGULOS Y CUADRADO */
  ...newTriangle(39 * GRID_SIZE + GRID_SIZE / 2, 9 * GRID_SIZE, "#a855f7", 1),
  ...newSquare(41 * GRID_SIZE, 9 * GRID_SIZE, "#a855f7"),

  /* 2 CUADRADOS VERTICALES */
  ...newSquare(45 * GRID_SIZE, 8 * GRID_SIZE, "#a855f7", undefined, 1),

  /* UNICO CUADRADO */
  ...newSquare(50 * GRID_SIZE, 9 * GRID_SIZE, "#a855f7"),

  /* UNICO TRIANGULO */
  ...newTriangle(57 * GRID_SIZE + GRID_SIZE / 2, 9 * GRID_SIZE, "#a855f7"),

  /* 2 TRIANGULOS A LA IZQ Y 2 CUADRADOS VERTICALES */
  ...newTriangle(
    60 * GRID_SIZE + GRID_SIZE / 2,
    7 * GRID_SIZE + GRID_SIZE / 2,
    "#a855f7",
    1,
    Orientation.LEFT
  ),
  ...newSquare(
    61 * GRID_SIZE + GRID_SIZE / 2,
    7 * GRID_SIZE,
    "#a855f7",
    undefined,
    1
  ),

  /* UNICO TRIANGULO */
  ...newTriangle(66 * GRID_SIZE, 9 * GRID_SIZE, "#a855f7"),

  /* TRIANGULO ENCIMA DE CUADRADO INCOMPLETO */
  ...newSquare(
    74 * GRID_SIZE,
    9 * GRID_SIZE + GRID_SIZE * 0.375,
    "#a855f7",
    undefined,
    undefined,
    0.625 * GRID_SIZE
  ),
  ...newTriangle(
    74 * GRID_SIZE + GRID_SIZE / 2,
    8 * GRID_SIZE + GRID_SIZE * 0.375,
    "#a855f7"
  ),

  /* TRIANGULO ENCIMA DE CUADRADO INCOMPLETO */
  ...newSquare(
    79 * GRID_SIZE,
    9 * GRID_SIZE + GRID_SIZE * 0.375,
    "#a855f7",
    undefined,
    undefined,
    0.625 * GRID_SIZE
  ),
  ...newTriangle(
    79 * GRID_SIZE + GRID_SIZE / 2,
    8 * GRID_SIZE + GRID_SIZE * 0.375,
    "#a855f7"
  ),

  /* UNICO CUADRADO */
  ...newSquare(80 * GRID_SIZE + GRID_SIZE / 2, 9 * GRID_SIZE, "#a855f7"),

  /* 2 CUADRADOS VERTICALES */
  ...newSquare(
    84 * GRID_SIZE + GRID_SIZE / 2,
    8 * GRID_SIZE,
    "#a855f7",
    undefined,
    1
  ),

  /* 2 TRIANGULOS A LA IZQ Y 2 CUADRADOS VERTICALES */
  ...newTriangle(
    87 * GRID_SIZE + GRID_SIZE / 2,
    5 * GRID_SIZE + GRID_SIZE / 2,
    "#a855f7",
    1,
    Orientation.LEFT
  ),
  ...newSquare(
    88 * GRID_SIZE + GRID_SIZE / 2,
    5 * GRID_SIZE,
    "#a855f7",
    undefined,
    1
  ),

  /* 2 TRIANGULOS Y CUADRADO */
  ...newTriangle(92 * GRID_SIZE + GRID_SIZE / 2, 9 * GRID_SIZE, "#a855f7", 1),
  ...newSquare(94 * GRID_SIZE, 9 * GRID_SIZE, "#a855f7"),

  /* 3 CUADRADOS VERTICALES */
  ...newSquare(97 * GRID_SIZE, 7 * GRID_SIZE, "#a855f7", undefined, 2),

  /* 2 TRIANGULOS A LA IZQ Y 2 CUADRADOS VERTICALES */
  ...newTriangle(
    100 * GRID_SIZE,
    4 * GRID_SIZE + GRID_SIZE / 2,
    "#a855f7",
    1,
    Orientation.LEFT
  ),
  ...newSquare(101 * GRID_SIZE, 4 * GRID_SIZE, "#a855f7", undefined, 1),

  /* UN CUADRADO Y TRES TRIANGULOS SEGUIDOS */
  ...newSquare(100 * GRID_SIZE, 9 * GRID_SIZE, "#a855f7"),
  ...newTriangle(101 * GRID_SIZE + GRID_SIZE / 2, 9 * GRID_SIZE, "#a855f7", 2),

  /* 2 TRIANGULOS */
  ...newTriangle(109 * GRID_SIZE + GRID_SIZE / 2, 9 * GRID_SIZE, "#a855f7", 1),

  /* TRIANGULO ENCIMA DE CUADRADO INCOMPLETO */
  ...newSquare(
    114 * GRID_SIZE,
    9 * GRID_SIZE + GRID_SIZE * 0.375,
    "#a855f7",
    undefined,
    undefined,
    0.625 * GRID_SIZE
  ),
  ...newTriangle(
    114 * GRID_SIZE + GRID_SIZE / 2,
    8 * GRID_SIZE + GRID_SIZE * 0.375,
    "#a855f7"
  ),
];
