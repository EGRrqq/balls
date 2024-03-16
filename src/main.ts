import "./style.css";

const board = document.getElementById("board") as HTMLCanvasElement;
const ctx = board!.getContext("2d");
let raf: number;

const ball = {
  x: 100,
  y: 100,
  vx: 5,
  vy: 1,
  radius: 50,
  color: "blue",
  draw() {
    ctx!.beginPath();
    ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx!.closePath();
    ctx!.fillStyle = this.color;
    ctx!.fill();
  },
};

function clear() {
  ctx!.clearRect(0, 0, board.width, board.height);
}

function draw(e: MouseEvent) {
  clear();
  ball.draw();

  const mouseX = e.clientX - board.getBoundingClientRect().left;
  const mouseY = e.clientY - board.getBoundingClientRect().top;

  // Calculate the direction vector from circle center to mouse
  const dirX = mouseX - ball.x;
  const dirY = mouseY - ball.y;
  const distance = Math.sqrt(dirX * dirX + dirY * dirY);

  // Normalize the direction vector
  const normalizedDirX = dirX / distance;
  const normalizedDirY = dirY / distance;

  // Apply an impulse
  const impulseStrength = 0.7;
  ball.vx += normalizedDirX * impulseStrength;
  ball.vy += normalizedDirY * impulseStrength;

  ball.x += ball.vx;
  ball.y += ball.vy;
  ball.vx *= 0.99;
  ball.vy *= 0.99;

  // Detect collision
  if (
    ball.y + ball.vy > board.height - ball.radius ||
    ball.y + ball.vy < ball.radius
  ) {
    ball.vy = -ball.vy;
  }
  if (
    ball.x + ball.vx > board.width - ball.radius ||
    ball.x + ball.vx < ball.radius
  ) {
    ball.vx = -ball.vx;
  }

  console.log({ x: ball.x, y: ball.y });

  raf = window.requestAnimationFrame(() => draw(e));
}

board.addEventListener("click", (e) => {
  raf = window.requestAnimationFrame(() => draw(e));
});

board.addEventListener("mouseover", (e) => {
  raf = window.requestAnimationFrame(() => draw(e));
});

board.addEventListener("mouseout", () => {
  window.cancelAnimationFrame(raf);
});

ball.draw();
