const canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
const c = canvas.getContext("2d");

let particles;
let mouseDown = false;
const colors = [
  "#2185C5",
  "#7ECEFD",
  "FFF6E5",
  "#FF7F66",
  "#FFFFFF",
  "#F3F3AA",
];

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

addEventListener("mousedown", () => {
  mouseDown = true;
});

addEventListener("mouseup", () => {
  mouseDown = false;
});

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class Particle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.shadowColor = this.color;
    c.shadowBlur = 15;
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();
  }
}

function init() {
  particles = [];

  for (let i = 0; i < 700; i++) {
    const newCanvasWidth = innerWidth + 600;
    const newCanvasHeight = innerHeight + 600;
    const x = randomIntFromRange(0, newCanvasWidth) - newCanvasWidth / 2;
    const y = randomIntFromRange(0, newCanvasHeight) - newCanvasHeight / 2;
    const radius = Math.random() * 2;
    const color = colors[Math.floor(Math.random() * colors.length)];

    particles.push(new Particle(x, y, radius, color));
  }
}
init();

let radians = 0;
let alpha = 1;

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = `rgba(10, 10, 10, ${alpha})`;
  c.fillRect(0, 0, innerWidth, innerHeight);

  c.save();
  c.translate(innerWidth / 2, innerHeight / 2);
  c.rotate(radians);
  particles.forEach((particle) => {
    particle.update();
  });
  c.restore();

  radians += 0.002;

  if (mouseDown && alpha >= 0.001) {
    alpha -= 0.1;
  } else if (!mouseDown && alpha <= 1) {
    alpha += 0.005;
  }
}
animate();
