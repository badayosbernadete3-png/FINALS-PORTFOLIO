(function spawnParticles() {
  const section = document.getElementById('home');
  for (let i = 0; i < 22; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      bottom: ${Math.random() * 25}%;
      animation-delay: ${Math.random() * 6}s;
      animation-duration: ${5 + Math.random() * 5}s;
      width: ${1 + Math.random() * 3}px;
      height: ${1 + Math.random() * 3}px;
      opacity: 0;
    `;
    section.appendChild(p);
  }
})();


const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const menuToggle = document.getElementById('menuToggle');
const navLinks   = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    navLinks.classList.remove('active');
  });
});

const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active && !active.classList.contains('nav-btn')) {
        active.style.color = 'var(--gold)';
      }
    }
  });
}, { threshold: 0.45 });

sections.forEach(s => sectionObserver.observe(s));

function handleSubmit(e) {
  e.preventDefault();
  const btn     = e.target.querySelector('.btn-submit');
  const success = document.getElementById('formSuccess');

  btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending…';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.disabled = false;
    success.style.display = 'block';
    e.target.reset();

    setTimeout(() => { success.style.display = 'none'; }, 5000);
  }, 1600);
}