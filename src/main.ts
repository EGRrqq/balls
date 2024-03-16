import "./style.css";

import {
  BallController,
  BoardController,
  MouseController,
  VectorController,
} from "./controllers";

const board = document.getElementById("board") as HTMLCanvasElement;
const boardController = new BoardController(board);
const ctx = boardController.ctx;

if (ctx) {
  const mouseController = new MouseController();
  const vectorController = new VectorController();
  const ballController = new BallController(ctx);

  ballController.draw();
  board.addEventListener("click", (e) => draw(e));
  board.addEventListener("mouseover", (e) => draw(e));

  function draw(e: MouseEvent) {
    boardController.clearBoard();
    ballController.draw();

    const normDirVec = vectorController.normDirVec(
      mouseController.getPos(e, board),
      ballController.getPos()
    );

    ballController.applyImpulse(0.7, normDirVec);
    ballController.updatePos();
    ballController.dampVelocity(0.99);
    ballController.detectCollision(board);

    requestAnimationFrame(() => draw(e));
  }
}
