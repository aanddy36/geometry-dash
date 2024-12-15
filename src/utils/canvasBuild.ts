import { GRID_SIZE, N_GRID_X, N_GRID_Y } from "../constants/initialValues";
import { obstacles } from "../constants/mapObjects";
import { Player } from "../types";
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
export const drawObstacles = (ctx: CanvasRenderingContext2D) => {
  for (let obstacle of obstacles) {
    //Si es cuadrado...
    if (isSquare(obstacle)) {
      const { coordX, coordY, width, height, color } = obstacle;
      ctx.fillStyle = color;
      ctx.fillRect(coordX, coordY, width, height);
    }

    //Si es triángulo
    if (isTriangle(obstacle)) {
      const { vertex1, vertex2, vertex3, color } = obstacle;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(vertex1.x, vertex1.y); // Mueve a la posición del primer vértice
      ctx.lineTo(vertex2.x, vertex2.y); // Dibuja línea hasta el segundo vértice
      ctx.lineTo(vertex3.x, vertex3.y); // Dibuja línea hasta el tercer vértice
      ctx.closePath(); // Cierra el triángulo volviendo al primer vértice
      ctx.fill();
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
