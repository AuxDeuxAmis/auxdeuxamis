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
  // Un seul handler réutilisable → permet de removeEventListener proprement
  const stopScrollChaining = (e) => e.stopPropagation();

  trigger.addEventListener('click', function() {
    const opening = !panel.classList.contains('is-active');
    this.classList.toggle('is-active');
    panel.classList.toggle('is-active');

    if (opening) {
      lockScroll();

      // ✅ Le scroll reste bien DANS le panneau
      panel.addEventListener('wheel', stopScrollChaining, { passive: true });
      panel.addEventListener('touchmove', stopScrollChaining, { passive: true });

      // ✅ Focus clavier (et iOS) sur le panneau pour capturer le scroll
      if (!panel.hasAttribute('tabindex')) panel.setAttribute('tabindex', '-1');
      panel.focus({ preventScroll: true });
    } else {
      // On nettoie pour éviter l’empilement des listeners à chaque ouverture
      panel.removeEventListener('wheel', stopScrollChaining);
      panel.removeEventListener('touchmove', stopScrollChaining);

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

// =====================================================
// POPUP — Fermeture annuelle (ADA)
// - Injection DOM
// - Affichage uniquement pendant la période
// - Si fermeture => pas de réaffichage (localStorage)
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
  const STORAGE_KEY = 'ada_closure_2025_dismissed_until';
  const SHOW_DELAY_MS = 800;

  // Fenêtre d’affichage (heure locale du navigateur)
  // du 22/12/2025 00:00 au 04/01/2026 23:59:59 (inclus)
  const START = new Date(2025, 11, 22, 0, 0, 0);
  const END   = new Date(2026, 0,  4, 23, 59, 59);

  // Quand l’utilisateur ferme, on ne réaffiche plus jusqu’au 06/01/2026 00:00
  const DISMISS_UNTIL = new Date(2026, 0, 6, 0, 0, 0);

  function now(){ return new Date(); }
  function isInWindow(d){ return d >= START && d <= END; }

  function getDismissedUntil(){
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      if(!raw) return null;
      const ts = Number(raw);
      if(!Number.isFinite(ts)) return null;
      return new Date(ts);
    } catch(e){
      return null;
    }
  }

  function setDismissedUntil(dateObj){
    try{
      localStorage.setItem(STORAGE_KEY, String(dateObj.getTime()));
    } catch(e){
      // ignore (mode privé / storage bloqué)
    }
  }

  // Scroll lock indépendant (pour éviter le scroll derrière la popup)
  function lockScrollForModal(){
    const y = window.scrollY || document.documentElement.scrollTop;
    document.body.dataset.adaClosureScrollY = String(y);
    document.body.style.position = 'fixed';
    document.body.style.top = `-${y}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
  }

  function unlockScrollForModal(){
    const y = parseInt(document.body.dataset.adaClosureScrollY || '0', 10) || 0;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    delete document.body.dataset.adaClosureScrollY;
    window.scrollTo(0, y);
  }

  function buildPopup(){
    const overlay = document.createElement('div');
    overlay.className = 'ada-closure-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Fermeture annuelle');

    overlay.innerHTML = `
      <div class="ada-closure-modal" role="document">
        <div class="ada-closure-header">
          <button class="ada-closure-close" type="button" aria-label="Fermer"></button>
          <div class="ada-closure-badge">🏖️ Fermeture annuelle</div>
          <div class="ada-closure-title">On revient très vite</div>
          <div class="ada-closure-subtitle">Merci de votre compréhension ❤️</div>
        </div>

        <div class="ada-closure-body">
          <div class="ada-closure-block">
            <div class="ada-closure-block-title">Dates</div>
            <div class="ada-closure-block-text">
              Du lundi 22 décembre 2025 au dimanche 4 janvier 2026
            </div>
          </div>

          <div class="ada-closure-block">
            <div class="ada-closure-block-title">Réouverture</div>
            <div class="ada-closure-block-text">
              Réouverture le lundi 5 janvier !
            </div>
          </div>

          <div class="ada-closure-block">
            <div class="ada-closure-block-title">Réservations futures</div>
            <div class="ada-closure-block-text">
              Vous pouvez nous contacter par mail :
              <a class="ada-closure-email" href="mailto:contact@aux-deux-amis.fr">contact@aux-deux-amis.fr</a>
            </div>
          </div>
        </div>

        <div class="ada-closure-actions">
          <a class="ada-closure-btn ada-closure-btn-primary" href="mailto:contact@aux-deux-amis.fr">Envoyer un mail</a>
          <button class="ada-closure-btn ada-closure-btn-secondary" type="button" data-ada-closure-close>Fermer</button>
        </div>
      </div>
    `;

    return overlay;
  }

  function closePopup(overlay){
    overlay.classList.add('ada-closure-closing');
    setTimeout(() => {
      overlay.remove();
    }, 230);
    unlockScrollForModal();
  }

  function openPopup(){
    // Évite doublons
    if (document.querySelector('.ada-closure-overlay')) return;

    const overlay = buildPopup();
    document.body.appendChild(overlay);
    lockScrollForModal();

    const xBtn = overlay.querySelector('.ada-closure-close');
    const closeBtn = overlay.querySelector('[data-ada-closure-close]');

    function dismiss(){
      setDismissedUntil(DISMISS_UNTIL);
      closePopup(overlay);
    }

    if(xBtn) xBtn.addEventListener('click', dismiss);
    if(closeBtn) closeBtn.addEventListener('click', dismiss);

    // Clic hors modal
    overlay.addEventListener('click', (e) => {
      if(e.target === overlay) dismiss();
    });

    // ESC
    document.addEventListener('keydown', function onKey(e){
      if(e.key === 'Escape'){
        dismiss();
        document.removeEventListener('keydown', onKey);
      }
    }, { once: true });
  }

  function init(){
    const d = now();

    // 1) fenêtre de dates
    if(!isInWindow(d)) return;

    // 2) respect fermeture user
    const dismissedUntil = getDismissedUntil();
    if(dismissedUntil && d < dismissedUntil) return;

    // 3) affiche rapidement
    setTimeout(() => {
      const d2 = now();
      const dismissedUntil2 = getDismissedUntil();
      if(!isInWindow(d2)) return;
      if(dismissedUntil2 && d2 < dismissedUntil2) return;
      openPopup();
    }, SHOW_DELAY_MS);
  }

  init();
});
