<!-- Mise à jour du JavaScript -->
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('privatisationForm');
    if (!form) return;

    const dateInput = document.getElementById('date');
    const guestsInput = document.getElementById('guests');
    const phoneInput = document.getElementById('phone');
    const submitBtn = form.querySelector('.submit-btn');
    const formDone = document.querySelector('.w-form-done');
    const formFail = document.querySelector('.w-form-fail');

    // Masquer les messages de succès/erreur au départ
    if (formDone) formDone.style.display = 'none';
    if (formFail) formFail.style.display = 'none';

    // Définir la date minimale à 14 jours
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 14);
    if (dateInput) {
        dateInput.min = minDate.toISOString().split('T')[0];
    }

    // Validation du nombre d'invités
    if (guestsInput) {
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
    }

    // Validation du numéro de téléphone (format français)
    if (phoneInput) {
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
    }

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
        
        // Récupérer le texte original du bouton
        const originalText = submitBtn.value;
        const waitingText = submitBtn.getAttribute('data-wait');
        
        // Mettre à jour l'état du bouton
        submitBtn.value = waitingText;
        submitBtn.disabled = true;

        // Simuler l'envoi (à remplacer par votre vrai endpoint)
        setTimeout(() => {
            // Cacher le formulaire
            form.style.display = 'none';
            
            // Afficher le message de succès
            if (formDone) {
                formDone.style.display = 'block';
                formDone.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            // Reset le formulaire et le bouton
            form.reset();
            submitBtn.value = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
});
