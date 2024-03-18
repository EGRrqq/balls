import { IBoardController, IShapeController } from "../controllers";

export interface IData {
  boardController: IBoardController;
  shapeControllers: IShapeController[];
}
