/* ============================================
   NICOLA PENNACCHIO — main.js
   GSAP + ScrollTrigger + Code Rain + Typewriter
   ============================================ */

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ═══════════════════════════════════════════
   1. CODE RAIN CANVAS (Matrix-style)
   ═══════════════════════════════════════════ */
const canvas = document.getElementById('code-canvas');
const ctx = canvas.getContext('2d');

const codeChars = 'const let var function return if else for while class import export async await => {} [] () WordPress PHP MySQL HTML CSS Figma Bootstrap Gutenberg Namirial 01 <> // /* */ true false null undefined void';
const chars = codeChars.split(' ');

let W, H, drops = [];
const FONT_SIZE = 13;
const COL_COUNT = () => Math.floor(W / (FONT_SIZE * 5));

function initCanvas() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
  const cols = COL_COUNT();
  drops = Array.from({ length: cols }, () => Math.random() * -50);
}

function drawRain() {
  ctx.fillStyle = 'rgba(5, 5, 8, 0.06)';
  ctx.fillRect(0, 0, W, H);

  ctx.font = `${FONT_SIZE}px JetBrains Mono, monospace`;

  const cols = COL_COUNT();
  for (let i = 0; i < cols; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    const x = i * FONT_SIZE * 5;
    const y = drops[i] * FONT_SIZE;

    // gradient: top chars brighter
    const alpha = Math.random() * 0.6 + 0.1;
    ctx.fillStyle = `rgba(124, 106, 247, ${alpha})`;
    ctx.fillText(text, x, y);

    if (y > H && Math.random() > 0.975) drops[i] = 0;
    drops[i] += 0.3;
  }
}

initCanvas();
window.addEventListener('resize', initCanvas);
setInterval(drawRain, 60);


/* ═══════════════════════════════════════════
   2. CUSTOM CURSOR
   ═══════════════════════════════════════════ */
const cursor    = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');

window.addEventListener('mousemove', (e) => {
  gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'power2.out' });
  gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.1 });
});

document.querySelectorAll('a, button, .skill-card, .timeline__content, .edu-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
});


/* ═══════════════════════════════════════════
   3. NAV scroll + active link tracking + burger
   ═══════════════════════════════════════════ */
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav__links a');
const sections = document.querySelectorAll('section[id]');
const burger = document.getElementById('nav-burger');
const mobileMenu = document.getElementById('mobile-menu');

// burger toggle
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// chiudi menu mobile al click su un link
document.querySelectorAll('.mobile-menu__link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);

  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});


/* ═══════════════════════════════════════════
   4. TYPEWRITER EFFECT
   ═══════════════════════════════════════════ */
const phrases = [
  'Software Developer @ Namirial S.p.A',
  'WordPress & Gutenberg Developer',
  'UI/UX con Figma',
  'Backend & Database MySQL',
  'Basato a Napoli, disponibile ovunque 🚀'
];

let phraseIdx = 0, charIdx = 0, isDeleting = false;
const el = document.getElementById('typewriter-text');

function typeLoop() {
  const current = phrases[phraseIdx];
  if (isDeleting) {
    el.textContent = current.substring(0, charIdx--);
    if (charIdx < 0) { isDeleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; charIdx = 0; }
    setTimeout(typeLoop, 50);
  } else {
    el.textContent = current.substring(0, charIdx++);
    if (charIdx > current.length) { isDeleting = true; setTimeout(typeLoop, 1800); return; }
    setTimeout(typeLoop, 70);
  }
}


/* ═══════════════════════════════════════════
   5. HERO ENTRANCE
   ═══════════════════════════════════════════ */
const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });

heroTl
  .to('.hero__eyebrow', { opacity: 1, y: 0, duration: 0.8, delay: 0.4 })
  .to('.hero__line', { opacity: 1, y: 0, duration: 1.1, stagger: 0.18 }, '-=0.3')
  .to('.hero__typewriter', { opacity: 1, duration: 0.6 }, '-=0.4')
  .add(() => typeLoop())
  .to('.hero__actions', { opacity: 1, duration: 0.7 }, '-=0.3')
  .to('.hero__scroll-hint', { opacity: 1, duration: 0.5 }, '-=0.2');


