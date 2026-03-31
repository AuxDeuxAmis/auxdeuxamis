/* ============================================================
   LANDING ADS v4 - landing-ads-v4.js
   Le formulaire est géré nativement par Webflow (w-form).
   Ce JS gère uniquement : topbar, animations scroll,
   particles hero, smooth scroll, parallax.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

    /* ---- TOPBAR : apparaît après le hero ---- */
    var topbar = document.querySelector('.lp-topbar');
    var hero   = document.querySelector('.lp-hero');
    if (topbar && hero) {
        var heroObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                topbar.classList.toggle('lp-visible', !e.isIntersecting);
            });
        }, { threshold: 0.1 });
        heroObs.observe(hero);
    }

    /* ---- SCROLL ANIMATIONS ---- */
    var animEls = document.querySelectorAll('.lp-animate');
    if ('IntersectionObserver' in window && animEls.length) {
        var animObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add('lp-in');
                    animObs.unobserve(e.target);
                }
            });
        }, { threshold: 0.1 });
        animEls.forEach(function (el) { animObs.observe(el); });
    } else {
        animEls.forEach(function (el) { el.classList.add('lp-in'); });
    }

    /* ---- PARTICLES hero ---- */
    var container = document.getElementById('lp-particles');
    if (container) {
        for (var i = 0; i < 20; i++) {
            var p   = document.createElement('div');
            p.className = 'lp-particle';
            var sz  = 1.5 + Math.random() * 2.5;
            p.style.left   = (Math.random() * 100) + '%';
            p.style.top    = (40 + Math.random() * 50) + '%';
            p.style.width  = sz + 'px';
            p.style.height = sz + 'px';
            p.style.setProperty('--dur',   (4 + Math.random() * 5) + 's');
            p.style.setProperty('--delay', (Math.random() * 6) + 's');
            container.appendChild(p);
        }
    }

    /* ---- SMOOTH SCROLL (offset topbar ~64px) ---- */
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            var top = target.getBoundingClientRect().top + window.scrollY - 64;
            window.scrollTo({ top: top, behavior: 'smooth' });
        });
    });

    /* ---- PARALLAX hero bg (desktop uniquement) ---- */
    var heroBg = document.querySelector('.lp-hero-bg');
    if (heroBg && window.matchMedia('(min-width: 768px)').matches) {
        window.addEventListener('scroll', function () {
            heroBg.style.transform = 'scale(1.05) translateY(' + (window.scrollY * 0.16) + 'px)';
        }, { passive: true });
    }

});
