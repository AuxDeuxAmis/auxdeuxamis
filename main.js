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
// POPUP - Nouvelle carte du midi (ADA) - Automne 2026
// - Réutilise les classes .ada-closure-* (styles.css)
// - Affichage du 24/09/2026 au 08/10/2026 inclus
// - Non affichée sur les pages de EXCLUDED_PATHS
// - Si fermeture ou clic CTA => pas de réaffichage (localStorage)
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
  const STORAGE_KEY = 'ada_newmenu_2026_automne_dismissed_until';
  const SHOW_DELAY_MS = 1200;

  // Fenêtre d'affichage (heure locale du navigateur)
  // du 24/09/2026 00:00 au 08/10/2026 23:59:59 (inclus)
  const START = new Date(2026, 8, 24, 0, 0, 0);
  const END   = new Date(2026, 9, 8, 23, 59, 59);

  // Après fermeture, plus de réaffichage jusqu'au 09/10/2026 00:00
  const DISMISS_UNTIL = new Date(2026, 9, 9, 0, 0, 0);

  // Pages où la popup ne s'affiche pas (le visiteur est déjà sur la carte)
  const EXCLUDED_PATHS = ['/restaurant-lattes'];

  function now(){ return new Date(); }
  function isInWindow(d){ return d >= START && d <= END; }

  function isExcludedPage(){
    const path = window.location.pathname.replace(/\/+$/, '') || '/';
    return EXCLUDED_PATHS.indexOf(path) !== -1;
  }

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

  function lockScroll(){
    const y = window.scrollY || document.documentElement.scrollTop;
    document.body.dataset.adaNewmenuScrollY = String(y);
    document.body.style.position = 'fixed';
    document.body.style.top = `-${y}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
  }

  function unlockScroll(){
    const y = parseInt(document.body.dataset.adaNewmenuScrollY || '0', 10) || 0;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    delete document.body.dataset.adaNewmenuScrollY;
    window.scrollTo(0, y);
  }

  function buildPopup(){
    const overlay = document.createElement('div');
    overlay.className = 'ada-closure-overlay ada-newmenu-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'ada-newmenu-title');

    overlay.innerHTML = `
      <div class="ada-closure-modal ada-newmenu-modal" role="document">
        <div class="ada-closure-header ada-newmenu-header">
          <button class="ada-closure-close" type="button" aria-label="Fermer"></button>
          <div class="ada-closure-badge">
            <svg class="ada-newmenu-leaf" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M5 21c0-9 5-15 16-17-1 11-7 16-16 17zm0 0c3-4 6-7 10-10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Nouveau depuis le 24 septembre
          </div>
          <div class="ada-closure-title" id="ada-newmenu-title">La carte d'automne est arrivée !</div>
          <div class="ada-closure-subtitle">Le Chef Olivier passe aux saveurs de sous-bois.</div>
        </div>

        <div class="ada-closure-body">
          <div class="ada-closure-block">
            <div class="ada-closure-block-title">Au menu du midi</div>
            <ul class="ada-newmenu-dishes">
              <li class="ada-newmenu-dish">
                <span class="ada-newmenu-dish-name">Le Risotto du Cueilleur<small>Champignons sauvages de saison</small></span>
                <span class="ada-newmenu-dish-price">19€</span>
              </li>
              <li class="ada-newmenu-dish">
                <span class="ada-newmenu-dish-name">La Volaille aux Morilles<small>Volaille fermière, dés de Comté</small></span>
                <span class="ada-newmenu-dish-price">22€</span>
              </li>
              <li class="ada-newmenu-dish">
                <span class="ada-newmenu-dish-name">Le Trio de Canard aux Cèpes<small>Magret, cœurs, foie gras poêlé</small></span>
                <span class="ada-newmenu-dish-price">26€</span>
              </li>
            </ul>
          </div>

          <div class="ada-closure-block">
            <div class="ada-closure-block-text">
              Formules du midi dès <strong>13,90€</strong>, plus l'ardoise du jour.
            </div>
          </div>
        </div>

        <div class="ada-closure-actions">
          <a class="ada-closure-btn ada-closure-btn-primary" href="/restaurant-lattes#carte" data-ada-newmenu-cta>Voir la carte</a>
          <a class="ada-closure-btn ada-closure-btn-secondary ada-newmenu-btn-tel" href="tel:+33775770069" data-ada-newmenu-cta>Réserver</a>
        </div>
      </div>
    `;

    return overlay;
  }

  function closePopup(overlay){
    overlay.classList.add('ada-closure-closing');
    setTimeout(() => { overlay.remove(); }, 230);
    unlockScroll();
  }

  function openPopup(){
    // Évite doublons (et chevauchement avec une autre popup ADA)
    if (document.querySelector('.ada-closure-overlay')) return;

    const overlay = buildPopup();
    document.body.appendChild(overlay);
    lockScroll();

    function onKey(e){
      if(e.key === 'Escape') dismiss();
    }

    function dismiss(){
      setDismissedUntil(DISMISS_UNTIL);
      document.removeEventListener('keydown', onKey);
      closePopup(overlay);
    }

    const xBtn = overlay.querySelector('.ada-closure-close');
    if(xBtn){
      xBtn.addEventListener('click', dismiss);
      xBtn.focus({ preventScroll: true });
    }

    // Clic sur un CTA : on mémorise, puis la navigation suit son cours
    overlay.querySelectorAll('[data-ada-newmenu-cta]').forEach((btn) => {
      btn.addEventListener('click', () => {
        setDismissedUntil(DISMISS_UNTIL);
        document.removeEventListener('keydown', onKey);
        unlockScroll();
      });
    });

    // Clic hors modal
    overlay.addEventListener('click', (e) => {
      if(e.target === overlay) dismiss();
    });

    // ESC
    document.addEventListener('keydown', onKey);
  }

  function init(){
    const d = now();
    if(isExcludedPage()) return;
    if(!isInWindow(d)) return;

    const dismissedUntil = getDismissedUntil();
    if(dismissedUntil && d < dismissedUntil) return;

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
