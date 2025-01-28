// Script pour la page blog
document.addEventListener('DOMContentLoaded', function() {
  // Animation des cartes au scroll
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
  };

  const blogCards = document.querySelectorAll('.blog-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Initialiser les cartes
  blogCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });
});
