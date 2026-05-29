// Wait for DOM to be fully loaded before accessing elements
document.addEventListener('DOMContentLoaded', function() {
  const track = document.getElementById('imageTrack');
  const scrollbar = document.getElementById('customScrollbar');
  const container = document.querySelector('.gallery-container');
  const imageCards = document.querySelectorAll('.image-card');

  function updateSlider() {
    // Calculate total scrollable distance available
    const maxScroll = track.scrollWidth - container.offsetWidth;
    
    // Convert slider position (0-100) into pixel translation amount
    const percentage = scrollbar.value / 100;
    const translateAmount = maxScroll * percentage;
    
    // Shift the entire track left to bring right items into view
    track.style.transform = `translateX(-${translateAmount}px)`;
    
    // Update image scales based on center position
    updateImageScales();
  }

  function updateImageScales() {
    const containerCenter = container.offsetWidth / 2;
    
    imageCards.forEach(card => {
      // Get the card's position relative to the container
      const cardRect = card.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      // Calculate distance from card center to container center
      const cardCenter = cardRect.left - containerRect.left + cardRect.width / 2;
      const distance = Math.abs(cardCenter - containerCenter);
      
      // Scale based on how close to center (max scale at center, min at edges)
      const maxDistance = containerCenter;
      const scale = Math.max(1, 1.5 - (distance / maxDistance) * 0.5);
      
      card.style.transform = `scale(${scale})`;
    });
  }

  // Listen to slider changes
  scrollbar.addEventListener('input', updateSlider);

  // Recalculate if the browser window changes size
  window.addEventListener('resize', updateSlider);
  
  // Initialize the slider on page load
  updateSlider();
});
