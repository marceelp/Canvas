const canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
const c = canvas.getContext("2d");

let particles;
const colors = ["#FF4858", "#1B7F79", "#00CCC0", "#72F2EB"];
const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = randomIntFromRange(1, 5);
    this.color = colors[Math.floor(Math.random() * colors.length)]
    this.velocity = 0.05;
    this.radians = Math.random() * (Math.PI * 2);
    this.distanceFromCenter = randomIntFromRange(50, 150);
    this.delay = 0.06
    this.lastMousePos = {
      x: x,
      y: y,
    };
  }

  draw(lastPoint) {
    c.beginPath();
    c.moveTo(lastPoint.x, lastPoint.y);
    c.lineTo(this.x, this.y);
    c.lineWidth = this.radius;
    c.strokeStyle = this.color;
    c.stroke();
    c.closePath();
  }

  update() {
    const lastPoint = {
      x: this.x,
      y: this.y,
    };
    //move points over time
    this.radians += this.velocity;
    //circular movement
    this.x =
      this.lastMousePos.x + Math.cos(this.radians) * this.distanceFromCenter;
    this.y =
      this.lastMousePos.y + Math.sin(this.radians) * this.distanceFromCenter;
    //draw effect
    this.lastMousePos.x += (mouse.x - this.lastMousePos.x) * this.delay;
    this.lastMousePos.y += (mouse.y - this.lastMousePos.y) * this.delay;
    //draw points
    this.draw(lastPoint);
  }
}

function init() {
  particles = [];

  for (let i = 0; i < 120; i++) {
    particles.push(new Particle(mouse.x, mouse.y));
  }
}
init();

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(0, 0, 0, 0.1)";
  c.fillRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
  }
}
animate();
