const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.querySelector('.mainbackground').appendChild(canvas);

canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '1'; /* Behind content but visible on background */
canvas.style.pointerEvents = 'none';

let particles = [];
const particleCount = 60;
const connectionDistance = 150;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;

        // Tech colors: Cyan, Purple, Green
        const colors = ['#08f8acff', '#5500ffff', '#00ffc3ff'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.size = Math.random() * 2 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function init() {
    resize();
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Trail effect
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Clear screen with slight transparency for fade

    // Or just clear completely for sharp lines:
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, index) => {
        p.update();
        p.draw();

        // Connect particles
        for (let j = index + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectionDistance) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(100, 255, 255, ${1 - dist / connectionDistance})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    });

    requestAnimationFrame(animate);
}

window.addEventListener('resize', init);
init();
animate();

var page1content = document.querySelector("#sectionone")
var cursor = document.querySelector("#cursor")

page1content.addEventListener("mousemove", function (dets) {
    cursor.style.left = dets.x + "px"
    cursor.style.top = dets.y + "px"
})

page1content.addEventListener("mouseleave", function () {
    cursor.style.left = "-100px"
    cursor.style.top = "-100px"
})


