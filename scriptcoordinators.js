function toggleDetails(button) {
    const additionalInfo = button.nextElementSibling;
    const isHidden = additionalInfo.classList.contains('hidden');
    
    additionalInfo.classList.toggle('hidden');
    button.textContent = isHidden ? 'Less' : 'More';
    
    // Smooth animation
    if (isHidden) {
      additionalInfo.style.maxHeight = additionalInfo.scrollHeight + 'px';
      additionalInfo.style.opacity = '1';
    } else {
      additionalInfo.style.maxHeight = '0';
      additionalInfo.style.opacity = '0';
    }
  }
  
  // Add smooth reveal animation for coordinator cards
  document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.coordinator-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, {
      threshold: 0.1
    });
  
    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(card);
    });
  });