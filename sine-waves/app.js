const canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
const c = canvas.getContext("2d");
const gui = new dat.GUI();

const wave = {
  y: innerHeight / 2,
  length: 0.01,
  amplitude: 100,
  frequency: 0.2,
};

const strokeColor = {
  h: 360,
  s: 50,
  l: 50,
};

const backgroundColor = {
  r: 0,
  g: 0,
  b: 0,
  a: 0.01,
};

const waveFolder = gui.addFolder("wave");
waveFolder.add(wave, "y", 0, innerHeight);
waveFolder.add(wave, "length", -0.01, 0.01);
waveFolder.add(wave, "amplitude", -300, 300);
waveFolder.add(wave, "frequency", 0.01, 1);
waveFolder.open();

const strokeFolder = gui.addFolder("stroke");
strokeFolder.add(strokeColor, "h", 0, 360);
strokeFolder.add(strokeColor, "s", 0, 100);
strokeFolder.add(strokeColor, "l", 0, 100);
strokeFolder.open();

const backgroundFolder = gui.addFolder("background");
backgroundFolder.add(backgroundColor, "r", 0, 255);
backgroundFolder.add(backgroundColor, "g", 0, 255);
backgroundFolder.add(backgroundColor, "b", 0, 255);
backgroundFolder.add(backgroundColor, "a", 0, 1);
backgroundFolder.open();

let increment = wave.frequency;

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`;
  c.fillRect(0, 0, innerWidth, innerHeight);

  c.beginPath();
  c.moveTo(-2, innerHeight / 2);
  for (let i = -2; i < innerWidth; i++) {
    c.lineTo(
      i,
      wave.y +
        Math.sin(i * wave.length + increment) *
          wave.amplitude *
          Math.sin(increment)
    );
  }
  c.strokeStyle = `hsl(${Math.abs(strokeColor.h * Math.sin(increment))}, ${strokeColor.s}%, ${strokeColor.l}%)`;
  c.stroke();
  c.closePath();

  increment += wave.frequency;
}
animate();
