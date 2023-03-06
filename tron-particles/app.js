const canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
const c = canvas.getContext("2d");

let particles = [];
let hue = 0;
let hueRadians = 0;
const mouse = {
  x: undefined,
  y: undefined,
};

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  particles = [];
});

addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.ttl = 500;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.ttl--;
  }
}

function generateRing() {
  setTimeout(generateRing, 200);
  hue = Math.sin(hueRadians);
  hueRadians += 0.02;

  const particleCount = 100;

  for (let i = 0; i < particleCount; i++) {
    const radian = (Math.PI * 2) / particleCount;
    const x = mouse.x;
    const y = mouse.y;
    const power = 3;

    particles.push(
      new Particle(x, y, 5, `hsl(${hue * 360}, 100%, 50%)`, {
        x: Math.cos(radian * i) * power,
        y: Math.sin(radian * i) * power,
      })
    );
  }
}
generateRing();

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(0, 0, 0, 0.1)";
  c.fillRect(0, 0, innerWidth, innerHeight);

  particles.forEach((particle, i) => {
    if (particle.ttl < 0) {
      particles.splice(i, 1);
    } else {
      particle.update();
    }
  });
}
animate();
