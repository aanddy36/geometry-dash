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
import { isSquare } from "./collisionsFunctions";

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

  moveObstacles(current, speed, isMapMoving, ctx);

  if (next) moveObstacles(next, speed, isMapMoving, ctx);
};

//Dibujar jugador
export const createPlayer = (ctx: CanvasRenderingContext2D, player: Player) => {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.posX, player.posY, GRID_SIZE, GRID_SIZE);

  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  ctx.strokeRect(player.posX, player.posY, GRID_SIZE, GRID_SIZE);
};

// Desplazar el obstáculo, ya sea cuadrado o triángulo
const moveObstacle = (obstacle: Obstacle, speed: Speeds): Square | Triangle => {
  //En caso de ser cuadrado...
  if (isSquare(obstacle)) {
    const { coordX } = obstacle;
    let newPosX = coordX;

    newPosX -= speed.x; //Movemos cada objeto a la izquierda

    return { ...obstacle, coordX: newPosX };
  }

  //Si no es cuadrado, es triángulo
  const { vertex1, vertex2, vertex3 } = obstacle;
  let newVertex1 = { ...vertex1, x: vertex1.x - speed.x }; //Movemos cada vértice a la izquierda
  let newVertex2 = { ...vertex2, x: vertex2.x - speed.x };
  let newVertex3 = { ...vertex3, x: vertex3.x - speed.x };

  return {
    ...obstacle,
    vertex1: newVertex1,
    vertex2: newVertex2,
    vertex3: newVertex3,
  };
};

export const moveObstacles = (
  section: Section,
  speed: Speeds,
  isMapMoving: boolean,
  ctx: CanvasRenderingContext2D
) => {
  //Vamos a dibujar los obstáculos
  const newObs = section.obstacles.map((obs) => {
    // Solo los moveremos en caso de que el mapa se esté moviendo
    let movedObj = obs;
    if (isMapMoving) {
      movedObj = moveObstacle(obs, speed);
    }

    if (isSquare(movedObj)) {
      const { coordX, coordY, width, height, color } = movedObj;

      ctx.fillStyle = color;
      ctx.fillRect(coordX, coordY, width, height);
    } else {
      const { vertex1, vertex2, vertex3, color } = movedObj;

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(vertex1.x, vertex1.y); // Mueve a la posición del primer vértice
      ctx.lineTo(vertex2.x, vertex2.y); // Dibuja línea hasta el segundo vértice
      ctx.lineTo(vertex3.x, vertex3.y); // Dibuja línea hasta el tercer vértice
      ctx.closePath(); // Cierra el triángulo volviendo al primer vértice
      ctx.fill();
    }

    return movedObj;
  });

  section.obstacles = newObs;
};
