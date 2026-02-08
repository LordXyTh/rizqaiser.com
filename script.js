// ============================================
// RIZQAISER.COM - Smooth Interactions
// ============================================

// Smooth image loading
document.querySelectorAll('img').forEach(img => {
  if (img.complete) {
    img.classList.add('loaded');
  } else {
    img.addEventListener('load', () => img.classList.add('loaded'));
  }
});

// Scroll-triggered animations
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const fadeUpElements = document.querySelectorAll('.section-header, .about-main, .about-images, .about-facts, .venture-card, .work-item, .interests-text, .interests-images, .contact-main, .contact-links');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

fadeUpElements.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = `opacity 0.6s ease ${i % 4 * 0.1}s, transform 0.6s ease ${i % 4 * 0.1}s`;
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

// Navbar background on scroll
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
  } else {
    nav.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

// Parallax effect on hero image
const heroImage = document.querySelector('.hero-image');
if (heroImage) {
  window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset;
    if (scroll < window.innerHeight) {
      heroImage.style.transform = `translateY(${scroll * 0.1}px)`;
    }
  });
}

// Easter egg
console.log('%c👋 Hey, curious one!', 'font-size: 20px; font-weight: bold;');
console.log('%cLooking for the source? → github.com/LordXyTh/rizqaiser.com', 'font-size: 14px;');
console.log('%cWanna chat? → rizwan@autonomoustech.ca', 'font-size: 14px; color: #C45C26;');
