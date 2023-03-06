let canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let c = canvas.getContext('2d')

//2.
var mouse = {
    x: undefined,
    y: undefined
}

//5.
var maxRadius = 35

//6.
var colorArray = ["#FF5F5D", "#3F7C85", "#00CCBF", "#72F2EB", "#747E7E"];

//1.
window.addEventListener('mousemove', function(event) {
    mouse.x = event.x
    mouse.y = event.y
})

//9.make the canvas responsible (every time it's resized, the width is the innerWidth etc)
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
})

function Circle(x, y, dx, dy, radius) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    //8.
    this.minRadius = radius
    //7.
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color
      c.fill();
    };

    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        //3.interactivity
        if (mouse.x - this.x < 100 && mouse.x - this.x > -100 && mouse.y - this.y < 100 && mouse.y - this.y > -100) {
            //4.
            if (this.radius < maxRadius) {
                this.radius += 1
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1
        }

        this.draw()
    }
}

var circleArray = [];

//10
function init() {

    circleArray = [];

    for (var i = 0; i < 1000; i++) {
      var radius = Math.random() * 2 + 1;
      var x = Math.random() * (innerWidth - radius * 2) + radius;
      var y = Math.random() * (innerHeight - radius * 2) + radius;
      var dx = (Math.random() - 0.5) * 1;
      var dy = (Math.random() - 0.5) * 1;

      circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}
init()

function moveCircle() {
    requestAnimationFrame(moveCircle)
    c.clearRect(0, 0, innerWidth, innerHeight)

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update()
    }
}
moveCircle()
