import { BallController } from "./BallController";
import { MouseController } from "./MouseController";
import { VectorController } from "./VectorController";

type TShapeController = (ctx: CanvasRenderingContext2D) => IShapeController;

export interface IShapeController {
  mouse: MouseController;
  ball: BallController;
  vector: VectorController;
}
export * from "./BoardController";
export const shapeController: TShapeController = (ctx) =>
  Object.create({
    mouse: new MouseController(),
    ball: new BallController(ctx),
    vector: new VectorController(),
  });
