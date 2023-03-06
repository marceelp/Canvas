const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");

const click = document.querySelector('#click')
let circles = [];
let mouse = {
  x: undefined,
  y: undefined,
};

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});

addEventListener("click", function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;

  init();
});

class Circle {
  constructor() {
    this.radius = randomIntFromRange(10, 30);
    this.x = mouse.x;
    this.y = randomIntFromRange(mouse.y, mouse.y * 2);
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    this.dx = randomIntFromRange(-3, 3);
    this.dy = 5;
    this.friction = 0.95;
    this.gravity = 1;
    this.alpha = 1;
  }

  draw() {
    c.save()
    c.globalAlpha = this.alpha
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
    c.restore()
  }

  update() {
    this.draw();
    this.x += this.dx;
    this.y += this.dy;
    if (this.y + this.radius + this.dy > innerHeight) {
      this.dy = -this.dy * this.friction;
    } else {
      this.dy += this.gravity;
    }
    if (
      this.x + this.radius + this.dx > innerWidth ||
      this.x - this.radius < 0
    ) {
      this.dx = -this.dx;
    }
    this.alpha -= 0.01
    if (this.alpha < 0.1) {
      circles.splice(this, 1)
    }
  }
}

function manageCircles() {
  for (let i = 0; i < circles.length; i++) {
    circles[i].draw();
    circles[i].update();
  }
}

function init() {
  for (let i = 0; i < 5; i++) {
    circles.push(new Circle());
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(0, 0, 0, 0.3)";
  c.fillRect(0, 0, innerWidth, innerHeight);
  manageCircles();

  if (circles.length > 1) click.style.display = 'none';
}
animate();
