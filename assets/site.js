// site.js - shared footer behaviors
(() => {
  const y = document.getElementById('y');
  if (y) y.textContent = String(new Date().getFullYear());

  // Background spotlight effect (mouse position).
  const root = document.documentElement;
  const setSpot = (x, y) => {
    root.style.setProperty('--mx', x + '%');
    root.style.setProperty('--my', y + '%');
  };

  const finePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches;

  if (finePointer) {
    window.addEventListener(
      'mousemove',
      (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        setSpot(x.toFixed(2), y.toFixed(2));
      },
      { passive: true }
    );
  }

  window.addEventListener('touchstart', () => setSpot(50, 20), { passive: true, once: true });

  // Mobile nav toggle
  const toggles = document.querySelectorAll('.navToggle');
  const closeNav = (topbar) => {
    if (!topbar) return;
    if (!topbar.classList.contains('is-open')) return;
    const btn = topbar.querySelector('.navToggle');
    const nav = topbar.querySelector('[data-nav]');
    topbar.classList.remove('is-open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
    if (nav) nav.setAttribute('data-open', 'false');
  };

  toggles.forEach((btn) => {
    const topbar = btn.closest('.topbar');
    if (!topbar) return;
    const nav = topbar.querySelector('[data-nav]');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = !topbar.classList.contains('is-open');
      if (isOpen) {
        topbar.classList.add('is-open');
      } else {
        topbar.classList.remove('is-open');
      }
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (nav) nav.setAttribute('data-open', isOpen ? 'true' : 'false');
    });
  });

  // Close mobile nav when tapping outside
  document.addEventListener('click', (e) => {
    const topbar = e.target.closest('.topbar');
    if (topbar) return; // clicks inside header handled by toggle
    const openTopbars = document.querySelectorAll('.topbar.is-open');
    openTopbars.forEach((tb) => closeNav(tb));
  });

  // /go/call and /go/email helpers.
  // Keeps pages static while still performing tel: / mailto: redirects.
  try {
    const path = window.location.pathname;
    if (!path.startsWith('/go/')) return;

    const url = new URL(window.location.href);
    const to = url.searchParams.get('to');
    if (!to) return;

    const fallback = document.getElementById('fallback');

    if (path.startsWith('/go/call')) {
      const href = 'tel:' + to;
      if (fallback) fallback.setAttribute('href', href);
      window.location.replace(href);
      return;
    }

    if (path.startsWith('/go/email')) {
      const href = 'mailto:' + to;
      if (fallback) fallback.setAttribute('href', href);
      window.location.replace(href);
      return;
    }
  } catch {
    // no-op
  }
})();
