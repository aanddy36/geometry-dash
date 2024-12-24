import { GameState } from "../types";
import { Game } from "./Game";

export class Map {
  dashboard: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  bgColor: string;

  static readonly CELL_SIZE = 50;
  static readonly N_CELLS_X = 20;
  static readonly N_CELLS_Y = 13;
  static readonly MAP_WIDTH = Map.N_CELLS_X * Map.CELL_SIZE;
  static readonly MAP_HEIGHT = Map.N_CELLS_Y * Map.CELL_SIZE;
  static readonly CAMERA_MOV_START = Map.CELL_SIZE * 6;
  isMapMoving = false;
  movedDistance = 0;
  currentSection = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.dashboard = canvas;
    this.ctx = this.dashboard.getContext("2d");
    this.bgColor = "#c6c6c6";
  }

  setBackground() {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, Map.MAP_WIDTH, Map.MAP_HEIGHT); // Limpiar

      this.dashboard.width = Map.MAP_WIDTH; //Definir ancho del canvas
      this.dashboard.height = Map.MAP_HEIGHT; //Definir alto del canvas

      this.ctx.fillStyle = this.bgColor; // Agregar color de fondo
      this.ctx.fillRect(0, 0, Map.MAP_WIDTH, Map.MAP_HEIGHT);

      this.createGrid(); //Dibujamos la grilla
    }
  }

  createGrid() {
    if (this.ctx) {
      this.ctx.strokeStyle = "rgba(0, 0, 0, 0.2)"; // Color de las líneas (gris claro)
      this.ctx.lineWidth = 1; // Grosor de las líneas

      // Dibujar líneas verticales
      for (let x = 0; x <= Map.MAP_WIDTH; x += Map.CELL_SIZE) {
        this.ctx.beginPath(); // Hace que cada línea sea independiente
        this.ctx.moveTo(x, 0); // Inicio de la línea
        this.ctx.lineTo(x, Map.MAP_HEIGHT); // Final de la línea
        this.ctx.stroke(); //Dibujar
      }

      // Dibujar líneas horizontales
      for (let y = 0; y <= Map.MAP_HEIGHT; y += Map.CELL_SIZE) {
        this.ctx.beginPath();
        this.ctx.moveTo(0, y);
        this.ctx.lineTo(Map.MAP_WIDTH, y);
        this.ctx.stroke();
      }
    }
  }

  moveCamera(game: Game) {
    //La función solo se ejecutará si (1) se está moviendo el mapa y (2) está activo el juego
    if (!this.isMapMoving || game.gameState !== GameState.ACTIVO) return;

    const sectionWidth = Map.MAP_WIDTH; // El límite de la sección será 20 * GRID_SIZE
    this.movedDistance += game.player.speed.x; // Cada avance lo acumulamos.
    if (this.movedDistance > sectionWidth) {
      this.currentSection += 1; //Subimos de sección
      this.movedDistance = 0; //Reiniciamos el contador
      console.log(this.currentSection);
    }
  }
}
