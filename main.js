// Script pour le menu mobile
document.addEventListener('DOMContentLoaded', function() {
  const trigger = document.querySelector('.mobile-menu-trigger');
  const panel = document.querySelector('.mobile-panel');
  const header = document.querySelector('.site-header');

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
});
