import { GameState, Player, Speeds } from "../types";

// Iniciar el juego
export const startGame = (
  animate: () => void,
  bgColor: React.MutableRefObject<string>,
  gameState: React.MutableRefObject<GameState>,
  animationId: number | null
) => {
  if (!animationId) {
    animate();
  }
  bgColor.current = "#88e884"; // Cambiar color de fondo
  gameState.current = GameState.ACTIVO; // Cambiar el estado del juego
};

// Pausar el juego
export const stopGame = (
  bgColor: React.MutableRefObject<string>,
  gameState: React.MutableRefObject<GameState>
) => {
  bgColor.current = "#eded77"; // Cambiar color de fondo
  gameState.current = GameState.SUSPENDIDO; // Cambiar el estado del juego
};

// Finalizar el juego
export const finishGame = (
  bgColor: React.MutableRefObject<string>,
  gameState: React.MutableRefObject<GameState>,
  animationId: number | null,
  setAnimationId: React.Dispatch<React.SetStateAction<number | null>>,
  drawCanvas: () => void
) => {
  bgColor.current = "#e88488"; // Cambiar color de fondo
  gameState.current = GameState.FINALIZADO; // Cambiar el estado del juego
  if (animationId) {
    drawCanvas(); // Redibujar el mapa
    cancelAnimationFrame(animationId); // Cancelar animación
    setAnimationId(null); // Resetear ID de animación
  }
};

// Reiniciar el juego
export const resetGame = (
  bgColor: React.MutableRefObject<string>,
  speed: React.MutableRefObject<Speeds>,
  player: React.MutableRefObject<Player>,
  gameState: React.MutableRefObject<GameState>,
  drawCanvas: () => void
) => {
  bgColor.current = "#c6c6c6"; // Cambiar color de fondo
  speed.current = { x: 2, y: 0 }; // Resetear velocidad
  player.current.posX = 10; // Resetear posición del jugador
  player.current.posY = 150;
  if (gameState.current === GameState.FINALIZADO) {
    drawCanvas(); // Redibujar el mapa si se finalizó el juego
  }
  gameState.current = GameState.LISTO; // Cambiar estado a listo
};
