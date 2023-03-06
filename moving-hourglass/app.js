const canvas = document.querySelector('canvas')
canvas.width = innerWidth
canvas.height = innerHeight
const c = canvas.getContext('2d')

let particles;
let angle = 0;
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2,
}
const center = {
    x: innerWidth / 2,
    y: innerHeight / 2,
}

addEventListener('mousemove', (e) => {
    gsap.to(mouse, {
      x: e.clientX - innerWidth / 2,
      y: e.clientY - innerHeight / 2,
      duration : 2
    });

    angle = Math.atan2(mouse.y, mouse.x)
})

class Particle {
    constructor(x, y, radius, color, distFromCenter) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.distFromCenter = distFromCenter
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }

    update(timer) {
        this.draw()

        const {cos, sin} = Math
        const {distFromCenter} = this

        this.x = center.x + distFromCenter * cos(angle) * cos(timer + distFromCenter) * sin(timer + distFromCenter)
        this.y = center.y + distFromCenter * sin(angle) * sin(timer + distFromCenter)
    }
}

function init() {
    particles = []

    const baseRadius = 3
    const particleCount = 360
    const hueIncrement = 360 / particleCount;
    const radiusIncrement = baseRadius / particleCount

    for (let i = 0; i < particleCount; i++) {
        const x = innerWidth / 2 + i * Math.cos(1)
        const y = innerHeight / 2 + i * Math.cos(1)
        
        particles.push(new Particle(x, y, radiusIncrement * i, `hsl(${hueIncrement * i}, 75%, 50%)`, i))
    }
}
init()

let timer = 0;
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'rgba(0, 0, 0, 0.05)'
    c.fillRect(0, 0, innerWidth, innerHeight)

    particles.forEach(particle => {
        particle.update(timer)
    })

    timer += 0.001
}
animate()
