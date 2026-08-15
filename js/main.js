/* ============================================================
   DAAT SERVICES — Main JavaScript
   Navigation, Scroll Effects, Cursor Glow, Toast, FAQ
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollReveal();
  initCursorGlow();
  initProgressBar();
  initFAQ();
  initToast();
  initCounters();
  setActivePage();
});

/* ─── Navigation ─────────────────────────────────────────── */
function initNav() {
  const nav = document.getElementById('main-nav');
  const toggle = document.getElementById('nav-toggle');
  const drawer = document.getElementById('nav-drawer');
  if (!nav) return;

  // Scroll effect
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile toggle
  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      const open = toggle.classList.toggle('open');
      drawer.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close drawer on link click
    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        drawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

/* ─── Set Active Nav Link ───────────────────────────────── */
function setActivePage() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .nav-drawer-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (
      href === page ||
      (page === 'index.html' && (href === '/' || href === '' || href === 'index.html')) ||
      (page === '' && href === 'index.html')
    ) {
      link.classList.add('active');
    }
  });
}

/* ─── Scroll Reveal ─────────────────────────────────────── */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
}

/* ─── Cursor Glow ──────────────────────────────────────── */
function initCursorGlow() {
  if (window.matchMedia('(hover: none)').matches) return;
  const glow = document.querySelector('.cursor-glow');
  if (!glow) return;

  let x = 0, y = 0;
  let ax = 0, ay = 0;
  let raf;

  document.addEventListener('mousemove', e => { x = e.clientX; y = e.clientY; });

  function animate() {
    ax += (x - ax) * 0.1;
    ay += (y - ay) * 0.1;
    glow.style.left = ax + 'px';
    glow.style.top = ay + 'px';
    raf = requestAnimationFrame(animate);
  }
  animate();

  document.addEventListener('mouseleave', () => glow.style.opacity = '0');
  document.addEventListener('mouseenter', () => glow.style.opacity = '1');
}

/* ─── Scroll Progress Bar ────────────────────────────────── */
function initProgressBar() {
  const bar = document.querySelector('.progress-bar');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const pct = scrollTop / (scrollHeight - clientHeight);
    bar.style.transform = `scaleX(${pct})`;
  }, { passive: true });
}

/* ─── FAQ Accordion ─────────────────────────────────────── */
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      // Toggle current
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* ─── Toast ─────────────────────────────────────────────── */
function initToast() {
  window.showToast = function(msg, icon = '✓', duration = 4000) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${msg}</span>`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), duration);
  };
}

/* ─── Animated Counters ──────────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;

      const update = () => {
        current = Math.min(current + step, target);
        el.textContent = (Number.isInteger(target) ? Math.round(current) : current.toFixed(1)) + suffix;
        if (current < target) requestAnimationFrame(update);
      };
      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

/* ─── Form Submissions ───────────────────────────────────── */
document.addEventListener('submit', async (e) => {
  const form = e.target;
  if (!form.dataset.form) return;
  e.preventDefault();

  const btn = form.querySelector('[type="submit"]');
  const original = btn.innerHTML;
  btn.innerHTML = '<span class="btn-spinner">●●●</span>';
  btn.disabled = true;

  // Simulate API call (replace with real Django endpoint)
  await new Promise(r => setTimeout(r, 1400));

  btn.innerHTML = original;
  btn.disabled = false;

  if (form.dataset.form === 'lead') {
    showToast('🎉 Thanks! Your free audit report will be emailed within 24 hours.', '✅');
    form.reset();
  } else if (form.dataset.form === 'contact') {
    showToast('Message sent! We\'ll respond within 4 business hours.', '✅');
    form.reset();
  }
});
