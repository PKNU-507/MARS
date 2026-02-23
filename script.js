// Navigation Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Page Navigation Logic (SPA Tab Style)
const navItems = document.querySelectorAll('.nav-links li a');
const pageSections = document.querySelectorAll('.page-section');

function navigateToSection(targetId) {
    if (targetId === '#contact') return; // Let default scroll handle contact

    const targetSection = document.querySelector(targetId);
    if (!targetSection || !targetSection.classList.contains('page-section')) return;

    // Update nav links active state
    navItems.forEach(nav => {
        nav.classList.remove('active');
        if (nav.getAttribute('href') === targetId) {
            nav.classList.add('active');
        }
    });

    // Hide all, show target
    pageSections.forEach(section => {
        section.classList.add('hidden-page');
    });
    targetSection.classList.remove('hidden-page');

    // Scroll to top
    window.scrollTo(0, 0);

    // Close mobile menu if open
    if (document.querySelector('.nav-links').classList.contains('active')) {
        document.querySelector('.nav-links').classList.remove('active');
    }
}

// Intercept all internal links wrapper
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId !== '#contact' && document.querySelector(targetId)?.classList.contains('page-section')) {
            e.preventDefault();
            navigateToSection(targetId);
        }
    });
});

// Publication Tabs
function openTab(evt, tabName) {
    let i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Interactive Particle Background (Network/Multi-Agent Theme)
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particlesArray;

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

// Particle Class
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    // Method to draw particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    // Check particle position, move particle, draw particle
    update() {
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

// Create particle array
function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 12000;

    // Scale particles based on screen size, limit maximum
    if (numberOfParticles > 150) numberOfParticles = 150;

    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);

        let directionX = (Math.random() * 1.5) - 0.75;
        let directionY = (Math.random() * 1.5) - 0.75;

        // Mars red/orange colors
        let color = Math.random() > 0.5 ? 'rgba(255, 69, 0, 0.4)' : 'rgba(255, 140, 0, 0.3)';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// Connect particles (simulating network control / multi-agent communication)
function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if (distance < (canvas.width / 8) * (canvas.height / 8)) {
                opacityValue = 1 - (distance / 20000);
                // Draw connecting line
                ctx.strokeStyle = `rgba(255, 69, 0, ${opacityValue * 0.2})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

// Initialize and start animation
init();
animate();
