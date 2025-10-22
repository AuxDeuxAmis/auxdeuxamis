/* ================================
   CONCEPT DU SOIR - JAVASCRIPT
   Brasserie Aux Deux Amis
   ================================ */

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
  
  // ================================
  // FLOATING CTA - Gestion de l'affichage
  // ================================
  const floatingCta = document.getElementById('floatingCta');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Masquer lors du scroll down, afficher lors du scroll up
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      floatingCta.style.transform = 'translateY(150%)';
    } else {
      floatingCta.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }, false);
  
  // ================================
  // HERO SCROLL INDICATOR
  // ================================
  const scrollIndicator = document.querySelector('.hero-scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
      const conceptSection = document.querySelector('.concept-section');
      if (conceptSection) {
        conceptSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  
  // ================================
  // CAROUSEL GALLERY
  // ================================
  const carouselTrack = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');
  
  if (carouselTrack) {
    const items = carouselTrack.querySelectorAll('.carousel-item');
    let currentIndex = 0;
    
    // Créer les dots
    items.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      dot.setAttribute('aria-label', `Aller à l'image ${index + 1}`);
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
    
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    
    // Fonction pour aller à un slide spécifique
    function goToSlide(index) {
      const itemWidth = items[0].offsetWidth + parseFloat(getComputedStyle(carouselTrack).gap);
      carouselTrack.scrollTo({
        left: itemWidth * index,
        behavior: 'smooth'
      });
      currentIndex = index;
      updateDots();
    }
    
    // Mettre à jour les dots actifs
    function updateDots() {
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }
    
    // Navigation précédent
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        goToSlide(currentIndex);
      });
    }
    
    // Navigation suivant
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        goToSlide(currentIndex);
      });
    }
    
    // Détection du swipe tactile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carouselTrack.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
      const swipeThreshold = 50;
      if (touchStartX - touchEndX > swipeThreshold) {
        // Swipe gauche
        currentIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        goToSlide(currentIndex);
      } else if (touchEndX - touchStartX > swipeThreshold) {
        // Swipe droite
        currentIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        goToSlide(currentIndex);
      }
    }
    
    // Observer pour mettre à jour les dots lors du scroll manuel
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Array.from(items).indexOf(entry.target);
          currentIndex = index;
          updateDots();
        }
      });
    }, {
      root: carouselTrack,
      threshold: 0.5
    });
    
    items.forEach(item => observer.observe(item));
    
    // Auto-play (optionnel, décommenter pour activer)
    /*
    setInterval(() => {
      currentIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
      goToSlide(currentIndex);
    }, 5000);
    */
  }
  
  // ================================
  // MENU ACCORDÉON
  // ================================
  const categoryHeaders = document.querySelectorAll('.category-header');
  
  categoryHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const category = this.parentElement;
      const items = category.querySelector('.category-items');
      const isActive = this.classList.contains('active');
      
      // Fermer tous les autres menus (optionnel)
      // Pour permettre plusieurs menus ouverts en même temps, commentez ce bloc
      /*
      categoryHeaders.forEach(h => {
        if (h !== this) {
          h.classList.remove('active');
          h.parentElement.querySelector('.category-items').classList.remove('active');
        }
      });
      */
      
      // Toggle le menu actuel
      this.classList.toggle('active');
      items.classList.toggle('active');
      
      // Scroll vers la catégorie si elle s'ouvre
      if (!isActive) {
        setTimeout(() => {
          category.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
      }
    });
  });
  
  // Ouvrir la première catégorie par défaut sur desktop
  if (window.innerWidth >= 768 && categoryHeaders.length > 0) {
    categoryHeaders[0].click();
  }
  
  // ================================
  // AVAILABILITY BADGE - Animation dynamique
  // ================================
  const availabilityBadge = document.getElementById('availabilityBadge');
  
  if (availabilityBadge) {
    // Vérifier l'heure actuelle
    const now = new Date();
    const hours = now.getHours();
    const day = now.getDay(); // 0 = dimanche, 1 = lundi, etc.
    
    // Logique de disponibilité
    // Du mardi (2) au samedi (6), de 18h à 22h30
    const isOpenDay = day >= 2 && day <= 6;
    const isOpenHours = hours >= 18 && hours < 23;
    
    if (isOpenDay && isOpenHours) {
      // Afficher "Tables disponibles ce soir"
      availabilityBadge.innerHTML = '<i class="fas fa-check-circle"></i><span>Tables disponibles ce soir</span>';
      availabilityBadge.style.background = 'rgba(34, 197, 94, 0.1)';
      availabilityBadge.style.color = '#16A34A';
    } else if (isOpenDay && hours >= 17 && hours < 18) {
      // Avant l'ouverture le jour même
      availabilityBadge.innerHTML = '<i class="fas fa-clock"></i><span>Ouverture dans ' + (18 - hours) + 'h</span>';
      availabilityBadge.style.background = 'rgba(251, 191, 36, 0.1)';
      availabilityBadge.style.color = '#D97706';
    } else {
      // Fermé
      availabilityBadge.innerHTML = '<i class="fas fa-info-circle"></i><span>Ouvert du mardi au samedi soir</span>';
      availabilityBadge.style.background = 'rgba(239, 68, 68, 0.1)';
      availabilityBadge.style.color = '#DC2626';
    }
  }
  
  // ================================
  // SHARE BUTTONS
  // ================================
  const shareButtons = document.querySelectorAll('.share-btn');
  const currentUrl = window.location.href;
  const shareText = 'Découvrez les tapas gastronomiques de la Brasserie Aux Deux Amis !';
  
  shareButtons.forEach(button => {
    button.addEventListener('click', function() {
      const shareType = this.getAttribute('data-share');
      
      switch(shareType) {
        case 'facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
          trackShare('Facebook');
          break;
          
        case 'whatsapp':
          window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + currentUrl)}`, '_blank');
          trackShare('WhatsApp');
          break;
          
        case 'copy':
          copyToClipboard(currentUrl);
          showCopyNotification(this);
          trackShare('Copy Link');
          break;
      }
    });
  });
  
  // Copier dans le presse-papier
  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
    } else {
      // Fallback pour les navigateurs plus anciens
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  }
  
  // Notification de copie
  function showCopyNotification(button) {
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i>';
    button.style.background = '#22C55E';
    button.style.color = '#FFFFFF';
    
    setTimeout(() => {
      button.innerHTML = originalHTML;
      button.style.background = '';
      button.style.color = '';
    }, 2000);
  }
  
  // ================================
  // CLICK TO CALL TRACKING
  // ================================
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  
  phoneLinks.forEach(link => {
    link.addEventListener('click', function() {
      trackEvent('Call', 'Click', 'Phone CTA');
    });
  });
  
  // ================================
  // SCROLL ANIMATIONS
  // ================================
  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Éléments à animer au scroll
  const animatedElements = document.querySelectorAll('.section-header, .feature-item, .menu-category, .testimonial-card');
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  // ================================
  // SMOOTH SCROLL POUR LES ANCRES
  // ================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
  
  // ================================
  // LAZY LOADING IMAGES (optionnel)
  // ================================
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.dataset.src || img.src;
    });
  } else {
    // Fallback pour les navigateurs ne supportant pas loading="lazy"
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
  }
  
  // ================================
  // PERFORMANCE MONITORING
  // ================================
  window.addEventListener('load', function() {
    // Mesurer le temps de chargement
    if (window.performance && window.performance.timing) {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      
      // Envoyer à Google Analytics ou autre outil de tracking
      if (pageLoadTime > 0) {
        trackTiming('Page Load', 'Load Time', pageLoadTime);
      }
    }
  });
  
  // ================================
  // TRACKING FUNCTIONS (à adapter selon votre outil)
  // ================================
  
  function trackEvent(category, action, label) {
    // Google Analytics 4
    if (typeof gtag === 'function') {
      gtag('event', action, {
        'event_category': category,
        'event_label': label
      });
    }
    
    // Facebook Pixel
    if (typeof fbq === 'function') {
      fbq('track', action, {
        category: category,
        label: label
      });
    }
    
    // Console log pour développement
    console.log('Event tracked:', category, action, label);
  }
  
  function trackShare(platform) {
    trackEvent('Share', 'Click', platform);
  }
  
  function trackTiming(category, variable, time) {
    if (typeof gtag === 'function') {
      gtag('event', 'timing_complete', {
        'name': variable,
        'value': time,
        'event_category': category
      });
    }
    console.log('Timing:', category, variable, time + 'ms');
  }
  
  // ================================
  // UTMS TRACKING POUR LES ADS
  // ================================
  
  // Capturer les paramètres UTM de l'URL
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get('utm_source');
  const utmMedium = urlParams.get('utm_medium');
  const utmCampaign = urlParams.get('utm_campaign');
  
  if (utmSource || utmMedium || utmCampaign) {
    // Stocker dans sessionStorage pour tracking
    sessionStorage.setItem('utm_data', JSON.stringify({
      source: utmSource,
      medium: utmMedium,
      campaign: utmCampaign,
      timestamp: new Date().toISOString()
    }));
    
    // Tracker l'arrivée depuis une campagne
    trackEvent('Campaign', 'Landing', `${utmSource} - ${utmCampaign}`);
  }
  
  // Ajouter les UTMs aux liens de réservation
  const reservationLinks = document.querySelectorAll('a[href*="wa.me"], a[href^="tel:"]');
  
  reservationLinks.forEach(link => {
    link.addEventListener('click', function() {
      const utmData = sessionStorage.getItem('utm_data');
      if (utmData) {
        const data = JSON.parse(utmData);
        trackEvent('Conversion', 'Reservation Attempt', `${data.source} - ${data.campaign}`);
      }
    });
  });
  
  // ================================
  // MOBILE MENU OPTIMIZATION
  // ================================
  
  // Désactiver le zoom sur les input en mobile
  const metaViewport = document.querySelector('meta[name="viewport"]');
  if (metaViewport) {
    if (window.innerWidth < 768) {
      metaViewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
    }
  }
  
  // Prévenir le double-tap zoom
  let lastTouchEnd = 0;
  document.addEventListener('touchend', function(event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, { passive: false });
  
  // ================================
  // DEBUG MODE (à retirer en production)
  // ================================
  
  // Activer avec ?debug=true dans l'URL
  const debugMode = urlParams.get('debug') === 'true';
  
  if (debugMode) {
    console.log('🐛 DEBUG MODE ACTIVÉ');
    console.log('UTM Data:', sessionStorage.getItem('utm_data'));
    console.log('Viewport:', window.innerWidth + 'x' + window.innerHeight);
    console.log('User Agent:', navigator.userAgent);
    
    // Afficher un indicateur visuel
    const debugIndicator = document.createElement('div');
    debugIndicator.style.cssText = 'position:fixed;top:0;left:0;background:red;color:white;padding:5px 10px;z-index:99999;font-size:12px;';
    debugIndicator.textContent = 'DEBUG MODE';
    document.body.appendChild(debugIndicator);
  }
  
  // ================================
  // INIT COMPLETE
  // ================================
  
  console.log('✅ Concept Soir JS initialized');
  
  // Tracker le chargement de la page
  trackEvent('Page', 'View', 'Concept Soir Landing');
});

// ================================
// SERVICE WORKER (optionnel pour PWA)
// ================================

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Décommenter pour activer le service worker
    /*
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registered:', registration);
      })
      .catch(error => {
        console.log('Service Worker registration failed:', error);
      });
    */
  });
}

// ================================
// GESTION DES ERREURS
// ================================

window.addEventListener('error', function(e) {
  console.error('Error caught:', e.message);
  // Envoyer à un service de monitoring (Sentry, etc.)
});

// ================================
// EXPORTS (si besoin pour modules ES6)
// ================================

// export { trackEvent, trackShare, trackTiming };
