/* =========================================
   CONCEPT DU SOIR - JAVASCRIPT SPÉCIFIQUE
   Brasserie Aux Deux Amis
   Complément de main.js
   ========================================= */

document.addEventListener('DOMContentLoaded', function() {
  
  console.log('✅ Concept Soir JS initialized');
  
  // =========================================
  // HERO SCROLL HINT
  // =========================================
  const scrollHint = document.querySelector('.hero-scroll-hint');
  if (scrollHint) {
    scrollHint.addEventListener('click', function() {
      const conceptSection = document.querySelector('.concept-gallery-section');
      if (conceptSection) {
        conceptSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  
  // =========================================
  // AVAILABILITY BADGE DYNAMIQUE
  // =========================================
  const availabilityBadge = document.getElementById('availabilityHero');
  
  if (availabilityBadge) {
    const now = new Date();
    const hours = now.getHours();
    const day = now.getDay(); // 0 = dimanche, 1 = lundi, etc.
    
    // Du mardi (2) au samedi (6), de 18h à 23h
    const isOpenDay = day >= 2 && day <= 6;
    const isOpenHours = hours >= 18 && hours < 23;
    
    if (isOpenDay && isOpenHours) {
      // Ouvert maintenant
      availabilityBadge.innerHTML = '<i class="fas fa-check-circle"></i><span>Ouvert maintenant · Tables disponibles</span>';
      availabilityBadge.style.background = 'rgba(34, 197, 94, 0.2)';
      availabilityBadge.style.borderColor = '#22C55E';
    } else if (isOpenDay && hours >= 17 && hours < 18) {
      // Ouverture bientôt
      availabilityBadge.innerHTML = '<i class="fas fa-clock"></i><span>Ouverture dans ' + (18 - hours) + 'h · Réservez dès maintenant</span>';
      availabilityBadge.style.background = 'rgba(251, 191, 36, 0.2)';
      availabilityBadge.style.borderColor = '#FBBF24';
    } else {
      // Fermé - message par défaut
      availabilityBadge.innerHTML = '<i class="far fa-clock"></i><span>Du mardi au samedi · 18h - 23h</span>';
    }
  }
  
  // =========================================
  // SMOOTH SCROLL POUR ANCRES
  // =========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerHeight = document.querySelector('.site-header')?.offsetHeight || 80;
          const targetPosition = target.offsetTop - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // =========================================
  // INTERSECTION OBSERVER - Animations au scroll
  // =========================================
  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Éléments à animer
  const animatedElements = document.querySelectorAll(
    '.concept-photo, .concept-text-block, .menu-compact-category, .testimonial-card'
  );
  
  animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    fadeInObserver.observe(el);
  });
  
  // =========================================
  // TRACKING DES ÉVÉNEMENTS
  // =========================================
  
  // Tracking des clics sur les boutons téléphone
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach(link => {
    link.addEventListener('click', function() {
      trackEvent('Conversion', 'Phone Click', 'Concept Soir');
    });
  });
  
  // Tracking des clics WhatsApp
  const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
  whatsappLinks.forEach(link => {
    link.addEventListener('click', function() {
      trackEvent('Conversion', 'WhatsApp Click', 'Concept Soir');
    });
  });
  
  // Tracking du clic sur PDF
  const pdfLink = document.querySelector('.btn-pdf');
  if (pdfLink) {
    pdfLink.addEventListener('click', function() {
      trackEvent('Engagement', 'PDF Download', 'Menu Soir');
    });
  }
  
  // =========================================
  // SCROLL PROGRESS (optionnel)
  // =========================================
  
  // Créer une barre de progression du scroll (optionnel)
  /*
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #D29F02, #5C6C74);
    width: 0%;
    z-index: 9999;
    transition: width 0.2s ease;
  `;
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', function() {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
  */
  
  // =========================================
  // PERFORMANCE MONITORING
  // =========================================
  
  window.addEventListener('load', function() {
    if (window.performance && window.performance.timing) {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      
      if (pageLoadTime > 0) {
        console.log('⏱️ Page Load Time:', pageLoadTime + 'ms');
        trackTiming('Concept Soir', 'Page Load', pageLoadTime);
      }
    }
  });
  
  // =========================================
  // UTM TRACKING POUR ADS
  // =========================================
  
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get('utm_source');
  const utmMedium = urlParams.get('utm_medium');
  const utmCampaign = urlParams.get('utm_campaign');
  
  if (utmSource || utmMedium || utmCampaign) {
    // Stocker les UTMs
    const utmData = {
      source: utmSource,
      medium: utmMedium,
      campaign: utmCampaign,
      timestamp: new Date().toISOString(),
      page: 'concept-soir'
    };
    
    sessionStorage.setItem('utm_data', JSON.stringify(utmData));
    
    // Tracker l'arrivée depuis la campagne
    trackEvent('Campaign', 'Landing', `${utmSource} - ${utmCampaign}`);
    
    console.log('📊 UTM Data captured:', utmData);
  }
  
  // =========================================
  // LAZY LOADING OPTIMISÉ
  // =========================================
  
  if ('loading' in HTMLImageElement.prototype) {
    // Le navigateur supporte le lazy loading natif
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  } else {
    // Fallback pour les anciens navigateurs
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
  
  // =========================================
  // HELPER FUNCTIONS
  // =========================================
  
  function trackEvent(category, action, label) {
    // Google Analytics 4
    if (typeof gtag === 'function') {
      gtag('event', action, {
        'event_category': category,
        'event_label': label,
        'page_location': window.location.href
      });
    }
    
    // Facebook Pixel
    if (typeof fbq === 'function') {
      fbq('track', action, {
        category: category,
        label: label
      });
    }
    
    // Console log pour debug
    console.log('📊 Event tracked:', category, action, label);
  }
  
  function trackTiming(category, variable, time) {
    if (typeof gtag === 'function') {
      gtag('event', 'timing_complete', {
        'name': variable,
        'value': time,
        'event_category': category
      });
    }
  }
  
  // =========================================
  // MOBILE OPTIMIZATIONS
  // =========================================
  
  // Désactiver le zoom sur double-tap
  let lastTouchEnd = 0;
  document.addEventListener('touchend', function(event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, { passive: false });
  
  // Détecter si c'est mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  if (isMobile) {
    // Optimisations mobile
    document.body.classList.add('is-mobile');
    
    // Améliorer les performances des animations sur mobile
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 768px) {
        * {
          -webkit-tap-highlight-color: transparent;
        }
        .concept-photo,
        .testimonial-card {
          transition-duration: 0.2s !important;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // =========================================
  // CONVERSION TRACKING AU CHARGEMENT
  // =========================================
  
  // Tracker la vue de la page
  trackEvent('Page', 'View', 'Concept Soir Landing');
  
  // Si arrivée depuis une ads, tracker spécifiquement
  const referrer = document.referrer;
  if (referrer.includes('facebook.com') || referrer.includes('instagram.com')) {
    trackEvent('Traffic', 'Meta Ads', 'Concept Soir');
  } else if (referrer.includes('google.com')) {
    trackEvent('Traffic', 'Google Ads', 'Concept Soir');
  }
  
  // =========================================
  // DEBUG MODE
  // =========================================
  
  const debugMode = urlParams.get('debug') === 'true';
  
  if (debugMode) {
    console.log('🐛 DEBUG MODE ACTIVÉ');
    console.log('📱 Mobile:', isMobile);
    console.log('📊 UTM Data:', sessionStorage.getItem('utm_data'));
    console.log('🌐 Referrer:', referrer);
    console.log('⏰ Current time:', new Date().toLocaleTimeString('fr-FR'));
    console.log('📅 Day:', ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'][new Date().getDay()]);
    
    // Indicateur visuel
    const debugBadge = document.createElement('div');
    debugBadge.textContent = '🐛 DEBUG';
    debugBadge.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: red;
      color: white;
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 12px;
      z-index: 99999;
      font-family: monospace;
    `;
    document.body.appendChild(debugBadge);
  }
  
});

// =========================================
// ERROR HANDLING
// =========================================

window.addEventListener('error', function(e) {
  console.error('❌ JavaScript Error:', e.message);
  
  // Envoyer à un service de monitoring (optionnel)
  if (typeof gtag === 'function') {
    gtag('event', 'exception', {
      'description': e.message,
      'fatal': false
    });
  }
});

// =========================================
// EXPORT (si besoin)
// =========================================

window.ConceptSoir = {
  version: '2.0',
  initialized: true
};
