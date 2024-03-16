interface IBallController {
  settings: IBallSettings;

  draw(settings: IBallSettings): void;
  applyImpulse(impulseStrength: number, normDirVec: IBaseVec): void;
  updatePos(): void;
  getPos(): IBaseVec;
  dampVelocity(r: number): void;
  detectCollision(board: IRatio): void;
}

interface IBallSettings {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
}

interface IBaseVec {
  x: number;
  y: number;
}
interface IRatio {
  height: number;
  width: number;
}

export class BallController implements IBallController {
  #context: CanvasRenderingContext2D;
  #settings: IBallSettings = {
    x: 100,
    y: 75,
    dx: 5,
    dy: 2,
    radius: 50,
  };

  constructor(ctx: CanvasRenderingContext2D) {
    this.#context = ctx;
  }

  draw(settings: IBallSettings = this.#settings) {
    this.#ctx.beginPath();
    this.#ctx.arc(settings.x, settings.y, settings.radius, 0, 2 * Math.PI);
    this.#ctx.fill();
    this.#ctx.closePath();
  }

  applyImpulse(impulseStrength: number, normDirVec: IBaseVec): void {
    this.settings.dx += normDirVec.x * impulseStrength;
    this.settings.dy += normDirVec.y * impulseStrength;
  }

  // Update circle pos based on velocity
  updatePos() {
    this.settings.x += this.settings.dx;
    this.settings.y += this.settings.dy;
  }

  getPos(): IBaseVec {
    return {
      x: this.settings.x,
      y: this.settings.y,
    };
  }

  detectCollision(board: IRatio) {
    if (
      this.settings.y + this.settings.dy >
        board.height - this.settings.radius ||
      this.settings.y + this.settings.dy < this.settings.radius
    ) {
      this.settings.dy = -this.settings.dy;
    }
    if (
      this.settings.x + this.settings.dx > board.width - this.settings.radius ||
      this.settings.x + this.settings.dx < this.settings.radius
    ) {
      this.settings.dx = -this.settings.dx;
    }
  }

  // Damping (reduce velocity over time)
  dampVelocity(r: number) {
    this.settings.dx *= r;
    this.settings.dy *= r;
  }

  get settings() {
    return this.#settings;
  }

  set settings(settings: IBallSettings) {
    this.#settings = Object.assign(settings);
  }

  get #ctx() {
    return this.#context;
  }
}
