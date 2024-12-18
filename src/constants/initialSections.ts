import { Figures, Orientation, Section } from "../types";
import { newSquare, newTriangle } from "../utils/obstacleConstructors";
import { GRID_SIZE, MAP_WIDTH } from "./initialValues";

//Esta función toca hacerla porque antes a
export const generateInitialSections = (): Section[] => {
  //Las coordenadas X de los obstáculos se escriben de 20 a 40 EXCEPTO la primera sección
  return [
    {
      id: 1,
      leftLimit: 0, // Mayor o igual
      rightLimit: 20, //Menor que
      //coordX va de -5 a 20.
      obstacles: [
        {
          coordX: -5 * GRID_SIZE,
          coordY: 10 * GRID_SIZE,
          width: MAP_WIDTH + MAP_WIDTH / 4,
          height: 3 * GRID_SIZE,
          figure: Figures.SQUARE,
          color: "#FFF",
        },
      ],
    },
    {
      id: 2,
      leftLimit: 20, // Mayor o igual
      rightLimit: 40, //Menor que
      obstacles: [
        {
          coordX: 20 * GRID_SIZE,
          coordY: 10 * GRID_SIZE,
          width: MAP_WIDTH,
          height: 3 * GRID_SIZE,
          figure: Figures.SQUARE,
          color: "#000",
        },

        /* 2 TRIANGULOS */
        ...newTriangle(
          25 * GRID_SIZE + GRID_SIZE / 2,
          9 * GRID_SIZE,
          "#a855f7",
          1
        ),

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

        /* ÚNICO TRIÁNGULO */
        ...newTriangle(
          39 * GRID_SIZE + GRID_SIZE / 2,
          9 * GRID_SIZE,
          "#a855f7"
        ),
      ],
    },
    {
      id: 3,
      leftLimit: 40,
      rightLimit: 60,
      obstacles: [
        {
          coordX: 20 * GRID_SIZE,
          coordY: 10 * GRID_SIZE,
          width: MAP_WIDTH,
          height: 3 * GRID_SIZE,
          figure: Figures.SQUARE,
          color: "#fff",
        },
        /* TRIANGULO Y CUADRADO */
        ...newTriangle(
          20 * GRID_SIZE + GRID_SIZE / 2,
          9 * GRID_SIZE,
          "#a855f7"
        ),
        ...newSquare(21 * GRID_SIZE, 9 * GRID_SIZE, "#a855f7"),

        /* 2 CUADRADOS VERTICALES */
        ...newSquare(25 * GRID_SIZE, 8 * GRID_SIZE, "#a855f7", undefined, 1),

        /* UNICO CUADRADO */
        ...newSquare(30 * GRID_SIZE, 9 * GRID_SIZE, "#a855f7"),

        /* UNICO TRIANGULO */
        ...newTriangle(
          37 * GRID_SIZE + GRID_SIZE / 2,
          9 * GRID_SIZE,
          "#a855f7"
        ),
      ],
    },
    {
      id: 4,
      leftLimit: 60,
      rightLimit: 80,
      obstacles: [
        {
          coordX: 20 * GRID_SIZE,
          coordY: 10 * GRID_SIZE,
          width: MAP_WIDTH,
          height: 3 * GRID_SIZE,
          figure: Figures.SQUARE,
          color: "#a855f7",
        },
        /* 2 TRIANGULOS A LA IZQ Y 2 CUADRADOS VERTICALES */
        ...newTriangle(
          20 * GRID_SIZE + GRID_SIZE / 2,
          7 * GRID_SIZE + GRID_SIZE / 2,
          "#a855f7",
          1,
          Orientation.LEFT
        ),
        ...newSquare(
          21 * GRID_SIZE + GRID_SIZE / 2,
          7 * GRID_SIZE,
          "#a855f7",
          undefined,
          1
        ),

        /* UNICO TRIANGULO */
        ...newTriangle(26 * GRID_SIZE, 9 * GRID_SIZE, "#a855f7"),

        /* TRIANGULO ENCIMA DE CUADRADO INCOMPLETO */
        ...newSquare(
          34 * GRID_SIZE,
          9 * GRID_SIZE + GRID_SIZE * 0.375,
          "#a855f7",
          undefined,
          undefined,
          0.625 * GRID_SIZE
        ),
        ...newTriangle(
          34 * GRID_SIZE + GRID_SIZE / 2,
          8 * GRID_SIZE + GRID_SIZE * 0.375,
          "#a855f7"
        ),

        /* TRIANGULO ENCIMA DE CUADRADO INCOMPLETO */
        ...newSquare(
          39 * GRID_SIZE,
          9 * GRID_SIZE + GRID_SIZE * 0.375,
          "#a855f7",
          undefined,
          undefined,
          0.625 * GRID_SIZE
        ),
        ...newTriangle(
          39 * GRID_SIZE + GRID_SIZE / 2,
          8 * GRID_SIZE + GRID_SIZE * 0.375,
          "#a855f7"
        ),
      ],
    },
    {
      id: 5,
      leftLimit: 80,
      rightLimit: 100,
      obstacles: [
        {
          coordX: 20 * GRID_SIZE,
          coordY: 10 * GRID_SIZE,
          width: MAP_WIDTH,
          height: 3 * GRID_SIZE,
          figure: Figures.SQUARE,
          color: "#fff",
        },
        /* UNICO CUADRADO */
        ...newSquare(20 * GRID_SIZE + GRID_SIZE / 2, 9 * GRID_SIZE, "#a855f7"),

        /* 2 CUADRADOS VERTICALES */
        ...newSquare(
          24 * GRID_SIZE + GRID_SIZE / 2,
          8 * GRID_SIZE,
          "#a855f7",
          undefined,
          1
        ),

        /* 2 TRIANGULOS A LA IZQ Y 2 CUADRADOS VERTICALES */
        ...newTriangle(
          27 * GRID_SIZE + GRID_SIZE / 2,
          5 * GRID_SIZE + GRID_SIZE / 2,
          "#a855f7",
          1,
          Orientation.LEFT
        ),
        ...newSquare(
          28 * GRID_SIZE + GRID_SIZE / 2,
          5 * GRID_SIZE,
          "#a855f7",
          undefined,
          1
        ),

        /* 2 TRIANGULOS Y CUADRADO */
        ...newTriangle(
          32 * GRID_SIZE + GRID_SIZE / 2,
          9 * GRID_SIZE,
          "#a855f7",
          1
        ),
        ...newSquare(34 * GRID_SIZE, 9 * GRID_SIZE, "#a855f7"),

        /* 3 CUADRADOS VERTICALES */
        ...newSquare(37 * GRID_SIZE, 7 * GRID_SIZE, "#a855f7", undefined, 2),
      ],
    },
    {
      id: 6,
      leftLimit: 100,
      rightLimit: 120,
      obstacles: [
        {
          coordX: 20 * GRID_SIZE,
          coordY: 10 * GRID_SIZE,
          width: MAP_WIDTH,
          height: 3 * GRID_SIZE,
          figure: Figures.SQUARE,
          color: "#a855f7",
        },
        /* 2 TRIANGULOS A LA IZQ Y 2 CUADRADOS VERTICALES */
        ...newTriangle(
          20 * GRID_SIZE,
          4 * GRID_SIZE + GRID_SIZE / 2,
          "#a855f7",
          1,
          Orientation.LEFT
        ),
        ...newSquare(21 * GRID_SIZE, 4 * GRID_SIZE, "#a855f7", undefined, 1),

        /* UN CUADRADO Y TRES TRIANGULOS SEGUIDOS */
        ...newSquare(20 * GRID_SIZE, 9 * GRID_SIZE, "#a855f7"),
        ...newTriangle(
          21 * GRID_SIZE + GRID_SIZE / 2,
          9 * GRID_SIZE,
          "#a855f7",
          2
        ),

        /* 2 TRIANGULOS */
        ...newTriangle(
          29 * GRID_SIZE + GRID_SIZE / 2,
          9 * GRID_SIZE,
          "#a855f7",
          1
        ),

        /* TRIANGULO ENCIMA DE CUADRADO INCOMPLETO */
        ...newSquare(
          34 * GRID_SIZE,
          9 * GRID_SIZE + GRID_SIZE * 0.375,
          "#a855f7",
          undefined,
          undefined,
          0.625 * GRID_SIZE
        ),
        ...newTriangle(
          34 * GRID_SIZE + GRID_SIZE / 2,
          8 * GRID_SIZE + GRID_SIZE * 0.375,
          "#a855f7"
        ),

        /* UNICO CUADRADO PEQUEÑO */
        ...newSquare(
          35 * GRID_SIZE + GRID_SIZE / 2,
          8 * GRID_SIZE,
          "#a855f7",
          undefined,
          undefined,
          GRID_SIZE / 2
        ),

        /* UNICO CUADRADO PEQUEÑO */
        ...newSquare(
          39 * GRID_SIZE + GRID_SIZE / 2,
          7 * GRID_SIZE,
          "#a855f7",
          undefined,
          undefined,
          GRID_SIZE / 2
        ),
      ],
    },
    {
      id: 7,
      leftLimit: 120,
      rightLimit: 140,
      obstacles: [
        {
          coordX: 20 * GRID_SIZE,
          coordY: 10 * GRID_SIZE,
          width: MAP_WIDTH,
          height: 3 * GRID_SIZE,
          figure: Figures.SQUARE,
          color: "#a855f7",
        },
        /* 2 CUADRADOS PEQUEÑOS */
        ...newSquare(
          20 * GRID_SIZE + GRID_SIZE / 2,
          7 * GRID_SIZE,
          "#a855f7",
          1,
          undefined,
          GRID_SIZE / 2
        ),

        /* TRIANGULO ENCIMA DE CUADRADO INCOMPLETO */
        /* ...newSquare(
          23 * GRID_SIZE,
          9 * GRID_SIZE + GRID_SIZE * 0.375,
          "#a855f7",
          undefined,
          undefined,
          0.625 * GRID_SIZE
        ), */
        ...newSquare(
          23 * GRID_SIZE + GRID_SIZE / 2,
          9 * GRID_SIZE + GRID_SIZE * 0.375,
          "#a855f7",
          undefined,
          undefined,
          0.625 * GRID_SIZE
        ),
        ...newSquare(
          23 * GRID_SIZE + GRID_SIZE / 2,
          6 * GRID_SIZE + GRID_SIZE * 0.375,
          "#a855f7",
          undefined,
          2
        ),
        ...newTriangle(
          24 * GRID_SIZE,
          5 * GRID_SIZE + GRID_SIZE * 0.375,
          "#a855f7"
        ),
      ],
    },
  ];
};
