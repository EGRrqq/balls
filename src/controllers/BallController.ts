import { IData } from "../data";

interface IBallController {
  settings: IBallSettings;

  draw(settings: IBallSettings): void;
  applyImpulse(impulseStrength: number, normDirVec: IBaseVec): void;
  updatePos(): void;
  getPos(): IBaseVec;
  dampVelocity(r: number): void;
  edgeCollision(board: IRatio): void;
  ballsCollision(shapes: IData["shapeControllers"]): void;
}

interface IBallSettings {
  x: number;
  y: number;
  vx: number;
  vy: number;
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
  #flag = false;
  #settings: IBallSettings = {
    x: Math.floor(Math.random() * 700),
    y: Math.floor(Math.random() * 500),
    vx: 0,
    vy: 0,
    radius: 25,
  };

  constructor(ctx: CanvasRenderingContext2D) {
    this.#context = ctx;
  }

  onTouch(distance: number, cb: () => void) {
    if (distance <= this.settings.radius && !this.#flag) {
      this.#flag = true;
      cb();
    }

    if (distance > this.settings.radius && this.#flag) {
      this.#flag = false;
    }
  }

  draw(settings: IBallSettings = this.#settings) {
    this.#ctx.beginPath();
    this.#ctx.arc(settings.x, settings.y, settings.radius, 0, 2 * Math.PI);
    this.#ctx.fill();
    this.#ctx.closePath();
  }

  applyImpulse(impulseStrength: number, normDirVec: IBaseVec): void {
    this.settings.vx += normDirVec.x * impulseStrength;
    this.settings.vy += normDirVec.y * impulseStrength;
  }

  // Update circle pos based on velocity
  updatePos() {
    this.settings.x += this.settings.vx;
    this.settings.y += this.settings.vy;
  }

  getPos(): IBaseVec {
    return {
      x: this.settings.x,
      y: this.settings.y,
    };
  }

  edgeCollision(board: IRatio) {
    if (
      this.settings.y + this.settings.vy >
        board.height - this.settings.radius ||
      this.settings.y + this.settings.vy < this.settings.radius
    ) {
      this.settings.vy = -this.settings.vy;
    }
    if (
      this.settings.x + this.settings.vx > board.width - this.settings.radius ||
      this.settings.x + this.settings.vx < this.settings.radius
    ) {
      this.settings.vx = -this.settings.vx;
    }
  }

  ballsCollision(shapes: IData["shapeControllers"]) {
    for (const otherBall of shapes) {
      if (otherBall.ball !== this) {
        const dirVec = otherBall.vector.dirVec(
          this.getPos(),
          otherBall.ball.getPos()
        );
        const distance = otherBall.vector.distance(dirVec);

        if (distance < this.settings.radius + otherBall.ball.settings.radius) {
          [this.settings.vx, otherBall.ball.settings.vx] = [
            otherBall.ball.settings.vx,
            this.settings.vx,
          ];
          [this.settings.vy, otherBall.ball.settings.vy] = [
            otherBall.ball.settings.vy,
            this.settings.vy,
          ];
        }
      }
    }
  }

  // Damping (reduce velocity over time)
  dampVelocity(r: number) {
    this.settings.vx *= r;
    this.settings.vy *= r;
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
