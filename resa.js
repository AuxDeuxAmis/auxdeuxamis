document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reservationForm');
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.spinner');

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

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validation supplémentaire
        const guests = parseInt(document.getElementById('guests').value);
        if (guests < 8) {
            alert('Pour les groupes de moins de 8 personnes, merci de nous appeler directement.');
            return;
        }

        // Désactiver le bouton et afficher le spinner
        submitBtn.disabled = true;
        spinner.style.display = 'inline-block';
        btnText.textContent = 'Envoi en cours...';

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                alert('Votre demande a été envoyée avec succès. Nous vous contacterons dans les plus brefs délais pour confirmer votre réservation.');
                form.reset();
            } else {
                throw new Error('Erreur lors de l\'envoi');
            }
        } catch (error) {
            alert('Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer ou nous contacter par téléphone.');
        } finally {
            // Réactiver le bouton et cacher le spinner
            submitBtn.disabled = false;
            spinner.style.display = 'none';
            btnText.textContent = 'Envoyer la demande';
        }
    });
});
