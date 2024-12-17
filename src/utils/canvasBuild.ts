import { GRID_SIZE, N_GRID_X, N_GRID_Y } from "../constants/initialValues";
import {
  Obstacle,
  Player,
  Section,
  SectionsPair,
  Speeds,
  Square,
  Triangle,
} from "../types";
import { isSquare, isTriangle } from "./collisionsFunctions";

//Tamaño y color mapa
export const setBoundaries = (
  map: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  bgColor: string
) => {
  map.width = GRID_SIZE * N_GRID_X; //Ancho
  map.height = GRID_SIZE * N_GRID_Y; //Alto

  ctx.fillStyle = bgColor; // Color del mapa
  ctx.fillRect(0, 0, map.width, map.height); //Creamos un cubo del tamaño del mapa para aplicar el bg color
};

//Crear grilla
export const createGrid = (
  map: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) => {
  // Dibujar la grilla
  ctx.strokeStyle = "rgba(0, 0, 0, 0.2)"; // Color de las líneas (gris claro)
  ctx.lineWidth = 1; // Grosor de las líneas

  // Dibujar líneas verticales
  for (let x = 0; x <= map.width; x += GRID_SIZE) {
    ctx.beginPath(); // Hace que cada línea sea independiente
    ctx.moveTo(x, 0); // Inicio de la línea
    ctx.lineTo(x, map.height); // Final de la línea
    ctx.stroke(); //Dibujar
  }

  // Dibujar líneas horizontales
  for (let y = 0; y <= map.height; y += GRID_SIZE) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(map.width, y);
    ctx.stroke();
  }
};

// Dibujar obstáculos
export const drawObstacles = (
  ctx: CanvasRenderingContext2D,
  speed: Speeds,
  isMapMoving: boolean,
  sections: React.MutableRefObject<SectionsPair>
) => {
  const { current, next } = sections.current; //Extraemos la sección actual y la siguiente

  //Dibujamos los cuadrados de la sección actual
  for (let obstacle of current.obstacles) {
    //Si es cuadrado...
    if (isSquare(obstacle)) {
      drawSquare(obstacle, ctx, speed, isMapMoving, sections, "current");
    }

    //Si es triángulo
    if (isTriangle(obstacle)) {
      drawTriangles(obstacle, ctx, speed, isMapMoving, sections, "current");
    }
  }

  //Dibujamos los cuadrados de la sección siguiente
  if (next) {
    for (let obstacle of next.obstacles) {
      //Si es cuadrado...
      if (isSquare(obstacle)) {
        drawSquare(obstacle, ctx, speed, isMapMoving, sections, "next");
      }

      //Si es triángulo
      if (isTriangle(obstacle)) {
        drawTriangles(obstacle, ctx, speed, isMapMoving, sections, "next");
      }
    }
  }
};

//Dibujar jugador
export const createPlayer = (ctx: CanvasRenderingContext2D, player: Player) => {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.posX, player.posY, GRID_SIZE, GRID_SIZE);

  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  ctx.strokeRect(player.posX, player.posY, GRID_SIZE, GRID_SIZE);
};

// Dibujar cuadrados
const drawSquare = (
  square: Square,
  ctx: CanvasRenderingContext2D,
  speed: Speeds,
  isMapMoving: boolean,
  sections: React.MutableRefObject<SectionsPair>,
  whichSection: "next" | "current" //Nos determinará la sección dentro de sections
) => {
  const { coordX, coordY, width, height, color } = square;
  let newPosX = coordX;

  //Si la cámara se mueve, actualizamos la posición de cada objeto
  if (isMapMoving) {
    newPosX -= speed.x; //Movemos cada objeto a la izquierda

    //Dependiendo de en qué sección estemos, escogemos el array
    let oldArray =
      whichSection === "next"
        ? (sections.current.next as Section).obstacles // Sabemos que sí será Section
        : sections.current.current.obstacles;

    //Actualizamos el array de obstáculos
    const newObs = oldArray.map((obs) => {
      //Si es el obstáculo en cuestión
      if (JSON.stringify(obs) === JSON.stringify(square)) {
        return { ...obs, coordX: newPosX } as Square;
      } else return obs;
    });

    if (whichSection === "next") {
      (sections.current.next as Section).obstacles = newObs;
    } else {
      sections.current.current.obstacles = newObs;
    }
  }
  ctx.fillStyle = color;
  ctx.fillRect(newPosX, coordY, width, height);
};

// Dibujar triángulos
const drawTriangles = (
  triangle: Triangle,
  ctx: CanvasRenderingContext2D,
  speed: Speeds,
  isMapMoving: boolean,
  sections: React.MutableRefObject<SectionsPair>,
  whichSection: "next" | "current"
) => {
  const { vertex1, vertex2, vertex3, color } = triangle;
  let newVertex1 = { ...vertex1 };
  let newVertex2 = { ...vertex2 };
  let newVertex3 = { ...vertex3 };

  //Si la cámara se mueve, actualizamos la posición de cada objeto
  if (isMapMoving) {
    newVertex1.x -= speed.x; //Movemos cada vértice a la izquierda
    newVertex2.x -= speed.x;
    newVertex3.x -= speed.x;

    //Dependiendo de en qué sección estemos, escogemos el array
    let oldArray =
      whichSection === "next"
        ? (sections.current.next as Section).obstacles
        : sections.current.current.obstacles;

    //Actualizamos el array de obstáculos
    const newObs = oldArray.map((obs) => {
      //Si es el obstáculo en cuestión
      if (JSON.stringify(obs) === JSON.stringify(triangle)) {
        return {
          ...obs,
          vertex1: newVertex1,
          vertex2: newVertex2,
          vertex3: newVertex3,
        } as Triangle;
      } else return obs;
    });

    if (whichSection === "next") {
      (sections.current.next as Section).obstacles = newObs;
    } else {
      sections.current.current.obstacles = newObs;
    }
  }

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(newVertex1.x, newVertex1.y); // Mueve a la posición del primer vértice
  ctx.lineTo(newVertex2.x, newVertex2.y); // Dibuja línea hasta el segundo vértice
  ctx.lineTo(newVertex3.x, newVertex3.y); // Dibuja línea hasta el tercer vértice
  ctx.closePath(); // Cierra el triángulo volviendo al primer vértice
  ctx.fill();
};
