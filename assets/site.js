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

  window.addEventListener(
    'mousemove',
    (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setSpot(x.toFixed(2), y.toFixed(2));
    },
    { passive: true }
  );

  window.addEventListener('touchstart', () => setSpot(50, 20), { passive: true, once: true });

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
