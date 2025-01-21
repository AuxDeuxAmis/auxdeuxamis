document.addEventListener('DOMContentLoaded', function() {
  // 1. Configuration du décompte
  const targetDate = new Date('2025-02-22T12:00:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
  }

  // Démarrage du décompte
  setInterval(updateCountdown, 1000);
  updateCountdown();

  // 2. Configuration des animations au scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    { threshold: 0.1 }
  );

  const elementsToAnimate = [
  ...document.querySelectorAll('.timing-card'),
  ...document.querySelectorAll('.atmosphere-item'),
  ...document.querySelectorAll('.atmosphere-main')
];

elementsToAnimate.forEach(element => {
  element.classList.add('scroll-animate'); // Ajout de la classe pour l'animation au scroll
  observer.observe(element);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);
});
