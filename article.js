// Script pour la page article
document.addEventListener('DOMContentLoaded', function() {
  // Animation des sections au scroll
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
  };

  // Sélection des éléments à animer
  const animatedElements = document.querySelectorAll('.article-section, .article-cta, .article-quote');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Initialisation des animations
  animatedElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    element.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(element);
  });

  // Gestion du temps de lecture estimé
  const articleContent = document.querySelector('.article-content');
  if (articleContent) {
    const wordCount = articleContent.textContent.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // 200 mots par minute en moyenne
    
    // Création et insertion du temps de lecture
    const readingTimeElement = document.createElement('div');
    readingTimeElement.className = 'reading-time';
    readingTimeElement.innerHTML = `Temps de lecture estimé : ${readingTime} min`;
    document.querySelector('.article-meta').appendChild(readingTimeElement);
  }

  // Animation des éléments au hover
  const ctaButtons = document.querySelectorAll('.cta-button');
  ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-2px)';
      button.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)';
      button.style.boxShadow = 'none';
    });
  });
});
