import "./style.css";
import { IData, generateData } from "./data";

const data = generateData(10);

if (data) {
  window.addEventListener("load", () => draw(data), {
    once: true,
  });
  data.boardController.board.addEventListener("mousemove", (e) =>
    onMove(e, data)
  );

  function onMove(e: MouseEvent, data: IData) {
    data.shapeControllers.forEach((c) => {
      const dirVec = c.vector.dirVec(
        c.mouse.getPos(e, data.boardController.board),
        c.ball.getPos()
      );
      const distance = c.vector.distance(dirVec);
      const normDirVec = c.vector.normalizeDirVec(dirVec, distance);

      c.ball.onTouch(distance, () => {
        c.ball.applyImpulse(-8, normDirVec);
      });
    });
  }

  function draw(data: IData) {
    data.boardController.clearBoard();

    data.shapeControllers.forEach((c) => {
      c.ball.draw();

      c.ball.updatePos();
      c.ball.dampVelocity(0.99);
      c.ball.edgeCollision(data.boardController.board);
      c.ball.ballsCollision(data.shapeControllers);
    });

    requestAnimationFrame(() => draw(data));
  }
}
