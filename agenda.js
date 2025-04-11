document.addEventListener('DOMContentLoaded', function() {
    // Animation d'apparition au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    // Observer les sections et les cartes pour les animations
    document.querySelectorAll('.agenda-section, .contact-section, .poster-card, .event-item').forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
    
    // Ajouter des classes d'animation avec délai pour les cartes d'affiche
    document.querySelectorAll('.poster-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
    });
    
    // Ajouter des classes d'animation avec délai pour les événements
    document.querySelectorAll('.event-item').forEach((event, index) => {
        event.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Zoom sur les affiches au hover
    document.querySelectorAll('.poster-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('img').style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('img').style.transform = 'scale(1)';
        });
    });
    
    // Effet de surbrillance sur les événements à venir
    document.querySelectorAll('.event-item').forEach(event => {
        event.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            this.style.transform = 'translateY(-2px)';
        });
        
        event.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            this.style.transform = 'translateY(0)';
        });
    });
});
