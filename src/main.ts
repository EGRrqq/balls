import "./style.css";

import {
  BallController,
  BoardController,
  MouseController,
  VectorController,
} from "./controllers";

interface IShapeControllers {
  mouse: MouseController;
  ball: BallController;
  vector: VectorController;
}

const board = document.getElementById("board") as HTMLCanvasElement;
const boardController = new BoardController(board);
const ctx = boardController.ctx;

function createShapeControllers(
  n: number,
  ctx: CanvasRenderingContext2D
): IShapeControllers[] {
  const arr: IShapeControllers[] = [];
  while (n > 0) {
    arr.push({
      mouse: new MouseController(),
      ball: new BallController(ctx),
      vector: new VectorController(),
    });
    n--;
  }

  return arr;
}

const ctrls = createShapeControllers(2, ctx);

window.addEventListener("load", () => draw(ctrls), { once: true });
board.addEventListener("mousemove", (e) => onMove(e, ctrls));

function onMove(e: MouseEvent, controllers: IShapeControllers[]) {
  controllers.forEach((c) => {
    const dirVec = c.vector.dirVec(c.mouse.getPos(e, board), c.ball.getPos());
    const distance = c.vector.distance(dirVec);
    const normDirVec = c.vector.normalizeDirVec(dirVec, distance);

    c.ball.onTouch(distance, () => {
      c.ball.applyImpulse(-8, normDirVec);
    });
  });
}

function draw(controllers: IShapeControllers[]) {
  boardController.clearBoard();

  controllers.forEach((c) => {
    handleCircle(c.ball);
  });

  requestAnimationFrame(() => draw(controllers));
}

function handleCircle(ballController: BallController) {
  ballController.draw();

  ballController.updatePos();
  ballController.dampVelocity(0.99);
  ballController.detectCollision(board);
}
