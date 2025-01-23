// agenda.js

document.addEventListener('DOMContentLoaded', function() {
    // Gestion du redimensionnement responsive de l'iframe
    function adjustCalendarHeight() {
        const width = document.querySelector('.calendar-wrapper').offsetWidth;
        const iframe = document.querySelector('.calendar-wrapper iframe');
        if (window.innerWidth < 768) {
            // Ajuster la hauteur pour mobile
            iframe.style.height = width * 1.2 + 'px';
        }
    }

    // Ajuster au chargement et au redimensionnement
    window.addEventListener('resize', adjustCalendarHeight);
    adjustCalendarHeight();

    // Animation d'apparition au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    // Observer les sections pour les animations
    document.querySelectorAll('.agenda-section, .contact-section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
});
