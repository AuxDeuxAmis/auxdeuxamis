// =====================================================
// Script principal du site - Brasserie Aux Deux Amis
// - Burger + panneau mobile (avec scroll-lock iOS)
// - Sous-menu "À propos" animé (height)
// - Header show/hide au scroll
// - Bouton d'appel sticky
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
  const trigger  = document.querySelector('.mobile-menu-trigger');
  const panel    = document.querySelector('.mobile-panel');
  const header   = document.querySelector('.site-header');
  const yearSpan = document.getElementById('current-year');

  // Année dynamique dans le footer
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // ===== Scroll-lock helpers (iOS/Safari safe) =====
  const lockScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    document.body.dataset.scrollY = String(y);

    // Empêche les scroll-behavior smooth de faire remonter la page
    const prevBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';

    // Fige le body à la position actuelle
    document.body.classList.add('no-scroll');
    document.body.style.position = 'fixed';
    document.body.style.top = `-${y}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';

    document.body.dataset.prevScrollBehavior = prevBehavior || '';
  };

  const unlockScroll = () => {
    const y = parseInt(document.body.dataset.scrollY || '0', 10) || 0;

    document.body.classList.remove('no-scroll');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';

    // Restaure la position exacte
    window.scrollTo(0, y);

    const prev = document.body.dataset.prevScrollBehavior || '';
    document.documentElement.style.scrollBehavior = prev;
    delete document.body.dataset.prevScrollBehavior;
    delete document.body.dataset.scrollY;
  };

  // ===== Burger toggle + scroll-lock =====
  if (trigger && panel) {
    trigger.addEventListener('click', function() {
      const opening = !panel.classList.contains('is-active');
      this.classList.toggle('is-active');
      panel.classList.toggle('is-active');

      if (opening) {
        lockScroll();
        // Empêche le scroll chaining vers le body
        panel.addEventListener('touchmove', e => e.stopPropagation(), { passive: true });
        panel.addEventListener('wheel',      e => e.stopPropagation(), { passive: true });
      } else {
        unlockScroll();
      }
    });
  }

  // ===== Header show/hide au scroll =====
  let lastScroll = 0;
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      header.classList.remove('is-scrolled', 'is-hidden');
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
      // Scroll down
      header.classList.add('is-hidden', 'is-scrolled');
    }

    if (currentScroll < lastScroll) {
      // Scroll up
      header.classList.remove('is-hidden');
      header.classList.add('is-scrolled');
    }

    lastScroll = currentScroll;
  });

  // ===== Bouton d’appel sticky =====
  const callButton = document.querySelector('.sticky-call-button');
  if (callButton) {
    setTimeout(() => callButton.classList.add('visible'), 1500);
    setInterval(() => {
      callButton.classList.add('ringing');
      setTimeout(() => callButton.classList.remove('ringing'), 1000);
    }, 5000);
  }

  // ===== Sous-menu "À propos" (accordion height) =====
  const aproposTrigger = document.querySelector('#apropos-trigger');
  const aproposPanel   = document.querySelector('#apropos-submenu');

  if (aproposTrigger && aproposPanel) {
    const setHeight = (el, open) => {
      if (open) {
        el.hidden = false;
        const h = el.scrollHeight;
        el.style.height = '0px';
        requestAnimationFrame(() => { el.style.height = h + 'px'; });
        el.addEventListener('transitionend', () => { el.style.height = ''; }, { once: true });
      } else {
        const h = el.scrollHeight;
        el.style.height = h + 'px';
        requestAnimationFrame(() => { el.style.height = '0px'; });
        el.addEventListener('transitionend', () => { el.hidden = true; el.style.height = ''; }, { once: true });
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
