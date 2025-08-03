const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let width, height;
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const petals = [];
const petalCount = 100;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

class Petal {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(0, width);
    this.y = random(-height, 0);
    this.size = random(5, 15);
    this.speed = random(1, 3);
    this.angle = random(0, 2 * Math.PI);
    this.swing = random(0.5, 1.5);
    this.color = `rgba(255, ${Math.floor(random(100, 200))}, ${Math.floor(random(150, 255))}, 0.8)`;
  }

  update() {
    this.y += this.speed;
    this.x += Math.sin(this.angle) * this.swing;
    this.angle += 0.01;
    if (this.y > height) this.reset();
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

for (let i = 0; i < petalCount; i++) {
  petals.push(new Petal());
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  for (let petal of petals) {
    petal.update();
    petal.draw();
  }
  requestAnimationFrame(animate);
}
animate();
