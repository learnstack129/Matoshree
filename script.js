// 1. Mobile Menu Logic
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-links');

menu.addEventListener('click', () => {
    menuLinks.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => menuLinks.classList.remove('active'));
});

// 2. Scroll-based Animations (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.25 });

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// 3. Three.js 3D Particles Background
const canvas = document.querySelector('#three-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Create Particles (Gold Glitter Effect)
const particlesGeometry = new THREE.BufferGeometry();
const count = 800;
const posArray = new Float32Array(count * 3);

for(let i = 0; i < count * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.007,
    color: '#d4af37', // Gold matching the photo theme
    transparent: true,
    opacity: 0.8
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 3;

// 4. Scroll Interaction for 3D Scene
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Rotate and shift particles as user scrolls
    particlesMesh.rotation.y = scrollY * 0.0008;
    particlesMesh.position.y = -scrollY * 0.0015;
});

// Animation Loop
const animate = () => {
    particlesMesh.rotation.x += 0.0005;
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
};

animate();

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
