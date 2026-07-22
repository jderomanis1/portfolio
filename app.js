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

  // Mobile hamburger nav
  var hamburger = document.querySelector('.nav-hamburger');
  var mobilePanel = document.getElementById('mobile-nav-panel');
  if (hamburger && mobilePanel) {
    function closeMobileNav() {
      mobilePanel.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobilePanel.setAttribute('aria-hidden', 'true');
    }
    hamburger.addEventListener('click', function () {
      var open = mobilePanel.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(open));
      mobilePanel.setAttribute('aria-hidden', String(!open));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobilePanel.classList.contains('open')) {
        closeMobileNav();
        hamburger.focus();
      }
    });
    mobilePanel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileNav);
    });
  }

  // Cert group accordion
  var certGroups = document.querySelectorAll('.cert-group');
  certGroups.forEach(function (group, idx) {
    var label = group.querySelector('.cert-group-label');
    var cards = group.querySelector('.cert-group-cards');
    if (!label || !cards) return;

    var count = group.querySelectorAll('.cert').length;
    var countEl = label.querySelector('.cert-count');
    if (countEl) countEl.textContent = ' (' + count + ')';

    var body = document.createElement('div');
    body.className = 'cert-group-body';
    group.insertBefore(body, cards);
    body.appendChild(cards);

    label.addEventListener('click', function () {
      if (window.innerWidth >= 768) return;
      var open = group.classList.toggle('open');
      label.setAttribute('aria-expanded', String(open));
    });
  });

  function syncCertGroups() {
    certGroups.forEach(function (group, idx) {
      var label = group.querySelector('.cert-group-label');
      if (!label) return;
      if (window.innerWidth < 768) {
        var isOpen = idx === 0;
        group.classList.toggle('open', isOpen);
        label.setAttribute('aria-expanded', String(isOpen));
      } else {
        group.classList.add('open');
        label.setAttribute('aria-expanded', 'true');
      }
    });
  }
  syncCertGroups();

  var certResizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(certResizeTimer);
    certResizeTimer = setTimeout(syncCertGroups, 150);
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
