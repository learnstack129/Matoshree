// 1. Mobile Menu
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-links');

menu.addEventListener('click', () => menuLinks.classList.toggle('active'));

// 2. Scroll Reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.2 });

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// 3. Three.js Interactive Particles
const canvas = document.querySelector('#three-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const mouse = new THREE.Vector2();
window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

const particlesGeometry = new THREE.BufferGeometry();
const count = 1000;
const posArray = new Float32Array(count * 3);

for(let i = 0; i < count * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.008,
    color: '#d4af37',
    transparent: true,
    opacity: 0.8
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);
camera.position.z = 3;

// Animation Loop
const animate = () => {
    particlesMesh.rotation.x += 0.0005;
    particlesMesh.rotation.y += mouse.x * 0.02; // React to mouse movement
    
    // Scroll interaction
    const scrollY = window.scrollY;
    particlesMesh.position.y = -scrollY * 0.001;

    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
};

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    let offset = window.pageYOffset;
    // Adjust the 0.5 value to change the speed of the background movement
    hero.style.backgroundPositionY = offset * 0.5 + 'px';
});
