import { initialObstacles, initialSections } from "../initialValues";
import { GameMode, GameState, PlayerStats } from "../types";
import { Map } from "./Map";
import { Player } from "./Player";
import { Square } from "./Square";
import { Triangle } from "./Triangle";

export class Game {
  private _animationId: number | null = null;
  readonly GRAVITY: number;
  readonly JUMP_SPEED: number;
  readonly SPEED_X: number;
  readonly ROTATION_RATE: number;

  gameState: GameState = GameState.LISTO;
  map: Map;
  player: Player;
  obstacles: (Square | Triangle)[] = initialObstacles;
  gameMode: GameMode = GameMode.DEFAULT;
  updatePlayerStats: (stats: PlayerStats) => void;

  constructor(
    canvas: HTMLCanvasElement,
    updatePlayerStats: (stats: PlayerStats) => void
  ) {
    this.GRAVITY = 0.0028 * Map.CELL_SIZE;
    this.JUMP_SPEED = -Math.sqrt(4.4 * this.GRAVITY * Map.CELL_SIZE);
    this.SPEED_X =
      Math.round(
        ((-2.5 * Map.CELL_SIZE * this.GRAVITY) / this.JUMP_SPEED) * 100
      ) / 100;
    this.ROTATION_RATE = (90 * this.GRAVITY) / -this.JUMP_SPEED;

    this.map = new Map(canvas, initialSections);
    this.updatePlayerStats = updatePlayerStats;
    this.player = new Player({
      coordX: -5,
      coordY: 9,
      speedX: this.SPEED_X,
      color: "#ef4444",
    });

    this.animate = this.animate.bind(this);
  }

  animate() {
    //console.log("Corriendo");

    this.update();
    this._animationId = requestAnimationFrame(this.animate);
  }

  // Dibujar el canvas
  update() {
    this.map.setBackground(); // 1. Dibujamos el bg del mapa
    this.player.move(this); // 2. Movemos al jugador
    this.map.moveCamera(this); // 3. Movemos la cámara y cambiamos de sección de ser necesario

    //Este estado lo creamos para verificar si algun obstáculo chocó o no.
    const collisionState = { illegalCollision: false }; // Será true si hay un choque que acabe el juego
    this.handleObstacles(collisionState); // Movemos, dibujamos y chequeamos si el obstáculo chocó

    this.player.draw(this); //6. Dibujar al personaje

    this.updateReactUI(); //7. Actualizamos el UI para el seguimiento

    // Acabamos el juego si hubo un choque ilegal
    if (collisionState.illegalCollision) return this.finishGame();
  }

  handleObstacles(collisionState: { illegalCollision: boolean }) {
    const { currentSection, nextSection } = this.map;
    const allObstacles = [
      ...currentSection.obstacles,
      ...(nextSection ? nextSection.obstacles : []),
    ];
    //console.log(allObstacles);
    const someoneCollided: boolean[] = allObstacles.map((obs) => {
      obs.move(this); // 4. Movemos los obstáculos
      obs.draw(this.map.ctx); // 5. Dibujamos cada obstáculo

      //Solo evaluamos si no ha habido un choque ilegal
      if (!collisionState.illegalCollision) {
        return obs.checkCollision(this, collisionState); //5.5. Evaluamos si ese obstáculo chocó
      }
      return false;

      /* -------------------------------------
      OJO
      --------------------------------------
      
      1. AGREGAR RESET FUNCTION EN EL MAP PARA RESTAURAR LA SECCION, DISTANCETRACKE AL HACER RESETGAME*/
    });
    //console.log(someoneCollided.length);

    this.player.isMidAir = !someoneCollided.includes(true); // En caso de que ningún obstáculo haya colisionado
  }

  startGame() {
    if (!this._animationId) this.animate();
    this.map.bgColor = "#88e884";
    this.gameState = GameState.ACTIVO;
  }

  stopGame() {
    this.map.bgColor = "#eded77";
    this.gameState = GameState.SUSPENDIDO;
  }

  continueGame() {
    if (this._animationId) {
      this.map.bgColor = "#88e884";
      this.gameState = GameState.ACTIVO;
    }
  }

  resetGame() {
    this.map.bgColor = "#c6c6c6";
    this.player.resetPosition = Map.CELL_SIZE;
    this.map.resetMap();
    if (this.gameState === GameState.FINALIZADO) {
      this.update(); // Redibujar el mapa si se finalizó el juego
    }
    this.gameState = GameState.LISTO; // Cambiar estado a listo
  }

  finishGame() {
    this.map.bgColor = "#e88488";
    this.gameState = GameState.FINALIZADO;
    this.player.isMidAir = false;
    if (this._animationId) {
      cancelAnimationFrame(this._animationId); // Cancelar animación
      //this.update(); // Redibujar el mapa
      this._animationId = null;
    }
  }

  updateReactUI() {
    if ([GameState.ACTIVO, GameState.LISTO].includes(this.gameState)) {
      this.updatePlayerStats({
        positionX: this.player.position.x,
        positionY: this.player.position.y,
        speedX: this.player.speed.x,
        speedY: this.player.speed.y,
        angle: this.player.angle,
        rotationRate: this.ROTATION_RATE,
      });
    }
  }
}
