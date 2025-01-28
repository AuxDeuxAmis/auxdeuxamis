document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('privatisationForm');
    const dateInput = document.getElementById('date');
    const guestsInput = document.getElementById('guests');
    const phoneInput = document.getElementById('phone');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Définir la date minimale à 14 jours
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 14);
    dateInput.min = minDate.toISOString().split('T')[0];

    // Validation du nombre d'invités
    guestsInput.addEventListener('input', function() {
        const guests = parseInt(this.value);
        if (guests < 20) {
            this.setCustomValidity('Minimum 20 personnes pour une privatisation');
        } else if (guests > 120) {
            this.setCustomValidity('Maximum 120 personnes (80 en intérieur + 40 en terrasse)');
        } else {
            this.setCustomValidity('');
        }
    });

    // Validation du numéro de téléphone (format français)
    phoneInput.addEventListener('input', function() {
        const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
        if (!phoneRegex.test(this.value)) {
            this.setCustomValidity('Veuillez entrer un numéro de téléphone français valide');
        } else {
            this.setCustomValidity('');
        }
        
        // Formater le numéro automatiquement
        let cleaned = this.value.replace(/\D/g, '');
        if (cleaned.length >= 10) {
            cleaned = cleaned.match(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/);
            if (cleaned) {
                this.value = '0' + cleaned[1] + ' ' + cleaned[2] + ' ' + cleaned[3] + ' ' + cleaned[4] + ' ' + cleaned[5];
            }
        }
    });

    // Validation du nom (minimum 3 caractères)
    nameInput.addEventListener('input', function() {
        if (this.value.length < 3) {
            this.setCustomValidity('Le nom doit contenir au moins 3 caractères');
        } else {
            this.setCustomValidity('');
        }
    });

    // Validation de l'email
    emailInput.addEventListener('input', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.value)) {
            this.setCustomValidity('Veuillez entrer une adresse email valide');
        } else {
            this.setCustomValidity('');
        }
    });

    // Validation du message (minimum 20 caractères)
    messageInput.addEventListener('input', function() {
        const minLength = 20;
        if (this.value.length < minLength) {
            this.setCustomValidity(`Veuillez décrire votre projet en au moins ${minLength} caractères`);
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

    // Gestion de la soumission du formulaire
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Afficher l'état d'envoi
        const submitBtn = this.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Envoi en cours...';
        submitBtn.disabled = true;

        // Simulation d'envoi (à remplacer par votre vrai endpoint)
        setTimeout(() => {
            // Succès
            form.style.display = 'none';
            document.querySelector('.w-form-done').style.display = 'block';
            
            // Reset le formulaire en arrière-plan
            form.reset();
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;

            // Scroll jusqu'au message de succès
            document.querySelector('.w-form-done').scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
        }, 1500);
    });
});
