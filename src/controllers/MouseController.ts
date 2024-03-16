interface IMouseController {
  getPos(e: MouseEvent, board: HTMLCanvasElement): IBaseVec;
}

interface IBaseVec {
  x: number;
  y: number;
}

export class MouseController implements IMouseController {
  getPos(e: MouseEvent, board: HTMLCanvasElement): IBaseVec {
    const x = e.clientX - board.getBoundingClientRect().left;
    const y = e.clientY - board.getBoundingClientRect().top;

    return { x, y };
  }
}
