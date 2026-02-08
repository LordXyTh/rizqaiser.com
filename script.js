// ============================================
// RIZQAISER.COM - Playful Interactions
// ============================================

// Floating icons
const icons = ['💻', '🚀', '⚡', '🎯', '☕', '🧠', '📈', '⛳', '🏢', '🌍', '✨', '🔥'];

function createFloatingIcon() {
  const container = document.getElementById('floatingIcons');
  if (!container) return;
  
  const icon = document.createElement('div');
  icon.className = 'float-icon';
  icon.textContent = icons[Math.floor(Math.random() * icons.length)];
  icon.style.left = Math.random() * 100 + 'vw';
  icon.style.animationDuration = (15 + Math.random() * 10) + 's';
  icon.style.animationDelay = Math.random() * 5 + 's';
  
  container.appendChild(icon);
  
  // Remove after animation
  setTimeout(() => icon.remove(), 25000);
}

// Spawn icons periodically
setInterval(createFloatingIcon, 2000);
for (let i = 0; i < 5; i++) {
  setTimeout(createFloatingIcon, i * 500);
}

// Scroll reveal animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const revealElements = document.querySelectorAll('.section-header, .about-grid, .stat-card, .venture-card, .work-card, .vibe-card, .contact-layout');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100);
    }
  });
}, observerOptions);

revealElements.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = `all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${(i % 4) * 0.1}s`;
  observer.observe(el);
});

// Smooth scroll for anchor links
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

// Parallax on orbs
const orbs = document.querySelectorAll('.orb');
window.addEventListener('mousemove', (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  
  orbs.forEach((orb, i) => {
    const speed = (i + 1) * 20;
    orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
  });
});

// Nav background on scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    nav.style.background = 'rgba(10, 14, 23, 0.95)';
  } else {
    nav.style.background = 'rgba(10, 14, 23, 0.8)';
  }
});

// Easter egg
console.log('%c🚀 Hey there, curious one!', 'font-size: 20px; font-weight: bold; color: #ff6b35;');
console.log('%cSource: github.com/LordXyTh/rizqaiser.com', 'font-size: 14px; color: #e8eaed;');
console.log('%cWanna chat? rizwan@autonomoustech.ca', 'font-size: 14px; color: #2ea3f2;');
