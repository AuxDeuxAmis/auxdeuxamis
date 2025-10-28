// ===========================
// Script principal du site
// Brasserie Aux Deux Amis
// ===========================

document.addEventListener('DOMContentLoaded', function() {
  const trigger = document.querySelector('.mobile-menu-trigger');
  const panel = document.querySelector('.mobile-panel');
  const header = document.querySelector('.site-header');
  const yearSpan = document.getElementById('current-year');

  // ===========================
  // Année dynamique dans le footer
  // ===========================
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ===========================
  // Menu mobile burger
  // ===========================
  if (trigger && panel) {
    trigger.addEventListener('click', function() {
      this.classList.toggle('is-active');
      panel.classList.toggle('is-active');
      document.body.classList.toggle('no-scroll');
    });
  }

  // ===========================
  // Gestion du header au scroll
  // ===========================
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

  // ===========================
  // Bouton d’appel sticky mobile
  // ===========================
  const callButton = document.querySelector('.sticky-call-button');
  if (callButton) {
    // Afficher le bouton après un délai
    setTimeout(() => {
      callButton.classList.add('visible');
    }, 1500);

    // Animer la sonnerie
    setInterval(() => {
      callButton.classList.add('ringing');
      setTimeout(() => {
        callButton.classList.remove('ringing');
      }, 1000);
    }, 5000);
  }

  // ===========================
  // Sous-menu "À propos" du menu mobile
  // ===========================
  const aproposTrigger = document.querySelector('#apropos-trigger');
  const aproposPanel = document.querySelector('#apropos-submenu');

  if (aproposTrigger && aproposPanel) {
    const setHeight = (el, open) => {
      if (open) {
        el.hidden = false;
        const h = el.scrollHeight;
        el.style.height = '0px';
        requestAnimationFrame(() => {
          el.style.height = h + 'px';
        });
        el.addEventListener('transitionend', () => {
          el.style.height = '';
        }, { once: true });
      } else {
        const h = el.scrollHeight;
        el.style.height = h + 'px';
        requestAnimationFrame(() => {
          el.style.height = '0px';
        });
        el.addEventListener('transitionend', () => {
          el.hidden = true;
          el.style.height = '';
        }, { once: true });
      }
    };

    aproposTrigger.addEventListener('click', () => {
      const isOpen = aproposTrigger.getAttribute('aria-expanded') === 'true';
      aproposTrigger.setAttribute('aria-expanded', String(!isOpen));
      setHeight(aproposPanel, !isOpen);
    });

    aproposTrigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        aproposTrigger.click();
      }
    });
  }
});
