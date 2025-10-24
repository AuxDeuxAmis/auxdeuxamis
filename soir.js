/* =========================================
   CONCEPT DU SOIR V3 - JAVASCRIPT
   Brasserie Aux Deux Amis
   ========================================= */

document.addEventListener('DOMContentLoaded', function() {
  
  console.log('✅ Concept Soir V3 initialized');
  
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
  // FAQ ACCORDÉON
  // =========================================
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const faqItem = this.parentElement;
      const isActive = faqItem.classList.contains('active');
      
      // Fermer tous les autres items (optionnel)
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
          item.classList.remove('active');
        }
      });
      
      // Toggle l'item actuel
      faqItem.classList.toggle('active');
      
      // Tracker l'ouverture FAQ
      if (!isActive) {
        trackEvent('Engagement', 'FAQ Open', question.querySelector('span').textContent);
      }
    });
  });
  
  // =========================================
  // INTERSECTION OBSERVER - Animations
  // =========================================
  const observerOptions = {
    root: null,
    threshold: 0.05, // Réduit de 0.1 à 0.05 pour trigger plus tôt
    rootMargin: '0px 0px -20px 0px' // Réduit de -50px à -20px
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
    '.concept-video-card, .concept-text-enhanced, .concept-photo-v3, ' +
    '.menu-category-v3, .testimonial-card-v3, .seo-content, .seo-faq'
  );
  
  animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)'; // Réduit de 30px à 20px
    el.style.transition = `opacity 0.4s ease ${index * 0.03}s, transform 0.4s ease ${index * 0.03}s`; // Réduit de 0.6s à 0.4s et délai de 0.05s à 0.03s
    fadeInObserver.observe(el);
  });
  
  // =========================================
  // TRACKING DES CONVERSIONS
  // =========================================
  
  // Tracking téléphone
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach(link => {
    link.addEventListener('click', function() {
      const location = this.closest('section')?.className || 'unknown';
      trackEvent('Conversion', 'Phone Click', location);
    });
  });
  
  // Tracking WhatsApp
  const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
  whatsappLinks.forEach(link => {
    link.addEventListener('click', function() {
      const location = this.closest('section')?.className || 'unknown';
      trackEvent('Conversion', 'WhatsApp Click', location);
    });
  });
  
  // Tracking itinéraire
  const directionLinks = document.querySelectorAll('.btn-map-direction');
  directionLinks.forEach(link => {
    link.addEventListener('click', function() {
      trackEvent('Engagement', 'Get Directions', 'Hero Map');
    });
  });
  
  // Tracking PDF menu
  const pdfLink = document.querySelector('.btn-menu-pdf');
  if (pdfLink) {
    pdfLink.addEventListener('click', function() {
      trackEvent('Engagement', 'PDF Download', 'Menu Soir');
    });
  }
  
  // Tracking scroll depth
  let scrollDepthTracked = {
    25: false,
    50: false,
    75: false,
    100: false
  };
  
  window.addEventListener('scroll', function() {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    Object.keys(scrollDepthTracked).forEach(depth => {
      if (scrollPercent >= depth && !scrollDepthTracked[depth]) {
        trackEvent('Engagement', 'Scroll Depth', depth + '%');
        scrollDepthTracked[depth] = true;
      }
    });
  });
  
  // =========================================
  // VIDÉO TRACKING
  // =========================================
  const videoIframe = document.querySelector('.video-wrapper iframe');
  if (videoIframe) {
    // Tracking quand la vidéo est visible
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          trackEvent('Engagement', 'Video Visible', 'Concept Video');
        }
      });
    }, { threshold: 0.5 });
    
    videoObserver.observe(videoIframe);
  }
  
  // =========================================
  // UTM TRACKING
  // =========================================
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get('utm_source');
  const utmMedium = urlParams.get('utm_medium');
  const utmCampaign = urlParams.get('utm_campaign');
  
  if (utmSource || utmMedium || utmCampaign) {
    const utmData = {
      source: utmSource,
      medium: utmMedium,
      campaign: utmCampaign,
      timestamp: new Date().toISOString(),
      page: 'concept-soir-v3'
    };
    
    sessionStorage.setItem('utm_data', JSON.stringify(utmData));
    trackEvent('Campaign', 'Landing', `${utmSource} - ${utmCampaign}`);
    
    console.log('📊 UTM captured:', utmData);
  }
  
  // =========================================
  // PERFORMANCE MONITORING
  // =========================================
  window.addEventListener('load', function() {
    if (window.performance && window.performance.timing) {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      
      if (pageLoadTime > 0) {
        console.log('⏱️ Page Load:', pageLoadTime + 'ms');
        trackTiming('Concept Soir V3', 'Page Load', pageLoadTime);
      }
    }
  });
  
  // =========================================
  // LAZY LOADING OPTIMISÉ
  // =========================================
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  } else {
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
  // SCHEMA.ORG STRUCTURED DATA
  // =========================================
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Brasserie Aux Deux Amis",
    "image": "https://cdn.prod.website-files.com/678e9e339a31bae6a2fe6c1d/68fa49a165ae0b65c474c45c_tapas-soir.webp",
    "description": "Bar tapas à Lattes (Maurin) proposant des tapas gastronomiques du Chef Brice. Ouvert du mardi au samedi de 18h à 23h.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rue des Yeuses",
      "addressLocality": "Lattes",
      "postalCode": "34970",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.559923,
      "longitude": 3.873195
    },
    "telephone": "+33619071186",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "18:00",
        "closes": "23:00"
      }
    ],
    "servesCuisine": ["Espagnole", "Méditerranéenne", "Tapas"],
    "priceRange": "€€",
    "menu": "https://cdn.prod.website-files.com/678e9e339a31bae6a2fe6c1d/68e3de55190ff4a06b6a3f2c_carte-soir-automne-2025.pdf",
    "acceptsReservations": "True"
  };
  
  // Injecter le schema dans le head
  const scriptTag = document.createElement('script');
  scriptTag.type = 'application/ld+json';
  scriptTag.text = JSON.stringify(schemaData);
  document.head.appendChild(scriptTag);
  
  // =========================================
  // FAQ SCHEMA
  // =========================================
  const faqItems = document.querySelectorAll('.faq-item');
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": []
  };
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question span').textContent;
    const answer = item.querySelector('.faq-answer p').textContent;
    
    faqSchema.mainEntity.push({
      "@type": "Question",
      "name": question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": answer
      }
    });
  });
  
  const faqScriptTag = document.createElement('script');
  faqScriptTag.type = 'application/ld+json';
  faqScriptTag.text = JSON.stringify(faqSchema);
  document.head.appendChild(faqScriptTag);
  
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
    
    console.log('📊 Event:', category, action, label);
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
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  if (isMobile) {
    document.body.classList.add('is-mobile');
    
    // Désactiver zoom double-tap
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, { passive: false });
  }
  
  // =========================================
  // INIT TRACKING
  // =========================================
  trackEvent('Page', 'View', 'Concept Soir V3');
  
  // Détecter la source de trafic
  const referrer = document.referrer;
  if (referrer.includes('facebook.com') || referrer.includes('instagram.com')) {
    trackEvent('Traffic', 'Meta Ads', 'Concept Soir');
  } else if (referrer.includes('google.com')) {
    trackEvent('Traffic', 'Google', 'Concept Soir');
  }
  
  // =========================================
  // DEBUG MODE
  // =========================================
  const debugMode = urlParams.get('debug') === 'true';
  
  if (debugMode) {
    console.log('🐛 DEBUG MODE');
    console.log('📱 Mobile:', isMobile);
    console.log('📊 UTM:', sessionStorage.getItem('utm_data'));
    console.log('🌐 Referrer:', referrer);
    
    const debugBadge = document.createElement('div');
    debugBadge.textContent = '🐛 DEBUG V3';
    debugBadge.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: red;
      color: white;
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 11px;
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
  console.error('❌ Error:', e.message);
  
  if (typeof gtag === 'function') {
    gtag('event', 'exception', {
      'description': e.message,
      'fatal': false
    });
  }
});

// =========================================
// EXPORT
// =========================================
window.ConceptSoir = {
  version: '3.0',
  initialized: true
};
