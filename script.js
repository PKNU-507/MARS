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

    // Toggle global recruitment banner visibility
    const globalBanner = document.getElementById('global-recruitment-banner');
    if (globalBanner) {
        if (targetId === '#home') {
            globalBanner.style.display = 'none';
        } else {
            globalBanner.style.display = 'block';
        }
    }

    // Scroll to section with padding offset
    if (targetId === '#home') {
        window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
        // Find the top position of the section-container within the target section
        const container = targetSection.querySelector('.section-container');
        if (container) {
            // Calculate absolute Y position, subtract 80px for the navbar height
            const y = container.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top: y, behavior: 'instant' });
        } else {
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
    }

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

// Get theme colors from CSS dynamically
const rootStyles = getComputedStyle(document.documentElement);
function getThemeColor(varName, fallback) {
    const val = rootStyles.getPropertyValue(varName).trim();
    return val ? val : fallback;
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

    // Scale particles based on screen size, limit maximum strictly for performance
    if (numberOfParticles > 90) numberOfParticles = 90;

    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);

        let directionX = (Math.random() * 1.5) - 0.75;
        let directionY = (Math.random() * 1.5) - 0.75;

        // Mars red/orange colors
        let pr = getThemeColor('--theme-primary-r', '255');
        let pg = getThemeColor('--theme-primary-g', '59');
        let pb = getThemeColor('--theme-primary-b', '0');
        let sr = getThemeColor('--theme-secondary-r', '255');
        let sg = getThemeColor('--theme-secondary-g', '140');
        let sb = getThemeColor('--theme-secondary-b', '0');

        let color = Math.random() > 0.5 ? 'rgba(' + pr + ', ' + pg + ', ' + pb + ', 0.4)' : 'rgba(' + sr + ', ' + sg + ', ' + sb + ', 0.3)';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// Connect particles (simulating network control / multi-agent communication)
function connect() {
    let opacityValue = 1;
    ctx.lineWidth = 1.2; // Slightly thicker for better visibility

    // Optimization: Pre-calculate threshold to avoid calculating inside the nested loop
    const maxDistance = (canvas.width / 10) * (canvas.height / 10);
    const divisor = 20000; // Increased to make connections form slightly earlier/smoother

    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) {
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            let distance = (dx * dx) + (dy * dy);

            if (distance < maxDistance) {
                opacityValue = 1 - (distance / divisor);
                // Draw connecting line (Increased opacity multiplier from 0.2 to 0.55 for better emphasis)
                let pr = getThemeColor('--theme-primary-r', '255');
                let pg = getThemeColor('--theme-primary-g', '59');
                let pb = getThemeColor('--theme-primary-b', '0');
                ctx.strokeStyle = 'rgba(' + pr + ', ' + pg + ', ' + pb + ', ' + (opacityValue * 0.55) + ')';
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Animation loop
let animationFrameId;

function animate() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
    animationFrameId = requestAnimationFrame(animate);
}

// Initialize and start animation
init();
animate();

// --- Performance Optimization: Lazy Video Playing ---
// Use Intersection Observer to only play videos when they are visible on screen
document.addEventListener("DOMContentLoaded", function () {
    const videos = document.querySelectorAll("video.content-media");

    // Check if browser supports IntersectionObserver
    if ("IntersectionObserver" in window) {
        const videoObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                const video = entry.target;
                if (entry.isIntersecting) {
                    // Video is in viewport, play it
                    video.play().catch(e => console.log("Auto-play prevented", e));
                } else {
                    // Video is out of viewport, pause it to save CPU/GPU
                    video.pause();
                }
            });
        }, {
            // Start playing slightly before it comes fully into view
            rootMargin: "0px 0px 50px 0px",
            threshold: 0.1
        });

        videos.forEach(video => {
            // First stop autoplay behavior if it's already started
            video.pause();
            // Start observing
            videoObserver.observe(video);
        });
    }
});

// --- Research Details Expandable Row (Accordion) ---
function toggleDetails(wrapperId) {
    const wrapper = document.getElementById(wrapperId);
    if (!wrapper) return;

    const details = wrapper.querySelector('.bento-details');
    const item = wrapper.querySelector('.bento-item');
    const actionText = wrapper.querySelector('.action-text');
    const isExpanded = wrapper.classList.contains('expanded');

    // Close all other expanded wrappers first (Optional: distinct accordion behavior)
    document.querySelectorAll('.bento-wrapper.expanded').forEach(w => {
        if (w.id !== wrapperId) {
            w.classList.remove('expanded');
            w.querySelector('.bento-item').classList.remove('expanded');
            w.querySelector('.bento-details').style.maxHeight = null;
            w.querySelector('.action-text').textContent = 'View Details';
            // Pause videos when collapsing
            w.querySelectorAll('video').forEach(v => v.pause());
        }
    });

    // Toggle current wrapper
    if (isExpanded) {
        // Collapse
        wrapper.classList.remove('expanded');
        item.classList.remove('expanded');
        details.style.maxHeight = null;
        actionText.textContent = 'View Details';
        // Pause videos
        details.querySelectorAll('video').forEach(v => v.pause());
    } else {
        // Expand
        wrapper.classList.add('expanded');
        item.classList.add('expanded');
        // Let the browser calculate the auto height then set it explicitly for CSS transition
        details.style.maxHeight = details.scrollHeight + "px";
        actionText.textContent = 'Close Details';

        // Play visible videos
        details.querySelectorAll('video').forEach(v => {
            // we rely on the IntersectionObserver to play them if in viewport, 
            // but just in case, we can trigger weak load
            if (v.paused) {
                // optional: v.play().catch(e => console.log(e));
            }
        });

        // Small timeout to adjust scroll to make the top of the expanded item visible smoothly
        setTimeout(() => {
            const y = wrapper.getBoundingClientRect().top + window.scrollY - 100; // offset for navbar
            window.scrollTo({ top: y, behavior: 'smooth' });
            // Update max-height inside timeout just in case layout shifted from smooth scroll
            details.style.maxHeight = details.scrollHeight + "px";
        }, 50);
    }
}

// Window resize observer to recalculate expanding heights inside bento-details
window.addEventListener('resize', () => {
    document.querySelectorAll('.bento-wrapper.expanded .bento-details').forEach(details => {
        // Reset and recalculate to fit new window dimensions
        details.style.maxHeight = 'none';
        let newHeight = details.scrollHeight;
        details.style.maxHeight = newHeight + "px";
    });
});

