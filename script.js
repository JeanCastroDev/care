/* ── CURSOR ───────────────────────────────── */
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx=0,my=0, rx=0,ry=0;
document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
(function animCursor(){
  rx += (mx-rx)*.18; ry += (my-ry)*.18;
  dot.style.transform  = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
  ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
  requestAnimationFrame(animCursor);
})();
document.addEventListener('mouseleave',()=>{ dot.style.opacity=0; ring.style.opacity=0; });
document.addEventListener('mouseenter',()=>{ dot.style.opacity=1; ring.style.opacity=1; });

/* ── HEADER SCROLL ────────────────────────── */
const header = document.getElementById('header');
const prog   = document.getElementById('progress');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', scrollY > 60);
  const h = document.documentElement;
  prog.style.width = (scrollY / (h.scrollHeight - h.clientHeight) * 100) + '%';
}, {passive:true});

/* ── SCROLL REVEAL ────────────────────────── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('revealed'); revealObs.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ── MOBILE MENU ──────────────────────────── */
const mobileMenu = document.getElementById('mobileMenu');
const burger = document.getElementById('burgerBtn');
function toggleMobile(){
  mobileMenu.classList.toggle('open');
  const spans = burger.querySelectorAll('span');
  const open = mobileMenu.classList.contains('open');
  spans[0].style.transform = open ? 'rotate(45deg) translate(4px,4.5px)' : '';
  spans[1].style.opacity   = open ? '0' : '1';
  spans[2].style.transform = open ? 'rotate(-45deg) translate(4px,-4.5px)' : '';
}
function closeMobile(){
  mobileMenu.classList.remove('open');
  burger.querySelectorAll('span').forEach(s=>{ s.style.transform=''; s.style.opacity=''; });
}

/* ── SMOOTH ANCHOR ────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth'}); }
  });
});

/* ── FORM ─────────────────────────────────── */
const form   = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', e => {
  e.preventDefault();
  const name  = form.name.value.trim();
  const email = form.email.value.trim();
  const msg   = form.message.value.trim();
  if(!name||!email||!msg){
    formMsg.className='form-msg error';
    formMsg.textContent='Por favor, preencha todos os campos obrigatórios.';
    return;
  }
  submitBtn.disabled=true;
  submitBtn.innerHTML='<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Enviando...';
  setTimeout(() => {
    formMsg.className='form-msg success';
    formMsg.textContent='✓ Mensagem recebida. Entraremos em contato em até 24 horas úteis.';
    form.reset();
    submitBtn.disabled=false;
    submitBtn.innerHTML='<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg> Enviar Solicitação';
    setTimeout(()=>{ formMsg.className='form-msg'; }, 7000);
  }, 1000);
});

/* ── PARALLAX HERO GRID ───────────────────── */
const heroGrid = document.querySelector('.hero-grid');
window.addEventListener('scroll', () => {
  heroGrid.style.transform = `perspective(600px) rotateX(55deg) translateY(calc(20% + ${scrollY*.08}px))`;
}, {passive:true});

/* ── PHONE MASK ───────────────────────────── */
document.getElementById('fphone').addEventListener('input', function(){
  let v = this.value.replace(/\D/g,'');
  if(v.length>2) v = '('+v.slice(0,2)+') '+v.slice(2);
  if(v.length>10) v = v.slice(0,10)+'-'+v.slice(10,14);
  this.value = v;
});