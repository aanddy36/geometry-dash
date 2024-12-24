import { Coord, GameState } from "../types";
import { Game } from "./Game";
import { Map } from "./Map";

interface Props {
  coordX: number;
  coordY: number;
  speedX: number;
  color: string;
  width?: number;
  height?: number;
}

export class Player {
  position: Coord;
  speed: Coord;
  color: string;
  width: number;
  height: number;

  isMidAir = false;
  isMousePressed = false;
  angle = 0;
  remainingAngle = 0;

  constructor({
    coordX,
    coordY,
    speedX,
    color,
    width = Map.CELL_SIZE,
    height = Map.CELL_SIZE,
  }: Props) {
    this.position = { x: coordX, y: coordY };
    this.speed = { x: speedX, y: 0 };
    this.color = color;
    this.width = width;
    this.height = height;
  }

  draw(game: Game) {
    const ctx = game.map.ctx;
    if (!ctx) return;

    // Guardar el estado actual del contexto
    ctx.save();

    // SEGUNDO GIRO: Girar en torno al vértice en contacto cuando caemos rotados en un obstáculo
    if (!this.isMidAir && this.remainingAngle !== 0) {
      this.drawWithPivot(ctx, game.ROTATION_RATE);
    } else {
      // --- Primer giro: Rotación alrededor del centro si estamos en el aire ---
      this.drawDefault(ctx);
    }

    // Restaurar el contexto para evitar que afecte otros elementos
    ctx.restore();
  }

  move(game: Game) {
    //Agrega el salto. Siempre que esté presionado el click, saltaremos. Si estamos en mitad del aire se ignora.
    if (this.isMousePressed) this.jump(game);

    // VERTICAL
    if (this.isMidAir) {
      this.speed.y += game.GRAVITY; //Aceleramos con la gravedad
      this.position.y += this.speed.y;
      this.angle = (this.angle + game.ROTATION_RATE) % 90; //Nos aseguramos que rote máximo a 90°
    }

    //HORIZONTAL
    this.position.x += this.speed.x;
  }

  jump(game: Game) {
    if (!this.isMidAir && game.gameState === GameState.ACTIVO) {
      this.isMidAir = true;
      this.speed.y = game.JUMP_SPEED;
    }
  }

  get vertexs(): Coord[] {
    const myLeft = this.position.x;
    const myRight = myLeft + this.width;
    const myTop = this.position.y;
    const myBottom = myTop + this.height;

    // Coordenadas del centro del rectángulo
    const centerX = myLeft + this.width / 2;
    const centerY = myTop + this.height / 2;

    // Calcular seno y coseno del ángulo (en radianes)
    const angleInRadians = (this.angle * Math.PI) / 180; // Convertir de grados a radianes si es necesario
    const cos = Math.cos(angleInRadians);
    const sin = Math.sin(angleInRadians);

    // Función para rotar un punto alrededor del centro
    const rotatePoint = (x: number, y: number): Coord => ({
      x: centerX + (x - centerX) * cos - (y - centerY) * sin,
      y: centerY + (x - centerX) * sin + (y - centerY) * cos,
    });

    // Vértices del rectángulo (esquinas sin rotar)
    const topLeft = rotatePoint(myLeft, myTop);
    const topRight = rotatePoint(myRight, myTop);
    const bottomRight = rotatePoint(myRight, myBottom);
    const bottomLeft = rotatePoint(myLeft, myBottom);

    return [topLeft, topRight, bottomRight, bottomLeft];
  }

  set resetPosition(CELL_SIZE: number) {
    this.position = { x: 1 * CELL_SIZE, y: 9 * CELL_SIZE };
    this.speed.y = 0;
    this.isMidAir = false;
    this.angle = 0;
    this.remainingAngle = 0;
  }

  getLowestVertex() {
    return this.vertexs.reduce((lowest, vertex) =>
      vertex.y > lowest.y ? vertex : lowest
    );
  }

  drawDefault(ctx: CanvasRenderingContext2D) {
    // Mover el origen al centro actual del jugador
    const centerX = this.position.x + this.width / 2;
    const centerY = this.position.y + this.height / 2;

    ctx.translate(centerX, centerY); // Trasladar al centro del jugador
    ctx.rotate((this.angle * Math.PI) / 180); // Rotar el canvas

    // Dibujar el jugador desde el nuevo origen
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height); // Dibuja relativo al centro actual

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height);
  }

  drawWithPivot(ctx: CanvasRenderingContext2D, rotRate: number) {
    const lowestVertex = this.getLowestVertex(); //Encontramos el vértice más bajo sobre el que pivoteamos
    //console.log("Remaining: " + this.remainingAngle);
    ctx.translate(lowestVertex.x, lowestVertex.y); // Ajustamos el origen al vértice en contacto

    const oldAngle = Math.abs(this.remainingAngle); //El valor absoluto del ángulo
    const angleSign = Math.sign(this.remainingAngle); //Si el ángulo es positivo o negativo

    //Cuadramos de cuánto será el cambio de ángulo. Siempre será 2, a menos que lo que falte sea menos que 2
    const angleStep = oldAngle > rotRate ? rotRate : oldAngle;

    const newAngle = (oldAngle - angleStep) * angleSign; //El ángulo nuevo
    ctx.rotate((newAngle * Math.PI) / 180); // Giramos alrededor del vértice en contacto

    // Dibujo del cubo después del giro
    ctx.fillStyle = this.color;
    if (angleSign > 0) {
      // Giro a favor de las agujas del reloj
      ctx.fillRect(-this.width, -this.height, this.width, this.height);
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.strokeRect(-this.width, -this.height, this.width, this.height);
    } else {
      // Giro en sentido contrario a las agujas del reloj
      ctx.fillRect(0, -this.height, this.width, this.height);
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.strokeRect(0, -this.height, this.width, this.height);
    }
    this.remainingAngle = newAngle; // Le restamos al remainingAngle lo que cambiamos
    //game.stopGame();
    if (this.remainingAngle === 0) {
      this.angle = 0; //Hacemos 0 el ángulo en caso de que ya hayamos reestablecido todo
      this.position.y = lowestVertex.y - this.height;
      if (angleSign < 0) this.position.x = lowestVertex.x;
      //console.log(this.getLowestVertex());
    }
  }
}
