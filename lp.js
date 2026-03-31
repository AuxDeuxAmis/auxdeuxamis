/* ============================================================
   LANDING ADS - landing-ads.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ---- Smooth scroll pour les ancres internes ----
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ---- Gestion du formulaire ----
    var form = document.getElementById('lp-contact-form');
    var success = document.getElementById('lp-form-success');
    if (form && success) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            // TODO : brancher ici l'envoi réel (Webflow Form, Formspree, fetch, etc.)
            form.style.display = 'none';
            success.classList.add('lp-visible');
        });
    }

    // ---- Animation au scroll (IntersectionObserver) ----
    var animTargets = document.querySelectorAll(
        '.lp-concept-card, .lp-arg-card, .lp-review-card'
    );
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animTargets.forEach(function (el, i) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ' + (i * 0.08) + 's ease, transform 0.5s ' + (i * 0.08) + 's ease';
            observer.observe(el);
        });
    }

});
