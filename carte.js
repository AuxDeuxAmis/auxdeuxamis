document.addEventListener('DOMContentLoaded', function() {
  const menuButtons = document.querySelectorAll('.menu-button');
  
  menuButtons.forEach((button, index) => {
    // Animation initiale plus subtile
    button.style.opacity = 0;
    button.style.transform = 'translateX(-10px)'; // Réduit le déplacement
    
    // Animation plus rapide
    button.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    button.style.transitionDelay = `${index * 0.1}s`; // Réduit le délai
    
    // Déclenche l'animation immédiatement
    setTimeout(() => {
      button.style.opacity = 1;
      button.style.transform = 'translateX(0)';
    }, 100);
  });
});
