document.addEventListener('DOMContentLoaded', function() {
    // Animation de la hero section
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(20px)';
        setTimeout(() => {
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 500);
    }

    // Animation des cartes au scroll
    const cards = document.querySelectorAll('.event-card, .formula-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => observer.observe(card));

    // Gestion du formulaire de privatisation
    const form = document.getElementById('privatisation-form');
    const dateInput = document.getElementById('date');
    const guestsInput = document.getElementById('guests');

    // Définir la date minimale à 48h après aujourd'hui
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 2);
    dateInput.min = minDate.toISOString().split('T')[0];

    // Validation des invités
    guestsInput.addEventListener('input', function() {
        const guests = parseInt(this.value);
        if (guests < 10) {
            this.setCustomValidity('Pour une privatisation, le minimum est de 10 personnes.');
        } else if (guests > 120) {
            this.setCustomValidity('Pour les groupes de plus de 120 personnes, merci de nous contacter par téléphone.');
        } else {
            this.setCustomValidity('');
        }
    });

    // Validation du numéro de téléphone (format français)
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function() {
        const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
        if (!phoneRegex.test(this.value)) {
            this.setCustomValidity('Veuillez entrer un numéro de téléphone français valide');
        } else {
            this.setCustomValidity('');
        }
    });

    // Clean up des messages d'erreur quand l'utilisateur commence à taper
    form.querySelectorAll('input, textarea').forEach(element => {
        element.addEventListener('input', function() {
            if (this.validationMessage) {
                this.setCustomValidity('');
            }
        });
    });
});
