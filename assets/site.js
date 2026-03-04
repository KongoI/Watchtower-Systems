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
  toggles.forEach((btn) => {
    const topbar = btn.closest('.topbar');
    if (!topbar) return;
    const nav = topbar.querySelector('[data-nav]');
    btn.addEventListener('click', () => {
      const isOpen = topbar.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (nav) nav.setAttribute('data-open', isOpen ? 'true' : 'false');
    });
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
