import { GRID_SIZE, MAP_WIDTH, N_GRID_Y } from "../constants/initialValues";
import {
  Figures,
  Orientation,
  Position,
  Section,
  SectionsPair,
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
          color: "#FFF",
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
  ];
};
