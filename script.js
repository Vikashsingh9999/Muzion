// ===== Mizuion Scripts =====

// ===== Navbar scroll =====
const navbar = document.getElementById('navbar');
const backTop = document.getElementById('back-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) backTop.classList.add('show'); else backTop.classList.remove('show');
});
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== Mobile menu =====
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
menuToggle.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// ===== Reveal on scroll =====
const revealEls = document.querySelectorAll('.fade-up');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObs.observe(el));
// Safety fallback: ensure everything becomes visible after 2.5s no matter what
setTimeout(() => { document.querySelectorAll('.fade-up:not(.visible)').forEach(el => el.classList.add('visible')); }, 2500);

// ===== Counters =====
const counters = document.querySelectorAll('.counter');
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = parseFloat(el.dataset.target);
      const decimals = parseInt(el.dataset.decimals || '0');
      const duration = 1800;
      const start = performance.now();
      const from = 0;
      function tick(now) {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const val = from + (target - from) * eased;
        el.textContent = val.toFixed(decimals);
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = target.toFixed(decimals);
      }
      requestAnimationFrame(tick);
      counterObs.unobserve(el);
    }
  });
}, { threshold: 0.4 });
counters.forEach(c => counterObs.observe(c));

// ===== Bubbles =====
function spawnBubbles(containerId, count) {
  const c = document.getElementById(containerId);
  if (!c) return;
  for (let i = 0; i < count; i++) {
    const b = document.createElement('span');
    const size = Math.random() * 50 + 14;
    b.className = 'bubble';
    b.style.width = size + 'px';
    b.style.height = size + 'px';
    b.style.left = (Math.random() * 100) + '%';
    b.style.animationDuration = (Math.random() * 12 + 10) + 's';
    b.style.animationDelay = (Math.random() * 8) + 's';
    b.style.opacity = (Math.random() * 0.5 + 0.3).toString();
    c.appendChild(b);
  }
}
spawnBubbles('hero-bubbles', 14);
spawnBubbles('footer-bubbles', 10);

// ===== Modal =====
const modal = document.getElementById('modal');
document.getElementById('open-modal').addEventListener('click', () => { modal.classList.remove('hidden'); modal.classList.add('flex'); });
document.getElementById('close-modal').addEventListener('click', () => { modal.classList.add('hidden'); modal.classList.remove('flex'); });
modal.addEventListener('click', (e) => { if (e.target === modal) { modal.classList.add('hidden'); modal.classList.remove('flex'); } });

// ===== Active nav highlight =====
const sections = ['home','technology','quality','mission','contact'].map(id => document.getElementById(id));
const navLinks = document.querySelectorAll('nav .nav-link');
window.addEventListener('scroll', () => {
  const y = window.scrollY + 120;
  let current = 'home';
  sections.forEach(s => { if (s && s.offsetTop <= y) current = s.id; });
  navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
});

// ===== Contact form mock =====
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thank you for your submission! This is a mock form, no data was sent.');
  e.target.reset();
});

// ===== Fix: Make hero section visible immediately =====
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.fade-up').forEach(el => {
    if (el.closest('#home')) el.classList.add('visible');
  });
});