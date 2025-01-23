document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reservationForm');
    const dateInput = document.getElementById('date');
    const guestsInput = document.getElementById('guests');

    // Définir la date minimale à 48h après aujourd'hui
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 2);
    dateInput.min = minDate.toISOString().split('T')[0];

    // Validation des invités
    guestsInput.addEventListener('input', function() {
        const guests = parseInt(this.value);
        if (guests < 8) {
            this.setCustomValidity('Pour les groupes de moins de 8 personnes, merci de nous appeler directement.');
        } else if (guests > 50) {
            this.setCustomValidity('Pour les groupes de plus de 50 personnes, merci de nous contacter par téléphone.');
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
    form.querySelectorAll('input, textarea, select').forEach(element => {
        element.addEventListener('input', function() {
            if (this.validationMessage) {
                this.setCustomValidity('');
            }
        });
    });
});
