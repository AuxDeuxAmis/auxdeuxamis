document.addEventListener('DOMContentLoaded', function() {
  // La fonction de décompte a été supprimée car la brasserie est maintenant ouverte
  
  // 2. Fonction pour les animations au scroll
  function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    // Observer les cartes de timing
    document.querySelectorAll('.timing-card').forEach(card => {
      card.classList.add('scroll-animate');
      observer.observe(card);
    });
    // Observer les éléments d'atmosphère
    document.querySelectorAll('.atmosphere-item, .atmosphere-main').forEach(item => {
      item.classList.add('scroll-animate');
      observer.observe(item);
    });
  }
  
  // 3. Gestion des transitions de page
  function initPageTransitions() {
    document.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        if (link.href && !link.href.startsWith('#') && !link.target) {
          e.preventDefault();
          document.body.classList.add('page-transition');
          setTimeout(() => {
            window.location = link.href;
          }, 500);
        }
      });
    });
  }
  
  // 4. Gestion du menu mobile
  function initMobileMenu() {
    const mobileMenuTrigger = document.querySelector('.mobile-menu-trigger');
    if (mobileMenuTrigger) {
      mobileMenuTrigger.addEventListener('click', () => {
        document.body.classList.toggle('menu-open');
      });
    }
  }
  
  // 5. Initialiser toutes les fonctionnalités
  // La fonction initCountdown() a été retirée car elle n'est plus nécessaire
  initScrollAnimations();
  initPageTransitions();
  initMobileMenu();
  
  // 6. Gestion du chargement de la page
  window.addEventListener('load', () => {
    document.body.classList.add('page-loaded');
  });
});
