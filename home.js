document.addEventListener('DOMContentLoaded', function() {
  // 1. Fonction pour le décompte
  function initCountdown() {
    // Date cible : 31 mars 2025 à 12h00
    const targetDate = new Date('2025-03-31T12:00:00').getTime();
    
    function updateCountdown() {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        if (document.getElementById('days')) {
          document.getElementById('days').textContent = days.toString().padStart(2, '0');
          document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
          document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
          document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        }
      } else {
        // Si la date est passée
        if (document.getElementById('days')) {
          document.getElementById('days').textContent = '00';
          document.getElementById('hours').textContent = '00';
          document.getElementById('minutes').textContent = '00';
          document.getElementById('seconds').textContent = '00';
        }
      }
    }
    
    // Initialiser le décompte
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

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
  initCountdown();
  initScrollAnimations();
  initPageTransitions();
  initMobileMenu();

  // 6. Gestion du chargement de la page
  window.addEventListener('load', () => {
    document.body.classList.add('page-loaded');
  });
});
