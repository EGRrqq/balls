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

  window.addEventListener("load", draw, { once: true });
  board.addEventListener("mousemove", (e) => onMove(e));

  function onMove(e: MouseEvent) {
    const dirVec = vectorController.dirVec(
      mouseController.getPos(e, board),
      ballController.getPos()
    );
    const distance = vectorController.distance(dirVec);
    const normDirVec = vectorController.normalizeDirVec(dirVec, distance);

    ballController.onTouch(distance, () => {
      ballController.applyImpulse(-6, normDirVec);
    });
  }

  function draw() {
    boardController.clearBoard();
    ballController.draw();

    ballController.updatePos();
    ballController.dampVelocity(0.99);
    ballController.detectCollision(board);

    requestAnimationFrame(draw);
  }
}
