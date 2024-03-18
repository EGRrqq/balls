import {
  BoardController,
  IShapeController,
  shapeController,
} from "../controllers";
import { IData } from "./IData";

const board = document.getElementById("board") as HTMLCanvasElement;
const boardController = new BoardController(board);
const ctx = boardController.ctx;

export type { IData };
export function generateData(n: number): IData | undefined {
  if (!ctx) return;

  const shapeControllers: IShapeController[] = [];
  while (n > 0) {
    shapeControllers.push(shapeController(ctx));
    n--;
  }

  return {
    boardController,
    shapeControllers,
  };
}
