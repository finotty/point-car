'use strict';

document.documentElement.classList.remove('no-js');

/* ---------- WhatsApp ---------- */
const PHONE = '5521970337668';
const whatsappUrl = (text) => `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;

document.querySelectorAll('[data-wa]').forEach((link) => {
  link.href = whatsappUrl(link.dataset.wa);
});

/* ---------- Ano no rodapé ---------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Header: fundo ao rolar ---------- */
const header = document.querySelector('.site-header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* ---------- Menu mobile ---------- */
const toggle = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');
const backdrop = document.getElementById('nav-backdrop');

const setMenu = (open) => {
  document.body.classList.toggle('menu-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  document.body.style.overflow = open ? 'hidden' : '';
};

toggle.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
if (backdrop) backdrop.addEventListener('click', () => setMenu(false));
nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
window.addEventListener('resize', () => { if (window.innerWidth > 900) setMenu(false); });

/* ---------- Link ativo no menu ---------- */
const navLinks = [...nav.querySelectorAll('a[href^="#"]')];
const sections = navLinks.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => spy.observe(s));

  /* ---------- Animações ao rolar ---------- */
  const revealer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach((el) => revealer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
}

/* ---------- Galeria / lightbox ---------- */
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
const lbCap = document.getElementById('lightbox-cap');
const lbClose = document.getElementById('lightbox-close');
let lastFocus = null;

const closeLightbox = () => {
  lightbox.hidden = true;
  document.body.style.overflow = '';
  if (lastFocus) lastFocus.focus();
};
document.querySelectorAll('.gallery-item').forEach((item) => {
  item.addEventListener('click', () => {
    lastFocus = item;
    lbImg.src = item.dataset.full;
    lbImg.alt = item.dataset.caption || '';
    lbCap.textContent = item.dataset.caption || '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  });
});
lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !lightbox.hidden) closeLightbox(); });

/* ---------- Formulário de orçamento ---------- */
const form = document.getElementById('booking-form');
const nameInput = document.getElementById('name');
const dateInput = document.getElementById('date');
const status = document.getElementById('form-status');

const now = new Date();
const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
dateInput.min = today;

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();

  if (!name) {
    nameInput.classList.add('invalid');
    nameInput.setCustomValidity('Informe seu nome.');
    nameInput.reportValidity();
    nameInput.focus();
    return;
  }

  const date = String(data.get('date') || '');
  if (date && date < today) {
    dateInput.setCustomValidity('Escolha hoje ou uma data futura.');
    dateInput.reportValidity();
    return;
  }

  const vehicle = String(data.get('vehicle') || '').trim();
  const note = String(data.get('message') || '').trim();
  const parts = [
    `Olá! Meu nome é ${name}.`,
    `Gostaria de um orçamento para: ${data.get('service')}.`,
  ];
  if (vehicle) parts.push(`Veículo: ${vehicle}.`);
  if (date) parts.push(`Data desejada: ${date.split('-').reverse().join('/')}.`);
  if (note) parts.push(`Detalhes: ${note}`);
  parts.push('Posso enviar fotos do carro para avaliação?');

  const url = whatsappUrl(parts.join('\n'));
  window.open(url, '_blank', 'noopener,noreferrer');

  status.replaceChildren();
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = 'Clique aqui se o WhatsApp não abrir.';
  status.append(link);
});

nameInput.addEventListener('input', () => { nameInput.setCustomValidity(''); nameInput.classList.remove('invalid'); });
dateInput.addEventListener('input', () => dateInput.setCustomValidity(''));
