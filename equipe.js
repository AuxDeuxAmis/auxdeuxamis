// Script spécifique à la page équipe
document.addEventListener('DOMContentLoaded', function() {
  // Animation des cartes au scroll
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
  };

  const teamMembers = document.querySelectorAll('.team-member');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Initialiser le style des cartes
  teamMembers.forEach(member => {
    member.style.opacity = '0';
    member.style.transform = 'translateY(20px)';
    member.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(member);
  });

  // Effet hover sur les photos
  teamMembers.forEach(member => {
    member.addEventListener('mouseenter', () => {
      const photo = member.querySelector('.member-photo img');
      if (photo) {
        photo.style.transform = 'scale(1.05)';
      }
    });

    member.addEventListener('mouseleave', () => {
      const photo = member.querySelector('.member-photo img');
      if (photo) {
        photo.style.transform = 'scale(1)';
      }
    });
  });
});
