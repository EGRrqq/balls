interface IBall {
  draw(): void;
}

interface IBallSettings {
  posX: number;
  posY: number;
}

export class Ball implements IBall {
  #context: CanvasRenderingContext2D;
  #settings: IBallSettings = {
    posX: 100,
    posY: 75,
  };

  constructor(ctx: CanvasRenderingContext2D) {
    this.#context = ctx;
  }

  draw(settings: IBallSettings) {
    this.#ctx.beginPath()
    this.#ctx.arc(settings.posX, settings.posY, 50, 0, 2 * Math.PI);
    this.#ctx.fill();
    this.#ctx.closePath()
  }

  get #ctx() {
    return this.#context;
  }
}
