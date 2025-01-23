document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reservationForm');
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');

    // Définir la date minimale à 48h après aujourd'hui
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 2);
    dateInput.min = minDate.toISOString().split('T')[0];

    // Restreindre les heures de réservation
    timeInput.addEventListener('change', function() {
        const time = this.value;
        const hour = parseInt(time.split(':')[0]);
        if (hour < 11 || hour > 21) {
            alert('Les réservations sont possibles entre 11h et 21h');
            this.value = '12:00';
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validation supplémentaire si nécessaire
        const guests = parseInt(document.getElementById('guests').value);
        if (guests < 8) {
            alert('Pour les groupes de moins de 8 personnes, merci de nous appeler directement.');
            return;
        }

        // Ici, ajouter le code pour envoyer le formulaire
        alert('Votre demande a été envoyée. Nous vous contacterons dans les plus brefs délais pour confirmer votre réservation.');
        form.reset();
    });
});