/* ═══════════════════════════════════════════
   6. HERO PARALLAX
   ═══════════════════════════════════════════ */
gsap.to('.hero__content', {
  y: -100,
  ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
});


/* ═══════════════════════════════════════════
   7. STAT COUNTER ANIMATION
   ═══════════════════════════════════════════ */
gsap.to('.stat-item', {
  opacity: 1,
  y: 0,
  duration: 0.7,
  stagger: 0.12,
  ease: 'power3.out',
  scrollTrigger: { trigger: '.stats', start: 'top 85%' }
});

document.querySelectorAll('.stat-num').forEach(num => {
  const target = parseInt(num.getAttribute('data-target'), 10);
  ScrollTrigger.create({
    trigger: num,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to({ val: 0 }, {
        val: target,
        duration: 1.8,
        ease: 'power2.out',
        onUpdate() { num.textContent = Math.round(this.targets()[0].val); }
      });
    }
  });
});


/* ═══════════════════════════════════════════
   8. REVEAL BLOCKS
   ═══════════════════════════════════════════ */
gsap.utils.toArray('.reveal-block').forEach(el => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
  });
});


/* ═══════════════════════════════════════════
   9. SKILL BAR ANIMATION
   ═══════════════════════════════════════════ */
document.querySelectorAll('.skill-bar__fill').forEach(bar => {
  const w = bar.getAttribute('data-width');
  ScrollTrigger.create({
    trigger: bar,
    start: 'top 88%',
    once: true,
    onEnter: () => gsap.to(bar, { width: w + '%', duration: 1.3, ease: 'power3.out', delay: 0.2 })
  });
});


/* ═══════════════════════════════════════════
   10. TIMELINE items stagger
   ═══════════════════════════════════════════ */
gsap.utils.toArray('.timeline__item').forEach((item, i) => {
  gsap.set(item, { opacity: 0, x: -40 });
  gsap.to(item, {
    opacity: 1,
    x: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: item,
      start: 'top 88%',
      toggleActions: 'play none none none'
    },
    delay: i * 0.12
  });
});


/* ═══════════════════════════════════════════
   11. SKILL CARDS stagger
   ═══════════════════════════════════════════ */
gsap.set('.skill-card', { opacity: 0, y: 50 });
gsap.to('.skill-card', {
  opacity: 1,
  y: 0,
  duration: 0.7,
  stagger: 0.08,
  ease: 'power3.out',
  scrollTrigger: { trigger: '.skills__grid', start: 'top 85%' }
});


/* ═══════════════════════════════════════════
   12. EDU CARDS stagger
   ═══════════════════════════════════════════ */
gsap.set('.edu-card', { opacity: 0, y: 40, scale: 0.97 });
gsap.to('.edu-card', {
  opacity: 1,
  y: 0,
  scale: 1,
  duration: 0.7,
  stagger: 0.1,
  ease: 'power3.out',
  scrollTrigger: { trigger: '.edu__grid', start: 'top 85%' }
});


/* ═══════════════════════════════════════════
   13. CODE BLOCK typed-in animation
   ═══════════════════════════════════════════ */
ScrollTrigger.create({
  trigger: '.code-block',
  start: 'top 80%',
  once: true,
  onEnter: () => {
    gsap.from('.code-block', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    });
    // animate each line of code
    gsap.from('.code-block__body code > *', {
      opacity: 0,
      x: -10,
      duration: 0.4,
      stagger: 0.06,
      ease: 'power2.out',
      delay: 0.3
    });
  }
});


/* ═══════════════════════════════════════════
   14. CONTACT section entrance
   ═══════════════════════════════════════════ */
