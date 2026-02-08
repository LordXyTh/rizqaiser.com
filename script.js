// ============================================
// RIZQAISER.COM - Tron Grid Background + Animations
// ============================================

// Three.js Tron Grid Background
(function initTronBackground() {
  const canvas = document.getElementById('tron-bg');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  // Grid
  const gridSize = 100;
  const gridDivisions = 50;
  const gridColor = 0x00f0ff;
  
  const grid = new THREE.GridHelper(gridSize, gridDivisions, gridColor, gridColor);
  grid.material.opacity = 0.15;
  grid.material.transparent = true;
  grid.position.y = -5;
  scene.add(grid);
  
  // Second grid for depth
  const grid2 = new THREE.GridHelper(gridSize, gridDivisions, gridColor, gridColor);
  grid2.material.opacity = 0.08;
  grid2.material.transparent = true;
  grid2.position.y = -10;
  scene.add(grid2);
  
  // Particles
  const particleCount = 500;
  const particlesGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const velocities = [];
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    velocities.push({
      x: (Math.random() - 0.5) * 0.02,
      y: (Math.random() - 0.5) * 0.01,
      z: (Math.random() - 0.5) * 0.02
    });
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
  const particlesMaterial = new THREE.PointsMaterial({
    color: 0x00f0ff,
    size: 0.5,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });
  
  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);
  
  // Glowing lines (data streams)
  const lineCount = 20;
  const lines = [];
  
  for (let i = 0; i < lineCount; i++) {
    const points = [];
    const startX = (Math.random() - 0.5) * 100;
    const startZ = (Math.random() - 0.5) * 100;
    
    for (let j = 0; j < 10; j++) {
      points.push(new THREE.Vector3(
        startX,
        j * 3 - 15,
        startZ
      ));
    }
    
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: Math.random() > 0.5 ? 0x00f0ff : 0xff00ff,
      transparent: true,
      opacity: 0.3
    });
    
    const line = new THREE.Line(geometry, material);
    line.userData = {
      speed: Math.random() * 0.5 + 0.1,
      offset: Math.random() * Math.PI * 2
    };
    lines.push(line);
    scene.add(line);
  }
  
  camera.position.set(0, 5, 30);
  camera.lookAt(0, 0, 0);
  
  // Mouse movement
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = (e.clientY / window.innerHeight) * 2 - 1;
  });
  
  // Animation
  let time = 0;
  
  function animate() {
    requestAnimationFrame(animate);
    time += 0.01;
    
    // Smooth camera movement
    targetX += (mouseX * 5 - targetX) * 0.02;
    targetY += (mouseY * 3 - targetY) * 0.02;
    camera.position.x = targetX;
    camera.position.y = 5 + targetY;
    camera.lookAt(0, 0, 0);
    
    // Grid animation
    grid.position.z = (time * 2) % 2;
    grid2.position.z = (time * 2 + 1) % 2;
    
    // Particle animation
    const positions = particles.geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] += velocities[i].x;
      positions[i * 3 + 1] += velocities[i].y;
      positions[i * 3 + 2] += velocities[i].z;
      
      // Wrap around
      if (Math.abs(positions[i * 3]) > 50) velocities[i].x *= -1;
      if (Math.abs(positions[i * 3 + 1]) > 25) velocities[i].y *= -1;
      if (Math.abs(positions[i * 3 + 2]) > 50) velocities[i].z *= -1;
    }
    particles.geometry.attributes.position.needsUpdate = true;
    
    // Line pulse animation
    lines.forEach((line, i) => {
      const pulse = Math.sin(time * line.userData.speed + line.userData.offset) * 0.5 + 0.5;
      line.material.opacity = 0.1 + pulse * 0.4;
    });
    
    renderer.render(scene, camera);
  }
  
  animate();
  
  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();

// Tagline Rotation
(function initTaglineRotation() {
  const taglines = document.querySelectorAll('.tagline');
  let currentIndex = 0;
  
  function rotateTagline() {
    taglines[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % taglines.length;
    taglines[currentIndex].classList.add('active');
  }
  
  setInterval(rotateTagline, 3000);
})();

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Intersection Observer for scroll animations
(function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, observerOptions);
  
  // Add animation classes
  document.querySelectorAll('.section-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  // When in view
  const style = document.createElement('style');
  style.textContent = `
    .section-content.in-view {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
})();

// Easter egg: Konami code
(function initKonamiCode() {
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;
  
  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        activatePartyMode();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });
  
  function activatePartyMode() {
    document.body.style.animation = 'party 0.5s infinite';
    const style = document.createElement('style');
    style.textContent = `
      @keyframes party {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
      document.body.style.animation = '';
    }, 5000);
  }
})();

// Console easter egg
console.log('%c👋 Hey there, curious one!', 'font-size: 20px; font-weight: bold; color: #00f0ff;');
console.log('%cLooking for the code? Check out: https://github.com/LordXyTh/rizqaiser.com', 'font-size: 14px; color: #ffffff;');
console.log('%cWanna work together? Drop me a line: rizwan@autonomoustech.ca', 'font-size: 14px; color: #ff00ff;');
