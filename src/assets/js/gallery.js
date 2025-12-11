
function openImageModal(src) {
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  
  if (!modal || !modalImage) {
    console.error('Image modal elements not found');
    return;
  }
  
  modalImage.src = src;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeImageModal() {
  const modal = document.getElementById('imageModal');
  
  if (!modal) {
    console.error('Image modal not found');
    return;
  }
  
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

// Close modal on ESC key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeImageModal();
  }
});

class Slideshow {
  constructor(containerSelector, options = {}) {
    // If containerSelector is already a DOM element, use it directly
    if (containerSelector instanceof HTMLElement) {
      this.container = containerSelector;
    } else {
      this.container = document.querySelector(containerSelector);
    }
    
    if (!this.container) {
      console.error(`Slideshow container "${containerSelector}" not found`);
      return;
    }
    
    this.currentSlide = 0;
    this.autoplayInterval = null;
    
    // Check if autoplay is disabled via data attribute
    const autoplayAttr = this.container.getAttribute('data-autoplay');
    if (autoplayAttr === 'false') {
      this.autoplay = false;
    } else {
      this.autoplay = options.autoplay !== false; // Default to true
    }
    
    this.autoplayDelay = options.autoplayDelay || 5000;
    
    this.images = this.container.querySelectorAll('.slideshow-image');
    this.dots = this.container.querySelectorAll('.slideshow-dot');
    this.prevButton = this.container.querySelector('[data-slideshow-prev]');
    this.nextButton = this.container.querySelector('[data-slideshow-next]');
    
    if (this.images.length === 0) {
      console.error('No slideshow images found');
      return;
    }
    
    this.init();
  }
  
  init() {
    // Set up button event listeners
    if (this.prevButton) {
      this.prevButton.addEventListener('click', () => this.changeSlide(-1));
    }
    
    if (this.nextButton) {
      this.nextButton.addEventListener('click', () => this.changeSlide(1));
    }
    
    // Set up dot event listeners
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });
    
    // Start autoplay if enabled
    if (this.autoplay) {
      this.startAutoplay();
    }
  }
  
  showSlide(index) {
    this.images.forEach((img, i) => {
      img.style.opacity = i === index ? '1' : '0';
    });
    // Remove both akro-2 and akro-3 from all dots, then add correct one
    this.dots.forEach((dot, i) => {
      dot.classList.remove('bg-akro-2', 'bg-akro-3');
      if (i === index) {
        dot.classList.add('bg-akro-2');
      } else {
        dot.classList.add('bg-akro-3');
      }
    });
    this.currentSlide = index;
  }
  
  changeSlide(direction) {
    let newIndex = this.currentSlide + direction;
    
    if (newIndex >= this.images.length) {
      newIndex = 0;
    } else if (newIndex < 0) {
      newIndex = this.images.length - 1;
    }
    
    this.showSlide(newIndex);
    this.resetAutoplay();
  }
  
  goToSlide(index) {
    this.showSlide(index);
    this.resetAutoplay();
  }
  
  startAutoplay() {
    if (!this.autoplay) return;
    
    this.autoplayInterval = setInterval(() => {
      let newIndex = (this.currentSlide + 1) % this.images.length;
      this.showSlide(newIndex);
    }, this.autoplayDelay);
  }
  
  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }
  
  resetAutoplay() {
    this.stopAutoplay();
    if (this.autoplay) {
      this.startAutoplay();
    }
  }
}

// Initialize slideshows when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all slideshows with class 'slideshow-container'
  document.querySelectorAll('.slideshow-container').forEach((container) => {
    new Slideshow(container);
  });
});

// Legacy gallery support (for index.html)
if (document.getElementById('galleryImage')) {
  const galleryImages = [
    './images/gallery/gallery1.png',
    './images/gallery/gallery2.png',
    './images/gallery/gallery3.png',
    './images/gallery/gallery4.png',
    './images/gallery/gallery5.png',
    './images/gallery/gallery6.png'
  ];

  let currentIndex = 0;
  const galleryImage = document.getElementById('galleryImage');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  // Function to change image
  function showImage(index) {
    galleryImage.classList.remove('opacity-100');
    galleryImage.classList.add('opacity-0');
    setTimeout(() => {
      galleryImage.src = galleryImages[index];
      galleryImage.classList.remove('opacity-0');
      galleryImage.classList.add('opacity-100');
    }, 300);
  }

  // Auto cycle
  setInterval(() => {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    showImage(currentIndex);
  }, 5000); // every 5 seconds

  // Manual controls
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    showImage(currentIndex);
  });
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    showImage(currentIndex);
  });
}

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { openImageModal, closeImageModal, Slideshow };
}
