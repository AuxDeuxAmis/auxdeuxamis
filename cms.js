// Script spécifique à la page mentions légales
document.addEventListener('DOMContentLoaded', function() {
  // Animation simple de fade-in au chargement
  const legalContent = document.querySelector('.legal-content');
  
  if (legalContent) {
    legalContent.style.opacity = '0';
    legalContent.style.transform = 'translateY(20px)';
    legalContent.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    setTimeout(() => {
      legalContent.style.opacity = '1';
      legalContent.style.transform = 'translateY(0)';
    }, 100);
  }

  // Smooth scroll pour les ancres internes
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
