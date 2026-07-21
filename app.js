// deromanis.com — interactions
(function () {
  'use strict';

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Nav scrolled state
  var nav = document.getElementById('nav');
  var onScroll = function () {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 24);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Ledger accordion
  document.querySelectorAll('.ledger-row').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var entry = btn.closest('.ledger-entry');
      var open = entry.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reveal on scroll
  if ('IntersectionObserver' in window && !reducedMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('in');
    });
  }

  // Telemetry counters
  var animateCount = function (el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    if (reducedMotion) { el.textContent = target + suffix; return; }
    var start = null;
    var duration = 1200;
    var step = function (ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target) + (p === 1 ? suffix : '');
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          animateCount(e.target);
          countObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.6 });
    document.querySelectorAll('.telemetry-num').forEach(function (el) {
      countObserver.observe(el);
    });
  } else {
    document.querySelectorAll('.telemetry-num').forEach(animateCount);
  }
})();
