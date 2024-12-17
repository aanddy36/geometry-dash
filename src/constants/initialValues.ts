/* export const initialSpeed: Speeds = {
  x: 3,
  y: 0,
}; */

// Tamaño de una celda
export const GRID_SIZE = 65;

export const initialPlayer = {
  posX: -5 * GRID_SIZE,
  posY: 9 * GRID_SIZE,
  width: GRID_SIZE,
  height: GRID_SIZE,
  color: "#ef4444",
};

// Tamaño del mapa (20x11)
export const N_GRID_X = 20;
export const N_GRID_Y = 13;

// Ancho y alto del mapa
export const MAP_WIDTH = N_GRID_X * GRID_SIZE;
export const MAP_HEIGHT = N_GRID_Y * GRID_SIZE;

//Tamaño del marco
export const frameX = 20;
export const frameY = 11;

// Aceleración vertical
export const GRAVITY = 0.0028 * GRID_SIZE; //0.14

// Velocidad al saltar. Es negativa para que ascienda
export const JUMP_SPEED = -1 * Math.sqrt(4.3 * GRAVITY * GRID_SIZE); //-5.53

export const initialSpeed = {
  x: Math.round(((-2.5 * GRID_SIZE * GRAVITY) / JUMP_SPEED) * 100) / 100, //3.25
  y: 0,
};

export const CAMERA_MOV_START = GRID_SIZE * 6;