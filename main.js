// Script pour le menu mobile
document.addEventListener('DOMContentLoaded', function() {
  const trigger = document.querySelector('.mobile-menu-trigger');
  const panel = document.querySelector('.mobile-panel');
  const header = document.querySelector('.site-header');
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  
  trigger.addEventListener('click', function() {
    this.classList.toggle('is-active');
    panel.classList.toggle('is-active');
    document.body.classList.toggle('no-scroll');
  });
  // Gestion du header au scroll
  let lastScroll = 0;
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
      header.classList.remove('is-scrolled');
      header.classList.remove('is-hidden');
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
      // Scroll down
      header.classList.add('is-hidden');
      header.classList.add('is-scrolled');
    }
    
    if (currentScroll < lastScroll) {
      // Scroll up
      header.classList.remove('is-hidden');
      header.classList.add('is-scrolled');
    }
    
    lastScroll = currentScroll;
  });

  // Vérifier si le bouton existe déjà
  const callButton = document.querySelector('.sticky-call-button');
  if (callButton) {
    // Afficher le bouton après un court délai
    setTimeout(() => {
      callButton.classList.add('visible');
    }, 1500);
    
    // Faire sonner le bouton toutes les 5 secondes
    setInterval(() => {
      callButton.classList.add('ringing');
      
      // Arrêter l'animation de sonnerie après 1 seconde
      setTimeout(() => {
        callButton.classList.remove('ringing');
      }, 1000);
    }, 5000);
  }
});


// POPUP !!!!!
        // Fonction pour fermer la pop-up
        function adaClosePopup() {
            const overlay = document.getElementById('adaCongesOverlay');
            overlay.classList.add('ada-closing');
            
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 300);
            
            // Marquer comme vue pour ne pas la réafficher
            localStorage.setItem('adaCongesAout2025Seen', 'true');
        }

        // Fermer en cliquant sur l'overlay
        document.getElementById('adaCongesOverlay').addEventListener('click', function(e) {
            if (e.target === this) {
                adaClosePopup();
            }
        });

        // Fermer avec Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                adaClosePopup();
            }
        });

        // Ne pas réafficher si déjà vue (optionnel)
        document.addEventListener('DOMContentLoaded', function() {
            const alreadySeen = localStorage.getItem('adaCongesAout2025Seen');
            if (alreadySeen) {
                document.getElementById('adaCongesOverlay').style.display = 'none';
            }
        });
