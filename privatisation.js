// privatisation.js

document.addEventListener('DOMContentLoaded', function() {
    // Gestion du formulaire
    const form = document.getElementById('privatisation-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    // Animation des cartes au scroll
    const cards = document.querySelectorAll('.event-card, .formula-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    // Validation du formulaire
    setupFormValidation();
});

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Validation des données
    if (!validateFormData(data)) {
        return;
    }

    // Animation du bouton pendant l'envoi
    const submitButton = e.target.querySelector('.submit-button');
    submitButton.disabled = true;
    submitButton.innerHTML = 'Envoi en cours...';

    // Simulation d'envoi (à remplacer par votre vrai endpoint)
    setTimeout(() => {
        submitButton.innerHTML = 'Demande envoyée !';
        submitButton.style.backgroundColor = 'var(--color-primary)';
        
        // Reset du formulaire après 2 secondes
        setTimeout(() => {
            e.target.reset();
            submitButton.disabled = false;
            submitButton.innerHTML = 'Envoyer ma demande';
            submitButton.style.backgroundColor = 'var(--color-secondary)';
        }, 2000);
    }, 1500);
}

function validateFormData(data) {
    // Validation du nombre d'invités
    const guests = parseInt(data.guests);
    if (isNaN(guests) || guests < 10 || guests > 120) {
        showError('Le nombre d\'invités doit être compris entre 10 et 120');
        return false;
    }

    // Validation de la date
    const selectedDate = new Date(data.date);
    const today = new Date();
    if (selectedDate < today) {
        showError('La date sélectionnée ne peut pas être dans le passé');
        return false;
    }

    // Validation du téléphone (format français)
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    if (!phoneRegex.test(data.phone)) {
        showError('Le numéro de téléphone n\'est pas valide');
        return false;
    }

    return true;
}

function setupFormValidation() {
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateInput(this);
        });

        input.addEventListener('blur', function() {
            validateInput(this);
        });
    });
}

function validateInput(input) {
    const value = input.value.trim();
    
    if (!value && input.required) {
        setInputError(input, 'Ce champ est requis');
        return false;
    }

    if (input.type === 'email' && !isValidEmail(value)) {
        setInputError(input, 'Email invalide');
        return false;
    }

    clearInputError(input);
    return true;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setInputError(input, message) {
    const formGroup = input.closest('.form-group');
    clearInputError(input);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.innerHTML = message;
    formGroup.appendChild(errorDiv);
    
    input.classList.add('error');
}

function clearInputError(input) {
    const formGroup = input.closest('.form-group');
    const existingError = formGroup.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }
    input.classList.remove('error');
}

function showError(message) {
    // Création d'une notification d'erreur
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.innerHTML = message;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Suppression après 3 secondes
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Ajout des styles pour la notification d'erreur
const style = document.createElement('style');
style.textContent = `
    .error-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #ff4444;
        color: white;
        padding: 12px 24px;
        border-radius: 4px;
        transform: translateX(120%);
        transition: transform 0.3s ease;
        z-index: 1000;
        font-family: 'Filicudi', sans-serif;
    }

    .error-notification.show {
        transform: translateX(0);
    }

    .form-error {
        color: #ff4444;
        font-size: 0.8rem;
        margin-top: 4px;
        font-family: 'Filicudi', sans-serif;
    }

    .form-group input.error,
    .form-group textarea.error {
        border-color: #ff4444;
    }
`;
document.head.appendChild(style);
