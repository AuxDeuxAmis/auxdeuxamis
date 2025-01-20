
document.querySelector('.mobile-menu-trigger').addEventListener('click', function() {
  this.classList.toggle('is-active');
  document.querySelector('.mobile-nav').classList.toggle('is-active');
  
  // Animer les lignes du burger
  const lines = this.querySelectorAll('.burger-line');
  lines[0].style.transform = this.classList.contains('is-active') ? 'rotate(45deg) translate(5px, 5px)' : '';
  lines[1].style.opacity = this.classList.contains('is-active') ? '0' : '1';
  lines[2].style.transform = this.classList.contains('is-active') ? 'rotate(-45deg) translate(5px, -5px)' : '';
});
