document.addEventListener('DOMContentLoaded', function() {
  // Ne rien faire de spécial, laissez Webflow gérer l'envoi du formulaire
  const form = document.getElementById('reservationForm');
  
  // Si vous voulez voir si le formulaire est soumis
  form.addEventListener('submit', function(event) {
    console.log('Formulaire soumis');
    // Ne pas ajouter preventDefault() pour laisser le formulaire se soumettre normalement
  });
});

