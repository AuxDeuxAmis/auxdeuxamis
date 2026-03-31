/* ============================================================
   LANDING ADS v2 - landing-ads-v2.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ---- TOPBAR : apparaît après avoir scrollé hors du hero ----
    var topbar = document.querySelector('.lp-topbar');
    var hero = document.querySelector('.lp-hero');
    if (topbar && hero) {
        var heroObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    topbar.classList.add('lp-visible');
                } else {
                    topbar.classList.remove('lp-visible');
                }
            });
        }, { threshold: 0.1 });
        heroObserver.observe(hero);
    }

    // ---- SCROLL ANIMATIONS (IntersectionObserver) ----
    var animTargets = document.querySelectorAll('.lp-animate');
    if ('IntersectionObserver' in window && animTargets.length) {
        var scrollObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('lp-in');
                    scrollObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        animTargets.forEach(function (el) {
            scrollObserver.observe(el);
        });
    } else {
        // Fallback si pas d'IntersectionObserver
        animTargets.forEach(function (el) {
            el.classList.add('lp-in');
        });
    }

    // ---- PARTICLES dans le hero ----
    var container = document.getElementById('lp-particles');
    if (container) {
        var count = 18;
        for (var i = 0; i < count; i++) {
            var p = document.createElement('div');
            p.className = 'lp-particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.top = (40 + Math.random() * 55) + '%';
            p.style.setProperty('--dur', (4 + Math.random() * 5) + 's');
            p.style.setProperty('--delay', (Math.random() * 5) + 's');
            var size = 1.5 + Math.random() * 2.5;
            p.style.width = size + 'px';
            p.style.height = size + 'px';
            container.appendChild(p);
        }
    }

    // ---- SMOOTH SCROLL pour les ancres ----
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                var offset = 60; // compenser la topbar
                var top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

    // ---- FORMULAIRE ----
    var form = document.getElementById('lp-contact-form');
    var success = document.getElementById('lp-form-success');
    if (form && success) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            // TODO : brancher ici l'envoi réel
            // Option 1 : fetch vers ton endpoint
            // Option 2 : laisser Webflow gérer le submit natif (retirer e.preventDefault())
            // Option 3 : Formspree — changer action="https://formspree.io/f/XXXXX" et retirer e.preventDefault()
            form.style.display = 'none';
            success.classList.add('lp-visible');
        });
    }

    // ---- HERO PARALLAX (subtil, desktop uniquement) ----
    var heroBg = document.querySelector('.lp-hero-bg');
    if (heroBg && window.innerWidth > 768) {
        window.addEventListener('scroll', function () {
            var scrolled = window.scrollY;
            heroBg.style.transform = 'scale(1.05) translateY(' + (scrolled * 0.18) + 'px)';
        }, { passive: true });
    }

});
