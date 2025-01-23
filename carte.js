document.addEventListener('DOMContentLoaded', function() {
  // Animation des boutons au scroll
  const menuButtons = document.querySelectorAll('.menu-button');
  
  const observerOptions = {
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateX(0)';
      }
    });
  }, observerOptions);
  
  menuButtons.forEach((button, index) => {
    button.style.opacity = 0;
    button.style.transform = 'translateX(-20px)';
    button.style.transitionDelay = `${index * 0.2}s`;
    observer.observe(button);
  });
});
