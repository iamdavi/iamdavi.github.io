/* ═══════════════════════════════════════════════════════════════
   PETIT CAPRICE — main.js
   Vanilla JS: menú móvil, scroll, animaciones, nav activo
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initLucide();
  initMobileMenu();
  initSmoothScroll();
  initScrollAnimations();
  initActiveNav();
  initHeaderScroll();
});

/* ─── Inicializar Lucide ─── */
function initLucide() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

/* ─── Menú hamburger (móvil) ─── */
function initMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen.toString());

    // Cambiar icono
    const icon = toggle.querySelector('i[data-lucide]');
    if (icon) {
      icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }
  });

  // Cerrar al hacer clic en un link del menú
  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      const icon = toggle.querySelector('i[data-lucide]');
      if (icon) {
        icon.setAttribute('data-lucide', 'menu');
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }
    });
  });

  // Cerrar al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ─── Scroll suave a anclas ─── */
function initSmoothScroll() {
  const headerHeight = document.getElementById('header')?.offsetHeight || 64;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ─── Animaciones al hacer scroll (fade-in) ─── */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');

  if (!elements.length) return;

  // Si el navegador no soporta IntersectionObserver, mostrar todo
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Retraso escalonado para elementos en el mismo contenedor
          const siblings = Array.from(entry.target.parentElement?.querySelectorAll('.fade-in') || []);
          const delay = siblings.indexOf(entry.target) * 80;

          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  elements.forEach(el => observer.observe(el));
}

/* ─── Nav link activo según sección visible ─── */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle(
              'is-active',
              link.getAttribute('href') === `#${id}`
            );
          });
        }
      });
    },
    {
      threshold: 0.4,
      rootMargin: '-80px 0px -40% 0px',
    }
  );

  sections.forEach(section => observer.observe(section));
}

/* ─── Sombra en header al hacer scroll ─── */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  const updateHeader = () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 2px 20px rgba(44, 27, 30, 0.12)'
      : '0 2px 20px rgba(44, 27, 30, 0.04)';
  };

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
}
