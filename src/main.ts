import { Ball } from './controllers/Ball';
import './style.css'

window.addEventListener("load", init, { once: true });

function init() {
  const board = document.getElementById("board") as HTMLCanvasElement;
  const ctx = board.getContext("2d");

  if (!ctx) return;


  const ball = new Ball(ctx);
  ball.draw();
}
