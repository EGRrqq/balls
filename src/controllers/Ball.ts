interface IBall {
  draw(): void;
}

export class Ball implements IBall {
  #context: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.#context = ctx;
  }

  draw() {
    this.#ctx.beginPath()
    this.#ctx.arc(100, 75, 50, 0, 2 * Math.PI);
    this.#ctx.fill();
    this.#ctx.closePath()
  }

  get #ctx() {
    return this.#context;
  }
}
