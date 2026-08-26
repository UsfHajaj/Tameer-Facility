/**
 * تـعمير — قوائم الناف المنسدلة
 * سطح المكتب: hover فقط | الموبايل: نقرة مع إغلاق الباقي
 */
(function () {
  'use strict';
  if (window.__tameerNavDropdown) return;
  window.__tameerNavDropdown = true;

  function isDesktop() {
    return window.matchMedia('(min-width: 992px)').matches;
  }

  function clearMenuInline(menu) {
    if (!menu) return;
    menu.style.cssText = '';
  }

  function closeDropdown(dropdown) {
    if (!dropdown) return;
    dropdown.classList.remove('is-open', 'mobile-active', 'show', 'active');
    var toggle = dropdown.querySelector('.dropdown-toggle');
    var menu = dropdown.querySelector('.dropdown-menu');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    clearMenuInline(menu);
  }

  function closeAll(except) {
    document.querySelectorAll('.navbar .dropdown').forEach(function (dd) {
      if (dd !== except) closeDropdown(dd);
    });
  }

  function openDropdown(dropdown) {
    dropdown.classList.add('is-open', 'mobile-active');
    var toggle = dropdown.querySelector('.dropdown-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
  }

  function init() {
    var toggles = document.querySelectorAll('.navbar .dropdown-toggle');
    toggles.forEach(function (toggle) {
      toggle.removeAttribute('data-bs-toggle');
      toggle.setAttribute('aria-haspopup', 'true');
      if (!toggle.getAttribute('aria-expanded')) {
        toggle.setAttribute('aria-expanded', 'false');
      }

      toggle.addEventListener('click', function (e) {
        var dropdown = this.closest('.dropdown');
        if (!dropdown) return;

        // سطح المكتب: لا نمنع الرابط — القائمة تفتح بالـ hover
        if (isDesktop()) {
          closeAll();
          return;
        }

        e.preventDefault();
        e.stopPropagation();

        var willOpen = !dropdown.classList.contains('is-open');
        closeAll(dropdown);
        if (willOpen) openDropdown(dropdown);
        else closeDropdown(dropdown);
      });
    });

    document.addEventListener('click', function (e) {
      if (isDesktop()) return;
      if (!e.target.closest('.navbar .dropdown')) closeAll();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAll();
    });

    window.addEventListener('resize', function () {
      clearTimeout(window.__tameerNavResize);
      window.__tameerNavResize = setTimeout(function () {
        closeAll();
      }, 150);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