gsap.from('.contact__title', {
  opacity: 0, y: 60, duration: 1, ease: 'power3.out',
  scrollTrigger: { trigger: '.contact', start: 'top 80%' }
});
gsap.from('.contact__sub', {
  opacity: 0, y: 30, duration: 0.8, delay: 0.2, ease: 'power3.out',
  scrollTrigger: { trigger: '.contact', start: 'top 80%' }
});
gsap.from('.contact__links', {
  opacity: 0, y: 20, duration: 0.7, delay: 0.4, ease: 'power2.out',
  scrollTrigger: { trigger: '.contact', start: 'top 80%' }
});


/* ═══════════════════════════════════════════
   15. SMOOTH ANCHOR SCROLL
   ═══════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    gsap.to(window, { scrollTo: { y: target, offsetY: 80 }, duration: 1.2, ease: 'power3.inOut' });
  });
});


/* ═══════════════════════════════════════════
   16. CANVAS opacity tied to scroll
       (codice svanisce via via che si scende)
   ═══════════════════════════════════════════ */
gsap.to('#code-canvas', {
  opacity: 0.01,
  ease: 'none',
  scrollTrigger: {
    trigger: 'body',
    start: 'top top',
    end: '30% top',
    scrub: true
  }
});


/* ═══════════════════════════════════════════
   17. LANGUAGE SWITCHER (about block)
   ═══════════════════════════════════════════ */
const translations = {
  it: {
    eyebrow: 'Chi sono',
    p1: 'Sono Nicola, Software & WordPress Developer con sede a Napoli. Dal 2017 lavoro su progetti web complessi: dal frontend visivo al backend robusto, dalla gestione database alla sicurezza delle reti.',
    p2: 'Attualmente in <strong>Namirial S.p.A</strong> dove sviluppo software e gestisco architetture WordPress con design system proprietari. Ogni progetto per me inizia dalla qualità del codice e finisce nell\'esperienza utente.'
  },
  en: {
    eyebrow: 'About me',
    p1: 'I\'m Nicola, a Software & WordPress Developer based in Naples. Since 2017 I\'ve been working on complex web projects: from visual frontends to robust backends, from database management to network security.',
    p2: 'Currently at <strong>Namirial S.p.A</strong>, where I develop software and manage WordPress architectures with proprietary design systems. Every project starts with code quality and ends with the user experience.'
  },
  es: {
    eyebrow: 'Sobre mí',
    p1: 'Soy Nicola, desarrollador de Software & WordPress con sede en Nápoles. Desde 2017 trabajo en proyectos web complejos: desde frontends visuales hasta backends robustos, desde la gestión de bases de datos hasta la seguridad de redes.',
    p2: 'Actualmente en <strong>Namirial S.p.A</strong>, donde desarrollo software y gestiono arquitecturas WordPress con sistemas de diseño propietarios. Cada proyecto comienza con la calidad del código y termina en la experiencia del usuario.'
  }
};

let currentLang = 'it';

document.querySelectorAll('.lang-badge[data-lang]').forEach(badge => {
  badge.addEventListener('click', () => {
    const lang = badge.getAttribute('data-lang');
    if (lang === currentLang) return;
    currentLang = lang;

    const t = translations[lang];
    const eyebrow = document.getElementById('about-eyebrow');
    const p1 = document.getElementById('about-p1');
    const p2 = document.getElementById('about-p2');

    // fade out → swap testo → fade in
    gsap.to([eyebrow, p1, p2], {
      opacity: 0, y: -8, duration: 0.25, ease: 'power2.in',
      onComplete: () => {
        eyebrow.textContent = t.eyebrow;
        p1.textContent      = t.p1;
        p2.innerHTML        = t.p2;
        gsap.to([eyebrow, p1, p2], { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', stagger: 0.06 });
      }
    });

    // aggiorna badge attivo
    document.querySelectorAll('.lang-badge[data-lang]').forEach(b => b.classList.remove('active'));
    badge.classList.add('active');
  });
});

// segna italiano come attivo di default
document.querySelector('.lang-badge[data-lang="it"]').classList.add('active');
