interface IBoardSettings {
  board: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
}

export class BoardController implements IBoardSettings {
  #boardElem: HTMLCanvasElement;

  constructor(boardEl: HTMLCanvasElement) {
    this.#boardElem = boardEl;
  }

  clearBoard(): void {
    this.ctx?.clearRect(0, 0, this.board.width, this.board.height);
  }

  get board(): HTMLCanvasElement {
    return this.#boardElem;
  }

  get ctx(): CanvasRenderingContext2D | null {
    return this.board.getContext("2d");
  }
}
