const canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
const c = canvas.getContext("2d");

let particles;
const mouse = {
  x: undefined,
  y: undefined,
};

function randomIntFromRange(min, max) {
  return Math.random() * (max - min + 1) + min;
}

class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.friction = 0.95;
    this.gravity = 0.05;
    this.alpha = 1;
  }

  draw() {
    c.save();
    c.globalAlpha = this.alpha;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
    c.restore();
  }

  update() {
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
    this.velocity.y += this.gravity;

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.draw();
    this.alpha -= 0.01;
  }
}

function init() {
  particles = [];
}
init();

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(0, 0, 0, 0.1)";
  c.fillRect(0, 0, innerWidth, innerHeight);

  particles.forEach((particle, i) => {
    if (particle.alpha > 0) {
      particle.update();
    } else {
      particles.splice(i, 1);
    }
  });
}
animate();

addEventListener("click", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  const particleCount = 800;
  const angleIncrement = (Math.PI * 2) / particleCount;
  const power = 25;

  for (let i = 0; i < particleCount; i++) {
    const x = mouse.x;
    const y = mouse.y;
    const radius = randomIntFromRange(1, 4);
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    const velocity = {
      x: Math.random() * Math.cos(angleIncrement * i) * power,
      y: Math.random() * Math.sin(angleIncrement * i) * power,
    };

    particles.push(new Particle(x, y, radius, color, velocity));
  }
});
